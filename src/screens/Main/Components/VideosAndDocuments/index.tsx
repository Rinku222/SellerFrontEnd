import React, {useState} from 'react';

import {View, StyleSheet, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import {List} from 'react-native-paper';
import TabView from '../TabView';
import {colors} from '../../../../config/colors';
import {getShadow} from '../../../../config/globalStyles';
// import UserImage from '../../../assets/images/laps.png';
import UserImage from '../../../../assets/images/laps.png';
import {DownArrowIcon, PlayVideoIcon, UpArrowIcon} from '../../../../assets/svg';

const data = [1, 2, 3];
const listData = [1, 2, 3, 4, 5];

function DropDownSection() {
  const completed = '20%';

  const [show, setShow] = useState(false);

  console.log('----->show', show);

  return (
    <View>
      <TouchableOpacity style={{flexDirection: 'row', flexGrow: 1}} onPress={() => setShow(!show)}>
        <View>
          <Image
            source={UserImage}
            style={{
              width: 100,
              height: 65,
              position: 'relative',
              borderRadius: 10,
              marginRight: 10,
            }}
          />
          <View
            style={{
              position: 'absolute',
              right: 0,
              left: 0,
              top: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <PlayVideoIcon height={30} width={30} />
          </View>
        </View>
        <View style={{flexGrow: 1, flex: 1, marginRight: 5}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexGrow: 1,
            }}>
            <Text style={{height: 18, overflow: 'hidden', color: colors.black, marginRight: 10}}>
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
              backgroundColor: colors.greyTheme,
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
      {show ? <TabView /> : null}
    </View>
  );
}

function DropDownList(props: any) {
  return (
    <View style={styles.accordionContainer}>
      <List.Accordion
        title={
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              flex: 1,
              borderWidth: 1,
              width: '100%',
            }}>
            <Text>Accordion title</Text>
            <Text>Accordion title</Text>
          </View>
        }
        titleStyle={styles.text}>
        {data.map(item => {
          return <List.Item style={styles.title} title={() => DropDownSection()} />;
        })}
      </List.Accordion>
    </View>
  );
}

function DocumentsAndVideos() {
  return (
    <ScrollView style={styles.container}>
      {/* <Text>Credits:20/20</Text> */}
      {listData.map(item => {
        return <DropDownList />;
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    // borderWidth: 1,
    margin: 5,
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
  },
  text: {
    fontSize: 12,
    flexGrow: 1,
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
  },
  videoIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DocumentsAndVideos;
