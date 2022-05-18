import React from 'react';

import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import Email from '../../../assets/images/Change_email.png';
import {AboutIcon, EmailIcon, LockIcon, PhoneIcon, UserIcon} from '../../../assets/svg';
import ThemeButton from '../../../components/ThemeButton/ThemeButton';
import TopHeader from '../../../components/TopHeader';
import {colors} from '../../../config/colors';

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

function PersonalInfo(props) {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.profile}>
          <View style={styles.topHeader}>
            <TopHeader {...props} color={colors.white} />
          </View>
          <View style={styles.profileIcon}>
            <View style={styles.userIcon}>
              <View style={{padding: 30}}>
                <UserIcon color={colors.white} height={50} width={50} />
              </View>
              <View style={styles.editText}>
                <Text style={{color: colors.white}}>Edit</Text>
              </View>
            </View>
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
        <ThemeButton
          style={{paddingHorizontal: 30}}
          title="Save"
          onPress={() => console.log('----->pressed')}
        />
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
