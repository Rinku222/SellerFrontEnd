import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import {ActivityIndicator, Caption, List} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {colors} from '../../../../config/colors';
import {getShadow} from '../../../../config/globalStyles';
import {DownArrowIcon, PlayVideoIcon, UpArrowIcon} from '../../../../assets/svg';
import useMainScreenActions from '../../../../redux/actions/mainScreenActions';

function Tabs(props: any) {
  const {documentUrl, transcript, navigation} = props;
  const [selected, setSelected] = useState(1);

  console.log('----->props', props);
  console.log('----->documentUrl', documentUrl);

  return (
    <View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={{
            borderBottomColor: selected === 1 ? colors.primary : 'transparent',
            borderBottomWidth: 2,
            flex: 1,
            alignItems: 'center',
            padding: 10,
          }}
          onPress={() => setSelected(1)}>
          <Text>Transcript</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderBottomColor: selected === 2 ? colors.primary : 'transparent',
            borderBottomWidth: 2,
            flex: 1,
            alignItems: 'center',
            padding: 10,
          }}
          onPress={() => setSelected(2)}>
          <Text>Document</Text>
        </TouchableOpacity>
      </View>
      {selected === 1 ? (
        <View>
          <Text style={styles.tabContainerText}>{transcript}</Text>
        </View>
      ) : (
        <View>
          {/* PDFScreen */}
          <TouchableOpacity onPress={() => navigation.navigate('PDFScreen', {url: documentUrl})}>
            <Text style={styles.tabContainerText}>Documnet</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

function AssignmentSection(props: any) {
  const {navigation} = props;
  const {assessment} = useSelector(s => s.main);
  const {assessmentTitle, attendStatus} = assessment || {};

  const {attendedCount, totalMarks, totalQuestions} = attendStatus || {};

  return (
    <TouchableOpacity
      style={styles.assignmentContainer}
      onPress={() => navigation.navigate('Quiz')}>
      <View>
        <View style={styles.assignmentSection}>
          <Text style={styles.assignmentText}>{assessmentTitle}</Text>
        </View>
        <View style={styles.attempts}>
          <Caption>Attempts:{attendedCount}</Caption>
          <View style={styles.creditsContainer}>
            <Text style={styles.creditsText}>Credits {totalMarks}</Text>
            <Caption>/{totalQuestions}</Caption>
          </View>
        </View>
      </View>

      <PlayVideoIcon height={30} width={30} />
    </TouchableOpacity>
  );
}

function DropDownSection(props: any) {
  const completed = '20%';

  const {item, setVideo, setVideoId, addRecentVideo, setSectionId, navigation} = props;

  const {
    _id,
    courseId,
    description,
    sectionId,
    thumbnailUrl,
    transcript,
    videoTitle,
    videoUrl,
    documentUrl,
  } = item;

  const [show, setShow] = useState(false);

  return (
    <View style={styles.dropDownContainer}>
      <View style={styles.subAccordion}>
        <TouchableOpacity
          style={styles.videoContainer}
          onPress={async () => {
            setVideo(videoUrl);
            if (_id) {
              setVideoId(_id);
              setSectionId(sectionId);
            }
            await addRecentVideo({courseId, videoId: _id});
          }}>
          <Image
            source={{
              uri: thumbnailUrl,
            }}
            style={styles.image}
          />
          <View style={styles.videoIcon}>
            <PlayVideoIcon height={30} width={30} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dropDownSubContainer} onPress={() => setShow(!show)}>
          <View style={styles.videoTitle}>
            <Text style={styles.videoTitleText}>{videoTitle}</Text>
            {show ? <UpArrowIcon /> : <DownArrowIcon />}
          </View>
          <View>
            <Text>1hr 30min</Text>
          </View>
          <View style={styles.videoStatusBar}>
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                height: 8,
                width: completed,
                backgroundColor: colors.themeYellow,
                position: 'absolute',
                borderRadius: 10,
              }}
            />
          </View>
          <View>
            <Text>5% completed</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View>
        {show ? (
          <Tabs
            description={description}
            documentUrl={documentUrl}
            navigation={navigation}
            transcript={transcript}
          />
        ) : null}
      </View>
    </View>
  );
}

const renderTitle = (
  item,
  setVideo,
  setVideoId,
  addRecentVideo,
  courseId,
  setSectionId,
  navigation,
) => (
  <DropDownSection
    addRecentVideo={addRecentVideo}
    courseId={courseId}
    item={item}
    navigation={navigation}
    setSectionId={setSectionId}
    setVideo={setVideo}
    setVideoId={setVideoId}
  />
);

