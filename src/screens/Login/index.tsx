import React, {useEffect, useState, useRef, useMemo} from 'react';
import {View, Animated, Easing, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {Auth} from 'aws-amplify';
import {styles} from './styles';
import Button from '../../components/Button';
import SplashSvgXml from '../../assets/svg/SplashSvg';
import InputBox from '../../components/InputBox';
import {screenHeight} from '../../config/globalStyles';
import {colors} from '../../config/colors';
import TopHeader from '../../components/TopHeader';
import Email from '../../assets/images/Change_email.png';

function Login(props) {
  const animationDuration = 500;
  const initialBottomDrawerHeight = screenHeight > 650 ? 330 : 230;
  const finallBottomDrawerHeight = screenHeight > 650 ? 480 : 460;
  const AnimatedHeight = useRef(new Animated.Value(0)).current;
  const drawerHeight = initialBottomDrawerHeight;
  const [mode, setMode] = useState('landing');
  const [emailPhoneForSignUp, setEmailPhoneForSignUp] = useState('');
  const [passwordForSignUp, setPasswordForSignUp] = useState('');
  const [confirmPasswordForSignUp, setConfirmPasswordForSignUp] = useState('');
  const [confirmPasswordForSignUpError, setConfirmPasswordForSignUpError] = useState('');

  const [emailPhoneForLogin, setEmailPhoneForLogin] = useState('');
  const [passwordForLogin, setPasswordForLogin] = useState('');
  const [validationSignUp, setValidationSignUp] = useState(false);
  const [validationLogIn, setValidationLogIn] = useState(false);
  const [otp, setOtp] = useState({1: '', 2: '', 3: '', 4: '', 5: '', 6: ''});
  const {navigation} = props;

  const inputOne = useRef();
  const inputTwo = useRef();
  const inputThree = useRef();
  const inputFour = useRef();
  const inputFive = useRef();
  const inputSix = useRef();

  const animateHeight = () => {
    // AnimatedHeight.setValue(0);
    Animated.timing(AnimatedHeight, {
      toValue: 1,
      duration: animationDuration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const heightForBottom = AnimatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [initialBottomDrawerHeight, finallBottomDrawerHeight],
  });

  const scaleForSvg = AnimatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [screenHeight > 650 ? 0.9 : 0.7, screenHeight > 650 ? 0.7 : 0.4],
  });

  const margiTopForSvg = AnimatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, screenHeight > 650 ? -210 : -190],
  });

  const fadeOpacity = AnimatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const appearOpacity = AnimatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const onButtonPress = mode => {
    setMode(mode);
    animateHeight();
  };

  function SplashSvg() {
    return (
      <Animated.View style={{transform: [{scale: scaleForSvg}], marginTop: margiTopForSvg}}>
        <SvgXml xml={SplashSvgXml} />
      </Animated.View>
    );
  }

  const memoizedSplash = useMemo(() => SplashSvg, []);

  const onEmailPhoneChangeForLogin = (text: string) => {
    setEmailPhoneForLogin(text);
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const reg2 = /^[+]?(\d{1,2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

    if (text.length > 2) {
      if (text.length === 0) {
        setValidationLogIn('Enter a valid Email/PhoneNo');
        console.log('----->enter something');
      } else if (reg.test(text) === false && reg2.test(text) === false) {
        console.log('----->false in regex');
        setValidationLogIn('Enter a valid Email/PhoneNo');
      } else if (reg.test(text) === true || reg2.test(text) === true) {
        console.log('----->true in both regex');
        setValidationLogIn('');
      }
    }
  };
  const onPasswordChangeForLogin = (text: string) => {
    setPasswordForLogin(text);
  };

  const onEmailPhoneChangeForSignUp = (text: string) => {
    setEmailPhoneForSignUp(text);
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const reg2 = /^[+]?(\d{1,2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

    if (text.length > 2) {
      if (text.length === 0) {
        setValidationSignUp('Enter a valid Email/PhoneNo');
        console.log('----->enter something');
      } else if (reg.test(text) === false && reg2.test(text) === false) {
        console.log('----->false in regex');
        setValidationSignUp('Enter a valid Email/PhoneNo');
      } else if (reg.test(text) === true || reg2.test(text) === true) {
        console.log('----->true in both regex');
        setValidationSignUp('');
      }
    }
  };

  const onPasswordChangeForSignUp = (text: string) => {
    setPasswordForSignUp(text);
  };
  const onConfirmPasswordChangeForSignUp = (text: string) => {
    setConfirmPasswordForSignUp(text);
    if (text.length > passwordForSignUp.length) {
      setConfirmPasswordForSignUpError('Passwords do not match');
    } else if (text.length === passwordForSignUp.length) {
      if (text === passwordForSignUp) {
        setConfirmPasswordForSignUpError('');
      } else {
        setConfirmPasswordForSignUpError('Passwords do not match');
      }
    } else {
      setConfirmPasswordForSignUpError('');
    }
  };

  const renderVerification = () => {
    const code = Object.values(otp).toString();
    console.log('Code is', code.replace(/,/g, ''));

    async function confirmSignUp() {
      try {
        const user = await Auth.confirmSignUp('deepak@amci.net.in', code.replace(/,/g, ''));
        console.log('confirm Sign Up', JSON.stringify(user));
      } catch (error) {
        console.log('error confirming sign up', error);
      }
    }

    console.log('----->props csdvsvr', props);

    return (
      <View style={styles.verificationContainer}>
        <TopHeader navigation={navigation} title="Email verification" />
        <View style={styles.verifyContainer}>
          <Image source={Email} />
          <Text numberOfLines={5} style={styles.emailText}>
            Enter the verification code you received on ri*@lip**.com on this mail id
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
  };

  const renderLogin = () => {
    async function signIn() {
      try {
        const user = await Auth.signIn('deepak@amci.net.in', 'Deepak@1234');
        console.log('Login success response', JSON.stringify(user));
      } catch (error) {
        console.log('error signing in', JSON.stringify(error));
      }
    }

    return (
      <>
        <Text style={styles.headerLabelText}>Login</Text>
        <InputBox
          errorText={validationLogIn}
          placeHolder="Email / Phone"
          style={styles.renderLoginTextBox}
          value={emailPhoneForLogin}
          onChangeText={onEmailPhoneChangeForLogin}
        />
        <InputBox
          secureTextEntry
          placeHolder="Password"
          style={styles.renderLoginTextBox}
          value={passwordForLogin}
          onChangeText={onPasswordChangeForLogin}
        />
        <Button style={styles.renderLoginButton} text="Login" variant="primary" onPress={signIn} />
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <TouchableOpacity>
            <Image source={require('../../assets/images/google.png')} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../../assets/images/FB.png')} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.signUp}>
          <Text>
            {"Don't have an account? "}
            <Text style={{color: colors.skyBlue}} onPress={() => setMode('signUp')}>
              Sign Up
            </Text>
          </Text>
        </View>
      </>
    );
  };

  const handleValidEmail = val => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (val.length === 0) {
      setEmailValidError('email address must be enter');
    } else if (reg.test(val) === false) {
      setEmailValidError('enter valid email address');
    } else if (reg.test(val) === true) {
      setEmailValidError('');
    }
  };

  const renderSignUp = () => {
    const signUp = async () => {
      console.log('----->signUp called');
      try {
        navigation.navigate('mail_verification', {
          itemId: 86,
          emailPhoneForSignUp,
          otherParam: 'anything you want here',
        });
      } catch (error) {
        console.log('error signing up:', JSON.stringify(error));
      }
    };
    return (
      <>
        <Text style={styles.headerLabelTextSignUp}>Sign Up</Text>
        <InputBox
          errorText={validationSignUp}
          placeHolder="Email / Phone"
          value={emailPhoneForSignUp}
          onChangeText={onEmailPhoneChangeForSignUp}
        />
        <InputBox
          secureTextEntry
          placeHolder="Password"
          style={{marginTop: 22}}
          value={passwordForSignUp}
          onChangeText={onPasswordChangeForSignUp}
        />
        <InputBox
          secureTextEntry
          errorText={confirmPasswordForSignUpError}
          placeHolder="Reenter Password"
          style={{marginTop: 22}}
          value={confirmPasswordForSignUp}
          onChangeText={onConfirmPasswordChangeForSignUp}
        />
        <Button
          style={{marginBottom: 20, alignSelf: 'center', marginTop: 22}}
          text="Sign Up"
          variant="primary"
          onPress={!validationSignUp.length === 0 ? null : signUp}
        />
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <TouchableOpacity>
            <Image source={require('../../assets/images/google.png')} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../../assets/images/FB.png')} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>
        <View style={{alignSelf: 'center', marginTop: 16}}>
          <Text>
            {'Already have an account? '}
            <Text style={{color: colors.skyBlue}} onPress={() => setMode('login')}>
              Login
            </Text>
          </Text>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperBody}>{memoizedSplash()}</View>
      <Animated.View style={[styles.mainBody, {height: heightForBottom}]}>
        <Animated.View style={[styles.headerLabel, {opacity: appearOpacity}]}>
          {mode === 'signUp' ? renderSignUp() : renderLogin()}
        </Animated.View>

        {mode === 'landing' ? (
          <Animated.View style={{opacity: fadeOpacity}}>
            <Button
              disabled={drawerHeight === finallBottomDrawerHeight}
              style={{marginBottom: 25}}
              text="Login"
              variant="primary"
              onPress={() => onButtonPress('login')}
            />
            <Button
              disabled={drawerHeight === finallBottomDrawerHeight}
              text="SignUp"
              onPress={() => onButtonPress('signUp')}
            />
          </Animated.View>
        ) : null}
      </Animated.View>
    </View>
  );
}

export default Login;
