import React, {useState} from 'react';

import {View, StyleSheet, Image, TextInput, ScrollView} from 'react-native';
import {Divider} from 'react-native-paper';
import {colors} from '../../../../config/colors';
import UserImage from '../../../../assets/images/laps.png';
import ReviewsList from '../../../../components/Review';

function Messages(props: any) {
  const {courseBought} = props;
  const [comment, setComment] = useState('hello');

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {courseBought ? (
        <View>
          <View style={styles.imageContainer}>
            <Image source={UserImage} style={styles.image} />
            <TextInput
              multiline
              numberOfLines={4}
              placeholder="useless placeholder"
              style={styles.input}
              value={comment}
              onChangeText={v => setComment(v)}
            />
          </View>
          <Divider style={styles.divider} />
        </View>
      ) : null}

      <ReviewsList />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 10,
    flexGrow: 1,
    marginTop: 5,
    // justifyContent: 'space-around',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  divider: {
    height: 3,
    backgroundColor: colors.themeBlack,
    marginVertical: 10,
  },
});

export default Messages;
