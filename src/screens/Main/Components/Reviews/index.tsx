import React, {useState} from 'react';

import {View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, TextInput} from 'react-native';
import {Divider, Subheading} from 'react-native-paper';
import {colors} from '../../../../config/colors';
import UserImage from '../../../../assets/images/laps.png';
import ReviewsList from '../../../../components/ReviewsList';
import ThemeButton from '../../../../components/ThemeButton/ThemeButton';

function Reviews(props) {
  const [comment, setComment] = useState('');

  return (
    <View style={styles.container}>
      <Text>Message</Text>
      <View style={{flexDirection: 'row', flexGrow: 1}}>
        <Image source={UserImage} style={styles.image} />
        <View style={{flexGrow: 1}}>
          <Text>hello</Text>
          <TextInput
            multiline
            numberOfLines={4}
            placeholder="Write your Review here"
            style={styles.input}
            value={comment}
            onChangeText={v => setComment(v)}
          />
          <View style={{alignItems: 'flex-start'}}>
            <ThemeButton
              title="Submit"
              onPress={() => console.log('----->submit button pressed')}
            />
          </View>
        </View>
      </View>
      <Divider style={{height: 3, backgroundColor: colors.themeBlack, marginVertical: 10}} />
      <ReviewsList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {padding: 10, flexGrow: 1, justifyContent: 'space-around'},
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderColor: colors.lightGrey,
    flexGrow: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default Reviews;
