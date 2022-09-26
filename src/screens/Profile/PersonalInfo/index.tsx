import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {launchImageLibrary, ImageLibraryOptions} from 'react-native-image-picker';
import ObjectID from 'bson-objectid';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Auth} from 'aws-amplify';
import {AboutIcon, EmailIcon, LockIcon, PhoneIcon, UserIcon} from '../../../assets/svg';
import TopHeader from '../../../components/TopHeader';
import {colors} from '../../../config/colors';
import useUserActions from '../../../redux/actions/userActions';

const schema = Yup.object().shape({
  name: Yup.string()
    .required('First Name name is required')
    .matches(/^[aA-zZ\s]+$/, 'Enter a valid name')
    .max(15, 'Must be less than 15 characters'),
});

function Edit(name: string) {
  return <Text style={{color: colors.primary}}>{name || 'Edit'}</Text>;
}

function Row(props: any) {
  const {data, navigation, email} = props;
  const {icon, value, path, border, edit} = data;
  // const {username} = useSelector(s => s.user.userData);
  const userData = useSelector(s => s.user.user.email);

  const forgotPassword = () => {
    Auth.forgotPassword(userData)
      .then(() => {
        navigation.navigate('new-password', {
          userName: value,
          navigate: 'profile',
        });
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  const handlePress = async () => {
    if (path === 'change_password') {
      forgotPassword();
    }
    if (path === 'change_phone') {
      const user1 = await Auth.currentAuthenticatedUser();

      const result1 = await Auth.updateUserAttributes(user1, {
        phone_number: '+917016515465',
      });
      console.log('----->change phone called', result1);
    }
  };

  return (
    // eslint-disable-next-line react-native/no-inline-styles

    <TextInput
      activeOutlineColor="#707070"
      activeUnderlineColor="transparent"
      editable={false}
      left={<TextInput.Icon name={() => icon} />}
      outlineColor="black"
      right={
        border && !edit ? (
          <TextInput.Icon name={() => Edit()} onPress={() => handlePress()} />
        ) : null
      }
      selectionColor="red"
      style={{
        height: 40,
        marginBottom: 20,
        justifyContent: 'center',
        borderWidth: border ? 1 : 0,
        backgroundColor: 'transparent',
      }}
      theme={{
        colors: {
          text: colors.textGrey,
        },
      }}
      underlineColor="transparent"
      underlineColorAndroid="transparent"
      value={value}
      onChangeText={text => console.log('----->changes', text)}
    />
  );
}

function PersonalInfo(props: any) {
  const {uploadProfileImage, getUserData, updateUserData, updateProfileImage} = useUserActions();

  const {user} = useSelector(s => s.user);

  const {_id, displayName, email, phone, profileUrl, s3Url} = user || {};

  console.log('-----> s3Url', s3Url);

  const LIST = [
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

  const [editName, setEditName] = useState(true);

  const loadData = async () => {
    getUserData();
  };

  useEffect(() => {
    // toggleEditName();
    // setEditName(!editName);
    // loadData();
    // console.log('----->api call');
    // updateUserData({profileUrl: ''});
  }, []);

  const toggleEditName = () => setEditName(v => !v);

  const handleUserSave = async (name: string) => {
    toggleEditName();
    if (displayName !== name) {
      await updateUserData({displayName: name});
      await getUserData();
    }
  };

  const handleProfilePress = () => {
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

        console.log('-----> fileName', fileName);
        console.log('-----> uri', uri);
        console.log('-----> type', type);
        console.log('-----> file', file);

        const array = s3Url?.split('/');
        const entityId1 = array?.[7];

        console.log('-----> entityId1', entityId1);
        console.log('-----> array', array);

        if (s3Url && entityId1 !== 'undefined') {
          console.log('----->inside if');
          console.log('-----> entityId', entityId1);

          const result = await uploadProfileImage({
            directory: 'user-assets',
            // entityId: '62dfcef8010384ee4f5c6e89',
            entityId1,
            extension,
            file: uri,
          });

          console.log('----->result', result);

          // const newUrl = generatedProfileUrl(entityId, result?.key);

          // updateUserData({profileUrl: newUrl});

          // console.log('----->new url data', newUrl);
        } else {
          const entityId = ObjectID();
          console.log('----->entityId', entityId);
          const result = await uploadProfileImage({
            directory: 'user-assets',
            entityId,
            extension,
            file: uri,
          });
          console.log('----->result', result);
        }
        await getUserData();
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
        <Formik
          initialValues={{name: displayName || ''}}
          validationSchema={schema}
          onSubmit={async values => handleUserSave(values.name)}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <View>
              <TextInput
                activeOutlineColor="#707070"
                activeUnderlineColor="transparent"
                editable={editName}
                // disabled={!editName}
                left={
                  <TextInput.Icon name={() => <AntDesign color="black" name="user" size={18} />} />
                }
                name="name"
                outlineColor="black"
                right={
                  <TextInput.Icon
                    name={() => Edit(editName ? 'Save' : 'Edit')}
                    onPress={() => (editName ? handleSubmit() : toggleEditName())}
                  />
                }
                style={{
                  marginHorizontal: 20,
                  height: 40,
                  marginTop: 30,
                  justifyContent: 'center',
                  borderWidth: 1,
                  backgroundColor: 'transparent',
                }}
                theme={{
                  colors: {
                    text: colors.textGrey,
                  },
                }}
                underlineColor="transparent"
                underlineColorAndroid="transparent"
                value={values.name}
                onChangeText={text => {
                  setFieldValue('name', text);
                }}
              />
              {errors.name && (
                <Text style={{color: 'red', marginHorizontal: 20}}>{errors.name}</Text>
              )}
            </View>
          )}
        </Formik>
        <View style={styles.list}>
          {LIST.map(item => {
            return <Row data={item} email={email} key={item.path} {...props} />;
          })}
        </View>
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
    marginTop: 20,
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
