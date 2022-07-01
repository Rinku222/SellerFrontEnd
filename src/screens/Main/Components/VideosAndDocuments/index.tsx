import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import {ActivityIndicator, List} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {colors} from '../../../../config/colors';
import {getShadow} from '../../../../config/globalStyles';
import UserImage from '../../../../assets/images/laps.png';
import {DownArrowIcon, PlayVideoIcon, UpArrowIcon} from '../../../../assets/svg';
import useMainScreenActions from '../../../../redux/actions/mainScreenActions';

function Tabs(props) {
  const {description, transcript} = props;
  const [selected, setSelected] = useState(1);

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
          <Text>{description}</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.tabContainerText}>{transcript}</Text>
        </View>
      )}
    </View>
  );
}

function DropDownSection(props) {
  const completed = '20%';

  const {item, setVideo, setVideoId} = props;

  const {
    _id,
    courseId,
    description,
    documentUrl,
    duration,
    order,
    sectionId,
    thumbnailUrl,
    transcript,
    videoTitle,
    videoUrl,
  } = item;

  const [show, setShow] = useState(false);

  return (
    <View style={styles.dropDownContainer}>
      <View style={styles.subAccordion}>
        <TouchableOpacity
          style={styles.videoContainer}
          onPress={() => {
            setVideo(videoUrl);
            setVideoId(_id);
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
      <View>{show ? <Tabs description={description} transcript={transcript} /> : null}</View>
    </View>
  );
}

const renderTitle = (item, setVideo, setVideoId) => (
  <DropDownSection item={item} setVideo={setVideo} setVideoId={setVideoId} />
);

const renderIcon = (v, courseBought, credits) => (
  <View style={{flexDirection: 'row', alignItems: 'center'}}>
    {courseBought ? (
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
  const {courseBought, item, courseId, getVideos, videos, videoLoading, setVideo, setVideoId} =
    props;

  const {sectionTitle, credits, _id} = item;

  const [expanded, setExpanded] = useState(false);

  const handlePress = async () => {
    if (courseBought) {
      setExpanded(!expanded);
    }
    if (!expanded) {
      await getVideos({courseId, sectionId: _id, limit: 20, offset: 0});
    }
  };

  return (
    <View style={styles.accordionContainer}>
      <List.Accordion
        expanded={expanded}
        right={() => renderIcon(expanded, courseBought, credits)}
        title={
          <View style={styles.accordionTitle}>
            <Text>{sectionTitle}</Text>
          </View>
        }
        titleStyle={styles.text}
        onPress={() => handlePress(expanded)}>
        {videoLoading ? (
          <View style={{marginVertical: 20}}>
            <ActivityIndicator color={colors.primary} />
          </View>
        ) : (
          videos.map(item => {
            return (
              <List.Item
                key={item}
                style={styles.title}
                title={() => renderTitle(item, setVideo, setVideoId)}
              />
            );
          })
        )}
      </List.Accordion>
    </View>
  );
}

function DocumentsAndVideos(props: any) {
  const {courseBought} = props;

  const {sections, videoLoading} = useSelector(s => s.main);
  const {getVideos} = useMainScreenActions();

  const {videos} = useSelector(s => s.main);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {sections?.map((item, index) => {
        return (
          <DropDownList
            courseBought={index < 2 ? true : courseBought}
            item={item}
            key={item}
            {...props}
            getVideos={getVideos}
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
});

export default DocumentsAndVideos;
