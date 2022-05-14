import React from 'react';

import {View, StyleSheet, Text, Image} from 'react-native';
import {colors} from '../../config/colors';
import UserImage from '../../assets/images/laps.png';

function ReviewsList() {
  return (
    <View style={{flexDirection: 'row', marginBottom: 20}}>
      <View style={{marginRight: 10}}>
        <Image source={UserImage} style={styles.image} />
      </View>
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
          <Text>Hugo First</Text>
          <Text>8 Aug 08:00</Text>
        </View>
        <View>
          <Text style={{color: colors.black}}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
            sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {padding: 10, flexGrow: 1, justifyContent: 'space-around'},
  content: {
    paddingHorizontal: 15,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    // marginRight: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: colors.lightGrey,
    flexGrow: 1,
    borderRadius: 5,
  },
});

export default ReviewsList;
