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

function SingleCertificateBar(props) {
  const {icon, text, background, navigation, certificateUrl} = props;

  return (
    <TouchableOpacity
      style={[styles.singleBarContainer, {backgroundColor: background}]}
      onPress={() => navigation.navigate('PDFScreen', {url: certificateUrl})}>
      {icon}
      <Text style={styles.singleBarText}>{text}</Text>
    </TouchableOpacity>
  );
}

function RenderCertificateBar(props) {
  const {type = 'view', certificateUrl} = props;

  switch (type) {
    case 'pending':
      return (
        <SingleCertificateBar
          background={colors.primary}
          icon={<AboutIcon color={colors.white} width={20} />}
          text="Pending"
          {...props}
        />
      );
    case 'get':
      return (
        <SingleCertificateBar background={colors.themeSkyBlue} text="Get Certificate" {...props} />
      );
    case 'view':
      return (
        <SingleCertificateBar
          background={colors.themeYellow}
          certificateUrl={certificateUrl}
          icon={<AchievementIcon color={colors.white} width={20} />}
          text="View Certificate"
          {...props}
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

function CertificateCard(props) {
  const {course, data, myCourse, searchName = '', selected = '', navigation, price} = props;

  const [wishlistLoader, setWishlistLoader] = useState(false);

  const {addWishlist, getWishlist, deleteWishlist} = useWishlistActions();
  const {getAllSearchedCourses} = useSearchActions();
  const {setCourseId} = useMainScreenActions();

  const {getHomeCourses} = homeActions();

  const {
    _id,
    menteeId,
    courseId,
    certificateUrl,
    courseTitle,
    coverImageUrl,
    owner,
    totalLession,
    amount,
    duration,
  } = data || {};

  const {name, profileUrl} = owner || {};

  return (
    <TouchableOpacity style={styles.cardMainContainer}>
      <View style={styles.topImageView}>
        <Image
          source={{
            uri: coverImageUrl,
          }}
          style={styles.profileImage}
        />
      </View>
      <View style={styles.content}>
        <View style={{flexDirection: 'column', justifyContent: 'space-between', flexWrap: 'wrap'}}>
          <Text numberOfLines={2} style={styles.heading}>
            {courseTitle}
          </Text>
        </View>
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
        </View>
        <View style={styles.bottomRow}>
          <Text style={styles.fontSize}>{duration}</Text>
          <Text style={styles.fontSize}>{totalLession} Lessons</Text>
        </View>
      </View>
      <RenderCertificateBar {...props} certificateUrl={certificateUrl} />
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
    backgroundColor: colors.white,
    margin: 4,
    borderRadius: 10,
    flex: 0.5,
    ...getShadow(10),
  },
  heading: {
    fontWeight: 'bold',
    color: colors.black,
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

export default CertificateCard;
