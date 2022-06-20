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
import {createService, Authorization} from '../../services/HttpService/HttpService';

function Login(props) {
  const animationDuration = 500;
  const initialBottomDrawerHeight = screenHeight > 650 ? 330 : 230;
  const finallBottomDrawerHeight = screenHeight > 650 ? 480 : 460;
  const AnimatedHeight = useRef(new Animated.Value(0)).current;
  const drawerHeight = initialBottomDrawerHeight;
  const [mode, setMode] = useState('landing');
  const [emailPhoneForSignUp, setEmailPhoneForSignUp] = useState('');
  const [nameForSignUp, setNameForSignUp] = useState('');
  const [incorrectPasswordError, setIncorrectPasswordError] = useState('');
  const [passwordForSignUp, setPasswordForSignUp] = useState('');
  const [confirmPasswordForSignUp, setConfirmPasswordForSignUp] = useState('');
  const [confirmPasswordForSignUpError, setConfirmPasswordForSignUpError] = useState('');
  const [passwordForSignUpError, setPasswordForSignUpError] = useState('');

  const [emailPhoneForLogin, setEmailPhoneForLogin] = useState('');
  const [passwordForLogin, setPasswordForLogin] = useState('');
  const [validationSignUp, setValidationSignUp] = useState(false);
  const [phoneForSignUp, setPhoneForSignUp] = useState('');
  const [validationLogIn, setValidationLogIn] = useState(false);

  // const [otp, setOtp] = useState({1: '', 2: '', 3: '', 4: '', 5: '', 6: ''});
  const {navigation} = props;

  // const inputOne = useRef();
  // const inputTwo = useRef();
  // const inputThree = useRef();
  // const inputFour = useRef();
  // const inputFive = useRef();
  // const inputSix = useRef();

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

    if (text.length > 2) {
      if (text.length === 0) {
        setValidationLogIn('Enter a valid Email');
      } else if (reg.test(text) === false) {
        setValidationLogIn('Enter a valid Email');
      } else if (reg.test(text) === true) {
        setValidationLogIn('');
      }
    }
  };
  const onPasswordChangeForLogin = (text: string) => {
    setPasswordForLogin(text);
  };

  const onPhoneChangeForSignUp = (text: string) => {
    if (text !== ' ') setPhoneForSignUp(text);
  };
  const onNameChangeForSignUp = (text: string) => {
    if (text !== ' ') setNameForSignUp(text);
  };

  const onEmailPhoneChangeForSignUp = (text: string) => {
    if (text !== ' ') setEmailPhoneForSignUp(text);
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (text.length > 2) {
      if (text.length === 0) {
        setValidationSignUp('Email is required');
      } else if (reg.test(text) === false) {
        setValidationSignUp('Enter a valid Email/PhoneNo');
      } else if (reg.test(text) === true) {
        setValidationSignUp('');
      }
    }
  };

  const onPasswordChangeForSignUp = (text: string) => {
    if (text !== ' ') setPasswordForSignUp(text);

    const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (text.length > 2) {
      if (text.length === 0) {
        setPasswordForSignUpError('password is required');
      } else if (reg.test(text) === false) {
        setPasswordForSignUpError('Not strong enough');
      } else if (reg.test(text) === true) {
        setPasswordForSignUpError('');
      }
    }
  };
  const onConfirmPasswordChangeForSignUp = (text: string) => {
    if (text !== ' ') setConfirmPasswordForSignUp(text);
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

  const renderLogin = () => {
    async function signIn() {
      try {
        const user = await Auth.signIn(emailPhoneForLogin, passwordForLogin);
        console.log('----->user in sign in', user);
        const Authorization1 = user.signInUserSession.idToken.jwtToken;
        navigation.navigate('App', {
          Authorization1,
        });
      } catch (error) {
        console.log('----->error', error);
        if (error.name === 'UserNotConfirmedException') {
          navigation.navigate('mail_verification', {
            emailPhoneForSignUp: emailPhoneForLogin,
          });
        }
        if (error.name === 'NotAuthorizedException') {
          setIncorrectPasswordError('Incorrect username or password');
        }
      }
    }

    return (
      <>
        <Text style={styles.headerLabelText}>Login</Text>
        <InputBox
          errorText={validationLogIn}
          placeHolder="Email"
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
        {incorrectPasswordError ? (
          <View style={{alignItems: 'center', marginVertical: 10}}>
            <Text style={{color: 'red'}}>{incorrectPasswordError}</Text>
          </View>
        ) : null}

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

  const renderSignUp = () => {
    const signUp = async () => {
      const valid =
        !confirmPasswordForSignUpError.length &&
        !validationSignUp &&
        !passwordForSignUpError.length;

      if (valid) {
        try {
          const {user} = await Auth.signUp({
            username: emailPhoneForSignUp,
            password: confirmPasswordForSignUp,
            attributes: {
              email: emailPhoneForSignUp, // optional
              phone_number: `+91${phoneForSignUp}`, // optional - E.164 number convention
              name: nameForSignUp,
            },
          });

          if (user) {
            console.log('----->user', user);

            const body = {
              displayName: nameForSignUp,
              email: emailPhoneForLogin,
              phone: phoneForSignUp,
            };

            const {data: result} = await createService('/mentee', body, {
              headers: {Authorization},
            });

            navigation.navigate('mail_verification', {
              itemId: 86,
              emailPhoneForSignUp,
              otherParam: 'anything you want here',
            });
          }
        } catch (error) {
          console.log('error signing up:', JSON.stringify(error));
          console.log('error error up:', error);
        }
      }
    };

    return (
      <>
        <Text style={styles.headerLabelTextSignUp}>Sign Up</Text>
        <InputBox
          // errorText={validationSignUp}
          placeHolder="Name"
          value={nameForSignUp}
          onChangeText={onNameChangeForSignUp}
        />
        <InputBox
          // errorText={validationSignUp}
          placeHolder="Phone No"
          style={{marginTop: 22}}
          value={phoneForSignUp}
          onChangeText={onPhoneChangeForSignUp}
        />
        <InputBox
          errorText={validationSignUp}
          placeHolder="Email Id"
          style={{marginTop: 22}}
          value={emailPhoneForSignUp}
          onChangeText={onEmailPhoneChangeForSignUp}
        />
        <InputBox
          secureTextEntry
          errorText={passwordForSignUpError}
          placeHolder="Password"
          style={{marginTop: 22}}
          value={passwordForSignUp}
          onChangeText={onPasswordChangeForSignUp}
        />
        <InputBox
          secureTextEntry
          errorText={confirmPasswordForSignUpError}
          placeHolder="Re-enter Password"
          style={{marginTop: 22}}
          value={confirmPasswordForSignUp}
          onChangeText={onConfirmPasswordChangeForSignUp}
        />
        <Button
          style={{marginBottom: 20, alignSelf: 'center', marginTop: 22}}
          text="Sign Up"
          variant="primary"
          onPress={signUp}
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
