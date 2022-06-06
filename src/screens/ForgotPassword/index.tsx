import React, {useState} from 'react';
import {Text} from 'react-native';
import {Auth} from 'aws-amplify';
import Button from '../../components/Button';
import InputBox from '../../components/InputBox';
import {styles} from '../Login/styles';

function Forgot(props: any) {
  console.log('-------->123', props);

  const {navigation} = props;
  const [email, setEmail] = useState('');

  const handleChange = e => {
    setEmail(e);
  };

  const forgotpassword = () => {
    Auth.forgotPassword(email)
      .then(value => {
        console.log('value', value);
        navigation.navigate('new-password', {
          userName: email,
        });
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  return (
    <>
      <Text style={styles.headerLabelTextSignUp}>Forgot Password</Text>
      <InputBox
        // errorText={validationSignUp}
        placeHolder="Email"
        value={email}
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

export default Forgot;
