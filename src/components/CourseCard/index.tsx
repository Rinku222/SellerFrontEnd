import React, {useState} from 'react';
import {TouchableOpacity, View, Image, Text, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native-paper';
import {AboutIcon, PlayVideoIcon, AchievementIcon} from '../../assets/svg';
import {colors} from '../../config/colors';
import {getShadow} from '../../utils';
import useWishlistActions from '../../redux/actions/wishlistActions';
import homeActions from '../../redux/actions/homeActions';
import useSearchActions from '../../redux/actions/searchActions';
import useMainScreenActions from '../../redux/actions/mainScreenActions';

// cards-heart

function SingleCertificateBar(props) {
  const {icon, text, background} = props;

  return (
    <View style={[styles.singleBarContainer, {backgroundColor: background}]}>
      {icon}
      <Text style={styles.singleBarText}>{text}</Text>
    </View>
  );
}

function RenderCertificateBar(props) {
  const {type = 'pending'} = props;
  switch (type) {
    case 'pending':
      return (
        <SingleCertificateBar
          background={colors.primary}
          icon={<AboutIcon color={colors.white} width={20} />}
          text="Pending"
        />
      );
    case 'get':
      return <SingleCertificateBar background={colors.themeSkyBlue} text="Get Certificate" />;
    case 'view':
      return (
        <SingleCertificateBar
          background={colors.themeYellow}
          icon={<AchievementIcon color={colors.white} width={20} />}
          text="View Certificate"
        />
      );
    default:
      return null;
  }
}

function RenderCourseBar(props) {
  const {progressValue} = props;

  const percentage = progressValue;

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <View style={styles.courseMainContainer}>
        <View style={styles.courseText}>
          {percentage === '100%' ? (
            <Text style={[styles.bold, styles.whiteColor]}>Completed</Text>
          ) : (
            <Text style={styles.bold}>{percentage} Completed</Text>
          )}
        </View>

        <View
          style={[
            styles.percentageFillBar,
            {
              backgroundColor: percentage === '100%' ? colors.primaryGreen : colors.themeYellow,
              width: percentage,
            },
          ]}
        />
      </View>
    </View>
  );
}

function CourseCard(props) {
  const {course, data, myCourse, searchName = '', selected = '', onPress, navigation} = props;

  const [wishlistLoader, setWishlistLoader] = useState(false);

  const {addWishlist, getWishlist, deleteWishlist} = useWishlistActions();
  const {getAllSearchedCourses} = useSearchActions();
  const {setCourseId} = useMainScreenActions();

  const {getHomeCourses} = homeActions();

  const {
    _id,
    amount,
    categoryId,
    courseTitle,
    coverImageUrl,
    createdBy,
    creationTS,
    courseId,
    description,
    duration,
    owner,
    totalLession,
    wishListed,
    wishListId,
    progressValue,
  } = data || {};

  const {name, profileUrl} = owner || {};

  const handleWishlistPress = async () => {
    if (wishListed) {
      setWishlistLoader(true);
      await deleteWishlist({courseId: _id});
      setWishlistLoader(false);
    } else {
      setWishlistLoader(true);
      await addWishlist({courseId: _id});
      setWishlistLoader(false);
    }
    getWishlist();
    getHomeCourses({offset: 0, limit: 10});
    getAllSearchedCourses({
      offset: 0,
      limit: 10,
      searchText: searchName,
      streamId: selected,
    });
  };

  return (
    <TouchableOpacity
      style={styles.cardMainContainer}
      onPress={async () => {
        await setCourseId({courseId});
        navigation.navigate('VideosScreen');
      }}>
      <View style={styles.topImageView}>
        <Image
          source={{
            uri: coverImageUrl,
          }}
          style={styles.profileImage}
        />
        {myCourse ? (
          <View style={styles.videoIcon}>
            <PlayVideoIcon height={30} width={30} />
          </View>
        ) : wishlistLoader ? (
          <ActivityIndicator
            animating
            color={colors.primary}
            size="small"
            style={styles.wishlistIcon}
          />
        ) : (
          <TouchableOpacity style={styles.wishlistIcon} onPress={() => handleWishlistPress()}>
            {wishListed ? (
              <MaterialCommunityIcons color={colors.primary} name="cards-heart" size={20} />
            ) : (
              <MaterialCommunityIcons name="cards-heart-outline" size={20} />
            )}
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.content}>
        <View style={{flexDirection: 'column', justifyContent: 'space-between', flexWrap: 'wrap'}}>
          <Text numberOfLines={2} style={styles.heading}>
            {courseTitle}
          </Text>
        </View>

        {!myCourse && (
          <View
            style={{
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View style={styles.subheading}>
              <Image source={{uri: profileUrl}} style={styles.image} />
              <Text>{name}</Text>
            </View>
            <Text style={{fontWeight: 'bold', marginBottom: 10}}>₹{amount}/-</Text>
          </View>
        )}
        <View style={styles.bottomRow}>
          <Text style={styles.fontSize}>{duration}</Text>
          <Text style={styles.fontSize}>{totalLession} Lessons</Text>
        </View>
      </View>
      {myCourse &&
        (course ? <RenderCourseBar progressValue={progressValue} /> : <RenderCertificateBar />)}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  content: {
    padding: 5,
  },
  cardMainContainer: {
    padding: 8,
    width: '100%',
    backgroundColor: colors.white,
    margin: 5,
    borderRadius: 10,
    flex: 0.5,
    ...getShadow(10),
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
  wishlistIcon: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: colors.white,
  },
  heading: {
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 20,
    marginTop: 12,
    width: 140,
    flex: 1,
    height: 40,
  },
  subheading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  topImageView: {
    position: 'relative',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  fontSize: {
    fontSize: 10,
  },
  singleBarText: {
    fontSize: 14,
    marginLeft: 10,
    color: colors.white,
  },
  singleBarContainer: {
    width: '100%',
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
  },
  courseText: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  whiteColor: {
    color: colors.white,
  },
  courseMainContainer: {
    backgroundColor: colors.themeBlue,
    borderRadius: 5,
    height: 30,
    position: 'relative',
    justifyContent: 'center',
    width: 150,
  },
  percentageFillBar: {
    borderRadius: 5,
    height: 30,
  },
});

export default CourseCard;