const renderIcon = (v: boolean, condition: boolean, credits: number) => (
  <View style={{flexDirection: 'row', alignItems: 'center'}}>
    {condition ? (
      <Text style={{color: colors.black, marginRight: 10}}>
        Credits 0/ <Text>{credits}</Text>
      </Text>
    ) : (
      <MaterialCommunityIcons color={colors.primary} name="lock-outline" size={30} />
    )}
    <View>
      <MaterialCommunityIcons name={v ? 'chevron-up' : 'chevron-down'} size={30} />
    </View>
  </View>
);

function DropDownList(props: any) {
  const {
    courseBought,
    condition,
    item,
    courseId,
    getVideos,
    videos,
    videoLoading,
    setVideo,
    setVideoId,
    setSectionId,
    addRecentVideo,
    readAssessment,
    selectedSection,
    setSelectedSection,
    index,
    navigation,
    document,
  } = props;

  const {sectionTitle, credits, _id} = item;

  const [expanded, setExpanded] = useState(selectedSection === index);
  const {assessment} = useSelector(s => s.main);

  const [loader, setLoader] = useState(false);

  const handlePress = async () => {
    if (condition && selectedSection !== index) {
      setSelectedSection(index);
      setLoader(true);
      await readAssessment({courseId, sectionId: _id});
      await getVideos({courseId, sectionId: _id, limit: 20, offset: 0});
      setLoader(false);
    }
  };

  return (
    <View style={styles.accordionContainer}>
      <List.Accordion
        // expanded={expanded}
        expanded={selectedSection === index}
        right={() => renderIcon(selectedSection === index, condition, credits)}
        title={
          <View style={styles.accordionTitle}>
            <Text>{sectionTitle}</Text>
          </View>
        }
        titleStyle={styles.text}
        onPress={() => handlePress()}>
        {loader ? (
          <View style={{marginVertical: 20}}>
            <ActivityIndicator color={colors.primary} />
          </View>
        ) : (
          videos.map((item, index) => {
            return (
              <List.Item
                key={index}
                style={styles.title}
                title={() =>
                  renderTitle(
                    item,
                    setVideo,
                    setVideoId,
                    addRecentVideo,
                    courseId,
                    setSectionId,
                    navigation,
                    document,
                  )
                }
              />
            );
          })
        )}

        {assessment ? <AssignmentSection {...props} /> : null}
      </List.Accordion>
    </View>
  );
}

function DocumentsAndVideos(props: any) {
  const {courseBought, courseId} = props;

  const [selectedSection, setSelectedSection] = useState(-1);

  const {sections, videoLoading} = useSelector(s => s.main);
  const {getVideos, addRecentVideo, readAssessment} = useMainScreenActions();

  const {videos} = useSelector(s => s.main);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {sections?.map((item, index) => {
        return (
          <DropDownList
            condition={index < 0 ? true : courseBought}
            courseBought={index < 0 ? true : courseBought}
            item={item}
            key={index}
            {...props}
            addRecentVideo={addRecentVideo}
            getVideos={getVideos}
            index={index}
            readAssessment={readAssessment}
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
            videoLoading={videoLoading}
            videos={videos}
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    // marginBottom: 60,
  },

  accordionContainer: {
    paddingBottom: 0,
    backgroundColor: colors.white,
    ...getShadow(2),
    borderRadius: 3,
    margin: 5,
    flexGrow: 1,
  },
  accordionTitle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  dropDownContainer: {
    flexGrow: 1,
  },
  subAccordion: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    ...getShadow(1),
    borderRadius: 5,
    marginVertical: 5,
    // marginBottom: 5,
    marginLeft: -10,
  },
  videoContainer: {
    // marginLeft: -10,
  },
  dropDownSubContainer: {
    flexGrow: 1,
    flex: 1,
    marginRight: 15,
  },

  title: {
    marginVertical: -10,
    flexGrow: 1,
  },
  text: {
    fontSize: 14,
    flexGrow: 1,
    flex: 1,
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 65,
    position: 'relative',
    borderRadius: 10,
    marginRight: 10,
  },
  videoIcon: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
    paddingHorizontal: 5,
  },
  videoTitleText: {
    height: 18,
    overflow: 'hidden',
    color: colors.black,
    marginRight: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.backgroundGrey,
    marginTop: 5,
  },
  tabContainerText: {
    padding: 10,
  },
  videoStatusBar: {
    height: 8,
    width: '100%',
    backgroundColor: colors.themeGray,
    borderRadius: 10,
    position: 'relative',
  },
  assignmentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.backgroundGrey,
    ...getShadow(1),
    borderRadius: 5,
    // marginBottom: 5,
    paddingHorizontal: 20,
    margin: 10,
    alignItems: 'center',
  },
  assignmentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  assignmentText: {
    fontSize: 13,
  },
  creditsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  creditsText: {
    marginLeft: 20,
    fontSize: 13,
  },
  attempts: {
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
  },
});

export default DocumentsAndVideos;
