import React, {useState} from 'react';
import {TouchableOpacity, View, Image, Text, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {colors} from '../../config/colors';
import {getShadow} from '../../utils';
import homeActions from '../../redux/actions/homeActions';
import {DeleteIcon} from '../../assets/svg';

function CartCourseCard(props) {
  const {course} = props;

  const {
    _id,
    amount,
    courseId,
    courseTitle,
    coverImageUrl,
    displayName,
    duration,
    profileUrl,
    totalLession,
  } = course || {};

  const {getCart, deleteCartCourse} = homeActions();
  const [loader, setLoader] = useState(false);

  const handleDelete = async () => {
    setLoader(true);
    await deleteCartCourse({userCartId: _id});
    await getCart();
    setLoader(false);
  };

  return (
    <View style={styles.cardMainContainer}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          marginBottom: 10,
        }}>
        <View>
          <Image
            source={{
              uri: coverImageUrl,
            }}
            style={{width: 100, height: 80, marginRight: 20, borderRadius: 8}}
          />
        </View>

        <View
          style={{
            flexGrow: 1,
            justifyContent: 'space-around',
            display: 'flex',
            height: 80,
          }}>
          <View
            style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={{color: colors.black, fontWeight: 'bold'}}>{courseTitle}</Text>
            {loader ? (
              <ActivityIndicator
                animating
                color={colors.primary}
                size="small"
                // style={styles.wishlistIcon}
              />
            ) : (
              <TouchableOpacity onPress={() => handleDelete()}>
                <DeleteIcon />
              </TouchableOpacity>
            )}
          </View>
          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{marginRight: 10}}>{duration}</Text>
            <Text>{totalLession} Lessons</Text>
          </View>
        </View>
      </View>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold', color: colors.black}}>₹{amount}/-</Text>
        <View style={{display: 'flex', flexDirection: 'row', marginLeft: 80, alignItems: 'center'}}>
          <Image
            source={{
              uri: profileUrl,
            }}
            style={{width: 30, height: 30, borderRadius: 20, marginRight: 10}}
          />
          <Text>{displayName}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardMainContainer: {
    padding: 8,
    backgroundColor: colors.white,
    margin: 5,
    borderRadius: 8,
    ...getShadow(10),
  },
});

export default CartCourseCard;
