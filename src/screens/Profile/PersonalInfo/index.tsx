import React from 'react';

import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {launchImageLibrary, ImageLibraryOptions} from 'react-native-image-picker';
import ObjectID from 'bson-objectid';
import Email from '../../../assets/images/Change_email.png';
import {AboutIcon, EmailIcon, LockIcon, PhoneIcon, UserIcon} from '../../../assets/svg';
import {getFileExtension} from '../../../components/Download';
import useSnackbar from '../../../components/SnackBar';
import ThemeButton from '../../../components/ThemeButton/ThemeButton';
import TopHeader from '../../../components/TopHeader';
import useImagePicker from '../../../components/useImagePicker';
import {colors} from '../../../config/colors';
import useUserActions from '../../../redux/actions/userActions';
// const options = {
//   title: 'Select Avatar',
//   customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
//   storageOptions: {
//     skipBackup: true,
//     path: 'images',
//   },
// };

const LIST = [
  {icon: <PhoneIcon />, value: '+91 1122112212', path: 'change_phone', border: true},
  {icon: <EmailIcon />, value: 'rinkupoonia162@gmail.com', path: 'change_email', border: true},
  {icon: <LockIcon />, value: '*********', path: 'change_password', border: true},
  {icon: <AboutIcon />, value: 'Help', path: 'about', border: false},
];

function Row(props: any) {
  const {data, navigation} = props;
  const {icon, value, path, border} = data;

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={[styles.rowContainer, {borderWidth: border ? 1 : 0}]}>
      <View style={styles.icon}>
        {icon}
        <Text style={styles.text}>{value}</Text>
      </View>
      {border ? (
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
  const {openImagePicker} = useImagePicker();
  const snackbar = useSnackbar();

  const {uploadProfileImage} = useUserActions();

  // const onChoose = v => {
  //   handleFileUpload(v);
  // };

  // const handleFileUpload = async file => {
  //   const {name} = file;
  //   const extension = getFileExtension(file.name);
  //   file.name = `${name}.${extension}`;
  //   // const formData = new FormData();
  //   // formData.append('folder_id', folderId);
  //   // formData.append('myfile[]', file);
  //   // formData.append('project_id', project_id);
  //   // await uploadRDFile(formData);
  //   // toggleDialog();
  //   snackbar.showMessage({
  //     message: 'File Uploaded successfully!',
  //     variant: 'success',
  //   });
  //   // loadFiles();
  // };

  const handleProfilePress = () => {
    console.log('----->pressed');

    const entityId = ObjectID();

    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 0.8,
    };
    launchImageLibrary(options, response => {
      const {uri, fileName, type} = response?.assets[0];
      console.log('Response = ', response);
      console.log('response.assets.uri = ', response.assets[0].uri);
      const extension = response.assets[0].uri.split('.').pop();

      const file = {
        uri,
        name: fileName,
        type,
      };

      console.log('----->file', file);

      console.log('----->extension', extension);
      uploadProfileImage({
        directory: 'user-assets',
        entityId,
        extension,
        file: response.assets[0].uri,
      });
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
              <View style={{padding: 30}}>
                <UserIcon color={colors.white} height={50} width={50} />
              </View>
              <View style={styles.editText}>
                <Text style={{color: colors.white}}>Edit</Text>
              </View>
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

      {/* <Image source={Email} style={{width: 100, height: 100}} /> */}

      <View style={styles.buttonView}>
        <ThemeButton style={{paddingHorizontal: 30}} title="Save" />
      </View>
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
