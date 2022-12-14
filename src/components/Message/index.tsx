import React from 'react';

import {View, StyleSheet, Text, Image} from 'react-native';
import {colors} from '../../config/colors';
import UserImage from '../../assets/images/laps.png';
import DateConvertor from '../../utils/DateConvertor';

function Message(props) {
  const {data} = props;

  const {creationTS, courseId, profileUrl, label, message} = data || {};

  return (
    <View style={styles.mainContainer}>
      <View style={styles.subContainer}>
        <View style={styles.userImage}>
          <Image source={{uri: profileUrl}} style={styles.image} />
        </View>
        <View style={styles.mentorName}>
          <Text>{label}</Text>
          <Text>{DateConvertor(creationTS)}</Text>
        </View>
      </View>
      <View style={styles.reviewDescription}>
        <Text style={{color: colors.black}}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  mainContainer: {
    marginBottom: 5,
    borderBottomColor: colors.themeGray,
    borderBottomWidth: 2,
  },
  subContainer: {flexDirection: 'row', marginBottom: 20},
  reviewDescription: {
    marginLeft: 50,
    marginTop: -20,
    paddingBottom: 10,
  },
  mentorName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  userImage: {
    marginRight: 10,
  },
});

export default Message;
