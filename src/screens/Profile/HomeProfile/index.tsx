import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, Share} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Auth} from 'aws-amplify';
import {useSelector} from 'react-redux';
import UserImage from '../../../assets/images/laps.png';
import {
  UserIcon,
  CertificateIcon,
  ShareIcon,
  AboutIcon,
  CourseIcon,
  LogoutIcon,
} from '../../../assets/svg';
import {colors} from '../../../config/colors';
import loadingVariable from '../../../redux/selector';
import {Loader} from '../../../../App';
import useUserActions from '../../../redux/actions/userActions';

const List = [
  {
    name: 'My Profile',
    icon: <UserIcon color="#000" width={15} />,
    path: 'PersonalInfo',
  },
  {
    name: 'My Certificate',
    icon: <CertificateIcon width={15} />,
    path: 'MyCertificates',
  },
  {
    name: 'My Course',
    icon: <CourseIcon width={15} />,
    path: 'MyCourses',
  },
  {name: 'Share the App', icon: <ShareIcon width={15} />, path: 'Share'},
  {name: 'About', icon: <AboutIcon width={15} />, path: 'About'},
  {name: 'Log Out', icon: <LogoutIcon width={15} />, path: 'Logout'},
];

const onShare = async () => {
  try {
    const result = await Share.share({
      message: 'React Native | A framework for building native apps using React',
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    // alert(error.message);
    console.log('----->error in sharing', error);
  }
};

async function signOut(navigation) {
  try {
    await Auth.signOut();
    navigation.navigate('Login', {logout: true});
  } catch (error) {
    console.log('error signing out: ', error);
  }
}

const handlePress = async (path: string, navigation: any, cleanUserData: any) => {
  if (path === 'Logout') {
    cleanUserData();
    signOut(navigation);
  }
  if (path === 'Share') {
    onShare();
  }
  if (path !== 'Share' && path !== 'Logout') {
    navigation.navigate(path);
  }
};

function RenderRow(props: any) {
  const {data, navigation, cleanUserData} = props;
  const {name, icon, path} = data;

  return (
    <TouchableOpacity
      style={styles.rowContainer}
      // onPress={() => (path ? navigation.navigate(path) : onShare())}>
      onPress={() => handlePress(path, navigation, cleanUserData)}>
      <View style={styles.rowView}>
        <View style={styles.listStyle}>{icon}</View>
        <Text>{name}</Text>
      </View>

      <MaterialCommunityIcons color="black" name="chevron-right" size={20} />
    </TouchableOpacity>
  );
}

function HomeProfile(props: any) {
  const loading = loadingVariable();
  const {cleanUserData} = useUserActions();

  if (loading) {
    return <Loader />;
  }

  return (
    <View>
      <Image source={UserImage} style={styles.profileImage} />
      <View style={styles.curve} />
      <View>
        {List.map((item, index) => {
          return <RenderRow {...props} cleanUserData={cleanUserData} data={item} key={index} />;
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    width: '100%',
    height: '55%',
  },
  curve: {
    marginTop: -50,
    transform: [{scaleX: 1.6}],
    borderTopStartRadius: 200,
    borderTopEndRadius: 200,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: '55%',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  rowView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  listStyle: {
    marginRight: 10,
    width: 20,
  },
});

export default HomeProfile;
