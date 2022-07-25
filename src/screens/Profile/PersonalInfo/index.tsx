import React, {useEffect} from 'react';

import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {launchImageLibrary, ImageLibraryOptions} from 'react-native-image-picker';
import ObjectID from 'bson-objectid';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import Email from '../../../assets/images/Change_email.png';
import {AboutIcon, EmailIcon, LockIcon, PhoneIcon, UserIcon} from '../../../assets/svg';
import {getFileExtension} from '../../../components/Download';
import useSnackbar from '../../../components/SnackBar';
import ThemeButton from '../../../components/ThemeButton/ThemeButton';
import TopHeader from '../../../components/TopHeader';
import useImagePicker from '../../../components/useImagePicker';
import {colors} from '../../../config/colors';
import useUserActions from '../../../redux/actions/userActions';
import {getIdentityId} from '../../../utils';

const s3BaseUrl = 'https://s3.ap-south-1.amazonaws.com/';

const s3Bucket = 'medical-learning-development';

function Row(props: any) {
  const {data, navigation} = props;
  const {icon, value, path, border, edit} = data;

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={[styles.rowContainer, {borderWidth: border ? 1 : 0}]}>
      <View style={styles.icon}>
        {icon}
        <Text style={styles.text}>{value}</Text>
      </View>
      {border && !edit ? (
        <TouchableOpacity>
          <Text style={{color: colors.primary}} onPress={() => navigation.navigate(path)}>
            Edit
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

function PersonalInfo(props: any) {
  const {uploadProfileImage, getUserData, updateUserData} = useUserActions();

  const {user} = useSelector(s => s.user);

  const {_id, displayName, email, phone, profileUrl} = user || {};

  const LIST = [
    {
      icon: <AntDesign name="user" size={20} />,
      value: displayName,
      path: 'change_name',
      border: true,
    },
    {icon: <PhoneIcon />, value: `+91 ${phone}`, path: 'change_phone', border: true},
    {
      icon: <EmailIcon />,
      value: email,
      path: 'change_email',
      border: true,
      edit: true,
    },
    {icon: <LockIcon />, value: '*********', path: 'change_password', border: true},
    {icon: <AboutIcon />, value: 'Help', path: 'about', border: false},
  ];

  const loadData = async () => {
    await getUserData();
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleProfilePress = () => {
    const entityId = ObjectID();

    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 0.8,
    };

    launchImageLibrary(options, async response => {
      if (response && response?.assets && response?.assets.length) {
        const {uri, fileName, type} = response?.assets[0] || {};
        const extension = uri?.split('.').pop();

        const file = {
          name: fileName,
          uri,
          type,
        };
        const result = await uploadProfileImage({
          directory: 'user-assets',
          entityId,
          extension,
          file: uri,
        });
      }
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.profile}>
          <View style={styles.topHeader}>
            <TopHeader {...props} color={colors.white} />
          </View>
          <View style={styles.profileIcon}>
            <TouchableOpacity style={styles.userIcon} onPress={() => handleProfilePress()}>
              {profileUrl ? (
                <Image source={{uri: profileUrl}} style={styles.profileImage} />
              ) : (
                <View>
                  <View style={{padding: 30}}>
                    <UserIcon color={colors.white} height={50} width={50} />
                  </View>
                  <View style={styles.editText}>
                    <Text style={{color: colors.white}}>Edit</Text>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.header}>
          <Text style={{color: colors.themeYellow}}>Personal Info</Text>
        </View>
        <View style={styles.list}>
          {LIST.map(item => {
            return <Row data={item} key={item.path} {...props} />;
          })}
        </View>
      </View>

      {/* <View style={styles.buttonView}>
        <ThemeButton style={{paddingHorizontal: 30}} title="Save" />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  rowContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    marginBottom: 20,
  },
  buttonView: {
    alignItems: 'center',
    marginTop: 30,
  },
  list: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  profileImage: {
    width: 110,
    height: 110,
    overflow: 'hidden',
    borderRadius: 100,
  },
  header: {
    marginTop: -20,
    alignItems: 'center',
    marginHorizontal: '15%',
    padding: 10,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 5,
  },
  topHeader: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  profile: {
    height: 260,
    backgroundColor: colors.primary,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  userIcon: {
    borderWidth: 1,
    padding: 0,
    borderRadius: 100,
    position: 'relative',
    borderColor: colors.white,
  },
  profileIcon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginLeft: 10,
  },
  icon: {
    flexDirection: 'row',
  },
  editText: {
    alignItems: 'center',
    marginBottom: -20,
    borderTopWidth: 1,
    overflow: 'hidden',
    borderTopColor: colors.white,
    position: 'absolute',
    bottom: 25,
    left: 10,
    width: 90,
  },
});

export default PersonalInfo;
