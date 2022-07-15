import React from 'react';

import {View, StyleSheet, Text, Image} from 'react-native';
import {colors} from '../../config/colors';
import UserImage from '../../assets/images/laps.png';
import DateConvertor from '../../utils/DateConvertor';

function Review(props) {
  const {review} = props;

  const {reviewDescription, creationTS, courseId, mentorName} = review || {};

  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', marginBottom: 20}}>
        <View style={{marginRight: 10}}>
          <Image source={UserImage} style={styles.image} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <Text>{mentorName}</Text>
          {/* <Text>{new Date(creationTS).toLocaleDateString('de-DE')}</Text> */}
          <Text>{DateConvertor(creationTS)}</Text>
        </View>
      </View>
      <View style={{flexGrow: 1, marginLeft: 50, marginTop: -20, paddingBottom: 20}}>
        <Text style={{color: colors.black}}>{reviewDescription}</Text>
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
});

export default Review;
