/* eslint-disable no-underscore-dangle */
import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView} from 'react-native';
import {Divider} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {colors} from '../../../../config/colors';
import UserImage from '../../../../assets/images/laps.png';
import Review from '../../../../components/Review';
import ThemeButton from '../../../../components/ThemeButton/ThemeButton';
import {StarFilledIcon, StarIcon} from '../../../../assets/svg';

const data = [1, 2, 3, 4, 5];

interface ReviewProps {
  _id: string;
  courseId: string;
  createdBy: string;
  creationTS: number;
  menteeName: string;
  profileUrl: string;
  rating: number;
  reviewDescription: string;
}

function Reviews(props: any) {
  const {courseId, readReviews, addReview, reviewed, courseBought} = props;

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);

  const {reviews} = useSelector(s => s.main);

  const handlePress = async () => {
    await addReview({reviewDescription: comment, courseId, rating});
    await readReviews({courseId, offSet: 0, limit: 20});
    setComment('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {courseBought && !reviewed && (
        <View>
          <View style={styles.subContainer}>
            <Image source={UserImage} style={styles.image} />
            <View style={styles.flexGrow}>
              <View style={styles.starIcons}>
                {data.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={item}
                      style={styles.starIcon}
                      onPress={() => setRating(index + 1)}>
                      {index < rating ? (
                        <StarFilledIcon height={25} width={25} />
                      ) : (
                        <StarIcon height={25} width={25} />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
              <View style={{flex: 1}}>
                <TextInput
                  multiline
                  numberOfLines={2}
                  placeholder="Write your Review here"
                  style={styles.input}
                  value={comment}
                  onChangeText={v => setComment(v)}
                />
              </View>

              <View style={styles.button}>
                <ThemeButton title="Submit" onPress={() => handlePress()} />
              </View>
            </View>
          </View>
          <Divider style={styles.divider} />
        </View>
      )}

      {reviews &&
        reviews.map((item: ReviewProps) => {
          return <Review key={item._id} review={item} />;
        })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    borderColor: colors.lightGrey,
    flex: 1,
    borderRadius: 5,
    marginVertical: 10,
  },
  divider: {
    height: 3,
    backgroundColor: colors.themeBlack,
    marginVertical: 10,
  },
  button: {
    alignItems: 'flex-start',
  },
  starIcon: {
    marginRight: 5,
  },
  starIcons: {
    flexDirection: 'row',
    marginVertical: 7.5,
  },
  subContainer: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  flexGrow: {
    flexGrow: 1,
    flex: 1,
  },
});

export default Reviews;
