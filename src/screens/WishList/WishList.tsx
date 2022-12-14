import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ActivityIndicator, Button} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {colors} from '../../config/colors';
import useWishlistActions from '../../redux/actions/wishlistActions';
import Price from '../../components/Price';
import useMainScreenActions from '../../redux/actions/mainScreenActions';
import {EmptyWishlistIcon} from '../../assets/svg';

function renderEmpty(props) {
  const {navigation} = props;

  return (
    <View
      style={{
        flexGrow: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      <View>
        <EmptyWishlistIcon />
      </View>
      <View>
        <Text style={{textAlign: 'center', color: '#285892', fontWeight: 'bold'}}>
          Your wishlist is Empty!
        </Text>
        <Text style={{textAlign: 'center'}}>Explore more and shortlist some courses</Text>
      </View>
      <View>
        <Button
          color={colors.primary}
          labelStyle={{color: colors.white}}
          mode="contained"
          style={{
            paddingVertical: 5,
            borderRadius: 8,
          }}
          onPress={() => navigation.navigate('search')}>
          View Course
        </Button>
      </View>
    </View>
  );
}

function RenderRow(props) {
  const {data, navigation} = props;

  const {
    _id,
    amount,
    courseId,
    courseTitle,
    coverImageUrl,
    duration,
    totalLession,
    overallRating,
    totalReview,
  } = data;

  const [loader, setLoader] = useState(false);

  const {deleteWishlist, getWishlist} = useWishlistActions();
  const {setCourseId} = useMainScreenActions();

  const handleDeleteWishlist = async () => {
    setLoader(true);
    await deleteWishlist({courseId});
    await getWishlist();
    setLoader(false);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={async () => {
        await setCourseId({courseId});
        navigation.navigate('VideosScreen');
      }}>
      <Image
        source={{
          uri: coverImageUrl,
        }}
        style={styles.image}
      />
      <View style={styles.subContainer}>
        <View style={styles.itemHeading}>
          <Text style={styles.colorBlack}>{courseTitle}</Text>
          {loader ? (
            <ActivityIndicator animating color={colors.primary} size="small" />
          ) : (
            <TouchableOpacity onPress={handleDeleteWishlist}>
              <MaterialCommunityIcons color={colors.primary} name="cards-heart" size={20} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.itemReview}>
          <MaterialCommunityIcons color={colors.primary} name="star" size={20} />
          <Text style={styles.colorBlack}>{overallRating} </Text>
          <Text style={styles.colorBlack}>({totalReview} reviews)</Text>
        </View>
        <View style={styles.itemTime}>
          <MaterialCommunityIcons color={colors.themeGray} name="clock-outline" size={20} />
          <Text style={styles.colorGreyTheme}>{duration}</Text>
        </View>
        <View style={styles.itemLessons}>
          <Text>{totalLession} Lesson</Text>
          <Text style={[styles.colorBlack, styles.bold]}>{Price(amount)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function WishList(props) {
  const {wishlist} = useSelector(s => s.wishlist);

  const [loader, setLoader] = useState(false);

  const {getWishlist} = useWishlistActions();

  const loadData = async () => {
    setLoader(true);
    await getWishlist();
    setLoader(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.mainContainer}>
      {loader ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexGrow: 1}}>
          <ActivityIndicator animating color={colors.primary} size="small" />
        </View>
      ) : wishlist ? (
        <View style={{flexGrow: 1}}>
          <View style={styles.heading}>
            <Text style={styles.colorBlack}>All Saved Program</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
            {wishlist.map((item, i) => {
              return <RenderRow data={item} key={i} {...props} />;
            })}
          </ScrollView>
        </View>
      ) : (
        renderEmpty({...props})
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    flexGrow: 1,
  },
  scrollView: {
    flex: 1,
  },
  heading: {
    display: 'flex',
    alignItems: 'center',
    padding: 20,
  },
  colorBlack: {
    color: colors.black,
  },
  colorGreyTheme: {
    color: colors.themeGray,
  },
  container: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.7,
    shadowRadius: 3,
    elevation: 5,
  },
  subContainer: {
    padding: 10,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 120,
    borderRadius: 10,
  },
  itemHeading: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  itemTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemReview: {
    flexDirection: 'row',
  },
  itemLessons: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default WishList;
