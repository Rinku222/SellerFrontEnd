import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import UserImage from '../../../assets/images/laps.png';
import {UserIcon, CertificateIcon, ShareIcon, AboutIcon, CourseIcon} from '../../../assets/svg';
import {colors} from '../../../config/colors';
import loadingVariable from '../../../redux/selector';
import {Loader} from '../../../../App';

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
  {name: 'Share the App', icon: <ShareIcon width={15} />, path: 'Quiz'},
  {name: 'About', icon: <AboutIcon width={15} />, path: 'About'},
];

function RenderRow(props: any) {
  const {data, navigation} = props;
  const {name, icon, path} = data;

  return (
    <TouchableOpacity style={styles.rowContainer} onPress={() => navigation.navigate(path)}>
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

  if (loading) {
    return <Loader />;
  }

  return (
    <View>
      <Image source={UserImage} style={styles.profileImage} />
      <View style={styles.curve} />
      <View>
        {List.map((item, index) => {
          return <RenderRow {...props} data={item} key={index} />;
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    width: '100%',
    height: '60%',
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
    top: '60%',
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
