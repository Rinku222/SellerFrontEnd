import React, {useState, useRef} from 'react';
import {View, Text, Image, TextInput} from 'react-native';
import {Auth} from 'aws-amplify';
import {styles} from './style';
import Button from '../../../components/Button/index';
import TopHeader from '../../../components/TopHeader';
import Email from '../../../assets/images/Change_email.png';
import useUserActions from '../../../redux/actions/userActions';

function VerificationMail(props) {
  const [otp, setOtp] = useState({1: '', 2: '', 3: '', 4: '', 5: '', 6: ''});
  const {navigation, route} = props;
  const {emailPhoneForSignUp, passwordForSignUp} = route.params;

  const {getUserDetails} = useUserActions();

  const inputOne = useRef();
  const inputTwo = useRef();
  const inputThree = useRef();
  const inputFour = useRef();
  const inputFive = useRef();
  const inputSix = useRef();

  const code = Object.values(otp).toString();

  async function confirmSignUp() {
    try {
      const user = await Auth.confirmSignUp(emailPhoneForSignUp, code.replace(/,/g, ''));
      if (user) {
        await getUserDetails({
          emailPhoneForLogin: emailPhoneForSignUp,
          passwordForLogin: passwordForSignUp,
        });

        navigation.navigate('App');
      }
    } catch (error) {
      console.log('error confirming sign up', error);
    }
  }

  return (
    <View style={styles.verificationContainer}>
      <TopHeader navigation={navigation} title="Email verification" />
      <View style={styles.verifyContainer}>
        <Image source={Email} />
        <Text numberOfLines={5} style={styles.emailText}>
          Enter the verification code you received on {emailPhoneForSignUp}
        </Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputTextContainer}>
            <TextInput
              keyboardType="number-pad"
              maxLength={1}
              ref={inputOne}
              style={styles.inputText}
              onChangeText={text => {
                setOtp({...otp, 1: text});
                text && inputTwo.current.focus();
              }}
            />
          </View>
          <View style={styles.inputTextContainer}>
            <TextInput
              keyboardType="number-pad"
              maxLength={1}
              ref={inputTwo}
              style={styles.inputText}
              onChangeText={text => {
                setOtp({...otp, 2: text});
                text ? inputThree.current.focus() : inputOne.current.focus();
              }}
            />
          </View>
          <View style={styles.inputTextContainer}>
            <TextInput
              keyboardType="number-pad"
              maxLength={1}
              ref={inputThree}
              style={styles.inputText}
              onChangeText={text => {
                setOtp({...otp, 3: text});
                text ? inputFour.current.focus() : inputTwo.current.focus();
              }}
            />
          </View>
          <View style={styles.inputTextContainer}>
            <TextInput
              keyboardType="number-pad"
              maxLength={1}
              ref={inputFour}
              style={styles.inputText}
              onChangeText={text => {
                setOtp({...otp, 4: text});
                text ? inputFive.current.focus() : inputThree.current.focus();
              }}
            />
          </View>
          <View style={styles.inputTextContainer}>
            <TextInput
              keyboardType="number-pad"
              maxLength={1}
              ref={inputFive}
              style={styles.inputText}
              onChangeText={text => {
                setOtp({...otp, 5: text});
                text ? inputSix.current.focus() : inputFour.current.focus();
              }}
            />
          </View>
          <View style={styles.inputTextContainer}>
            <TextInput
              keyboardType="number-pad"
              maxLength={1}
              ref={inputSix}
              style={styles.inputText}
              onChangeText={text => {
                setOtp({...otp, 6: text});
                text ? inputSix.current.focus() : inputFive.current.focus();
              }}
            />
          </View>
        </View>
        <Button style={styles.button} text="Verify" variant="primary" onPress={confirmSignUp} />
      </View>
    </View>
  );
}

export default VerificationMail;
