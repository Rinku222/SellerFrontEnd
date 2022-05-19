import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import {List} from 'react-native-paper';
import {colors} from '../../../../config/colors';
import {getShadow} from '../../../../config/globalStyles';
import UserImage from '../../../../assets/images/laps.png';
import {DownArrowIcon, PlayVideoIcon, UpArrowIcon} from '../../../../assets/svg';

const data = [1, 2, 3];
const listData = [1, 2, 3, 4, 5];

function Tabs() {
  const [selected, setSelected] = useState(1);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          backgroundColor: colors.backgroundGrey,
          marginTop: 5,
        }}>
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
        <View style={{padding: 10}}>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae maiores dignissimos
            atque modi quos autem.
          </Text>
        </View>
      ) : (
        <View>
          <Text style={{padding: 10}}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sint, sequi nesciunt
            iusto aliquam ducimus.
          </Text>
        </View>
      )}
    </View>
  );
}

function DropDownSection() {
  const completed = '20%';

  const [show, setShow] = useState(false);

  console.log('----->show', show);

  return (
    <View style={{flexGrow: 1}}>
      <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => setShow(!show)}>
        <View>
          <Image source={UserImage} style={styles.image} />
          <View style={styles.videoIcon}>
            <PlayVideoIcon height={30} width={30} />
          </View>
        </View>
        <View style={{flexGrow: 1, flex: 1, marginRight: 5}}>
          <View style={styles.videoTitle}>
            <Text style={styles.videoTitleText}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dol
            </Text>
            {show ? <UpArrowIcon /> : <DownArrowIcon />}
          </View>
          <View>
            <Text>1hr 30min</Text>
          </View>
          <View
            style={{
              height: 8,
              width: '100%',
              backgroundColor: colors.themeGray,
              borderRadius: 10,
              position: 'relative',
            }}>
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
        </View>
      </TouchableOpacity>
      <View>{show ? <Tabs /> : null}</View>
    </View>
  );
}

const renderTitle = () => <DropDownSection />;

function DropDownList(props: any) {
  return (
    <View style={styles.accordionContainer}>
      <List.Accordion
        title={
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text>Accordion title</Text>
          </View>
        }
        titleStyle={styles.text}>
        {data.map(item => {
          return <List.Item key={item} style={styles.title} title={renderTitle} />;
        })}
      </List.Accordion>
    </View>
  );
}

function DocumentsAndVideos() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {/* <Text>Credits:20/20</Text> */}
      {listData.map(item => {
        return <DropDownList key={item} />;
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    // margin: 5,
    paddingHorizontal: 5,
  },
  topImageView: {
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 60,
    borderRadius: 10,
  },
  accordionContainer: {
    paddingBottom: 0,
    backgroundColor: colors.white,
    ...getShadow(2),
    borderRadius: 3,
    margin: 5,
    flexGrow: 1,
    width: '100%',
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
    width: '100%',
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
});

export default DocumentsAndVideos;