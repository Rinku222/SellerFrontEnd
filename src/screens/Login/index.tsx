import React, {useState, useRef} from 'react';
import {View, Animated, Easing, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {Auth} from 'aws-amplify';
import {styles} from './styles';
import Button from '../../components/Button';
import SplashSvgXml from '../../assets/svg/SplashSvg';
import InputBox from '../../components/InputBox';
import {screenHeight} from '../../config/globalStyles';
import {colors} from '../../config/colors';
import {createService, Authorization} from '../../services/HttpService/HttpService';
import useUserActions from '../../redux/actions/userActions';
import {Loader} from '../../../App';
// import

const ANIMATION_DURATION = 500;

function Login(props) {
  const initialBottomDrawerHeight = screenHeight > 650 ? 330 : 230;
  const finalBottomDrawerHeight = screenHeight - 100;
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
  const [loading, setLoading] = useState(false);

  const [emailPhoneForLogin, setEmailPhoneForLogin] = useState('');
  const [passwordForLogin, setPasswordForLogin] = useState('');
  const [validationSignUp, setValidationSignUp] = useState<string | boolean>(false);
  const [phoneForSignUp, setPhoneForSignUp] = useState('');
  const [validationLogIn, setValidationLogIn] = useState<string | boolean>(false);

  const {getUserDetails} = useUserActions();

  const {navigation} = props;

  const animateHeight = () => {
    Animated.timing(AnimatedHeight, {
      toValue: 1,
      duration: ANIMATION_DURATION,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const scaleForSvg = AnimatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [screenHeight > 650 ? 0.9 : 0.7, 0],
  });

  const imageHeight = AnimatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  const marginTopForSvg = AnimatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, screenHeight > 650 ? -210 : -190],
    // outputRange: [0, screenHeight > 650 ? -210 : -190],
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
        setLoading(true);

        const user = await Auth.signIn(emailPhoneForLogin, passwordForLogin);
        console.log('----->user in signup', user);

        await getUserDetails({emailPhoneForLogin, passwordForLogin});
        const Authorization1 = user.signInUserSession.idToken.jwtToken;
        setLoading(false);

        navigation.navigate('App', {
          Authorization1,
        });
      } catch (error) {
        console.log('----->error in signup', error);
        setLoading(false);
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
          <View style={styles.incorrectContainer}>
            <Text style={styles.incorrectContainerText}>{incorrectPasswordError}</Text>
          </View>
        ) : null}

        <Button style={styles.renderLoginButton} text="Login" variant="primary" onPress={signIn} />
        <View style={styles.imageContainer}>
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
          setLoading(true);
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
            const body = {
              displayName: nameForSignUp,
              email: emailPhoneForSignUp,
              phone: phoneForSignUp,
            };

            const {data: result} = await createService('/mentee', body, {
              headers: {Authorization},
            });

            navigation.navigate('mail_verification', {
              emailPhoneForSignUp,
              passwordForSignUp,
              displayName: nameForSignUp,
              phone: phoneForSignUp,
            });
          }
          setLoading(false);
        } catch (error) {
          setLoading(false);
          if (error.message === 'User already exists') {
            navigation.navigate('mail_verification', {
              emailPhoneForSignUp,
              passwordForSignUp,
              displayName: nameForSignUp,
              phone: phoneForSignUp,
            });
          }
          // console.log('error signing up:', JSON.stringify(error));
          console.log('error error up:', error.message);
        }
      }
    };

    return (
      <>
        <Text style={styles.headerLabelTextSignUp}>Sign Up</Text>
        <InputBox placeHolder="Name" value={nameForSignUp} onChangeText={onNameChangeForSignUp} />
        <InputBox
          placeHolder="Phone No"
          style={styles.bottomText}
          value={phoneForSignUp}
          onChangeText={onPhoneChangeForSignUp}
        />
        <InputBox
          errorText={validationSignUp}
          placeHolder="Email Id"
          style={styles.bottomText}
          value={emailPhoneForSignUp}
          onChangeText={onEmailPhoneChangeForSignUp}
        />
        {console.log('----->emailPhoneForSignUp', emailPhoneForSignUp)}
        <InputBox
          secureTextEntry
          errorText={passwordForSignUpError}
          placeHolder="Password"
          style={styles.bottomText}
          value={passwordForSignUp}
          onChangeText={onPasswordChangeForSignUp}
        />
        <InputBox
          secureTextEntry
          errorText={confirmPasswordForSignUpError}
          placeHolder="Re-enter Password"
          style={styles.bottomText}
          value={confirmPasswordForSignUp}
          onChangeText={onConfirmPasswordChangeForSignUp}
        />
        <Button style={styles.signUpButton} text="Sign Up" variant="primary" onPress={signUp} />
        <View style={styles.imageContainer}>
          <TouchableOpacity>
            <Image source={require('../../assets/images/google.png')} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../../assets/images/FB.png')} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.loginContainer}>
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

  // console.log('----->loading', loading);

  // if (loading) {
  //   return <Loader />;
  // }

  return (
    <View style={styles.container}>
      <View style={styles.upperBody}>
        <Animated.View
          style={{
            transform: [{scale: scaleForSvg}],
            marginTop: marginTopForSvg,
            height: mode === 'landing' ? 300 : 600,
          }}>
          <SvgXml xml={SplashSvgXml} />
        </Animated.View>
      </View>
      <View style={styles.mainBody}>
        <Animated.View
          style={{opacity: appearOpacity, display: mode === 'landing' ? 'none' : 'flex'}}>
          <ScrollView>{mode === 'login' ? renderLogin() : renderSignUp()}</ScrollView>
        </Animated.View>
        {mode === 'landing' ? (
          <Animated.View
            style={{
              opacity: fadeOpacity,
            }}>
            <Button
              disabled={drawerHeight === finalBottomDrawerHeight}
              style={styles.finalBottomDrawer}
              text="Login"
              variant="primary"
              onPress={() => onButtonPress('login')}
            />
            <Button
              disabled={drawerHeight === finalBottomDrawerHeight}
              text="SignUp"
              onPress={() => onButtonPress('signUp')}
            />
          </Animated.View>
        ) : null}
      </View>
    </View>
  );
}

export default Login;
