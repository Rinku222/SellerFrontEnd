import React from 'react';
import {TouchableOpacity, View, Image, Text, StyleSheet} from 'react-native';
import {AboutIcon, PlayVideoIcon, AchievementIcon} from '../../assets/svg';
import {colors} from '../../config/colors';
// import UserImage from '../../../assets/images/laps.png';
import UserImage from '../../assets/images/laps.png';

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

function RenderCourseBar() {
  const percentage = '100%';

  return (
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
  );
}

function CourseCard(props) {
  const {course} = props;

  return (
    <View style={styles.cardMainContainer}>
      <View style={styles.topImageView}>
        <Image source={UserImage} style={styles.profileImage} />
        {course ? (
          <View style={styles.videoIcon}>
            <PlayVideoIcon height={30} width={30} />
          </View>
        ) : null}
      </View>
      <View style={styles.content}>
        <Text style={styles.heading}>Nursing</Text>
        <View style={styles.subheading}>
          <Image source={UserImage} style={styles.image} />
          <Text>Hugo First</Text>
        </View>
        <View style={styles.bottomRow}>
          <Text style={styles.colorBlack}>Advance</Text>
          <Text style={styles.fontSize}>16hr</Text>
          <Text style={styles.fontSize}>20 Lessons</Text>
        </View>
      </View>
      {course ? <RenderCourseBar /> : <RenderCertificateBar />}
    </View>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    width: '100%',
    height: 100,
    borderRadius: 20,
  },
  content: {
    padding: 10,
  },
  cardMainContainer: {
    padding: 8,
    backgroundColor: colors.white,
    margin: 5,
    borderRadius: 20,
    flex: 0.5,
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
  heading: {
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 20,
    marginTop: 12,
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
  },
  colorBlack: {
    color: colors.black,
    fontSize: 10,
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
  },
  percentageFillBar: {
    borderRadius: 5,
    height: 30,
  },
});

export default CourseCard;
