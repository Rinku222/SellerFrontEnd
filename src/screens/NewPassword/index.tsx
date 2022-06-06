import React, {useState} from 'react';
import {Text} from 'react-native';
import {Auth} from 'aws-amplify';
import Button from '../../components/Button';
import InputBox from '../../components/InputBox';
import {styles} from '../Login/styles';

function NewPassword(props) {
  const {route} = props;
  const {userName} = route.params;

  const [newpassword, setNewpassword] = useState('');
  const [otp, setOtp] = useState('');

  const handleChange = e => {
    setNewpassword(e);
  };
  const handleOtp = e => {
    setOtp(e);
  };

  const forgotpassword = () => {
    // confirmForgotPassword(username,otp,newpassword){
    Auth.forgotPasswordSubmit(userName, otp, newpassword)
      .then(value => {
        console.log('new password console', value);
      })
      .catch(error => {
        console.log('new password error', error);
      });
    // }
  };

  return (
    <>
      <Text style={styles.headerLabelTextSignUp}>New Password</Text>
      <InputBox
        // errorText={validationSignUp}
        placeHolder="Enter OTP"
        value={otp}
        onChangeText={handleOtp}
      />
      <InputBox
        // errorText={validationSignUp}
        placeHolder="New Password"
        value={newpassword}
        onChangeText={handleChange}
      />

      <Button
        style={{marginBottom: 20, alignSelf: 'center', marginTop: 22}}
        text="Next"
        variant="primary"
        onPress={() => {
          forgotpassword();
        }}
      />
    </>
  );
}

export default NewPassword;
