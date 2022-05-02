import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import SuccessIcon from '../../../assets/images/update_success.png';
import TopHeader from '../../../components/TopHeader';

function UpdateSuccess(props) {
  return (
    <View style={styles.container}>
      <TopHeader {...props} />
      <View style={{flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image source={SuccessIcon} style={styles.image} />
        <Text>Password Changes Successfully</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {},
});

export default UpdateSuccess;
