import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Animated,
  Easing,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {Auth} from 'aws-amplify';
import {Snackbar, TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {styles} from './styles';
import Button from '../../components/Button';
import SplashSvgXml from '../../assets/svg/SplashSvg';
import InputBox from '../../components/InputBox';
import {screenHeight} from '../../config/globalStyles';
import {colors} from '../../config/colors';
import {createService, Authorization} from '../../services/HttpService/HttpService';
import useUserActions from '../../redux/actions/userActions';
import {Loader} from '../../../App';
import Forgot from '../ForgotPassword';
import {downloadPdf} from '../../components/Download';

const ANIMATION_DURATION = 500;

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is Required'),
  password: Yup.string()
    .required('Password is Required')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, 'Password too weak'),
});

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
  const [visible, setVisible] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [snackbarError, setSnackbarError] = useState('');
  const [dummy, setDummy] = useState('');

  const [emailPhoneForLogin, setEmailPhoneForLogin] = useState('');
  const [passwordForLogin, setPasswordForLogin] = useState('');
  const [validationSignUp, setValidationSignUp] = useState<string | boolean>(false);
  const [phoneForSignUp, setPhoneForSignUp] = useState('');
  const [validationLogIn, setValidationLogIn] = useState<string | boolean>(false);

  const [forgotPasswordScreen, setForgotPasswordScreen] = useState(false);

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
  const onButtonPress = (type: string) => {
    setMode(type);
    animateHeight();
  };

  const onEmailPhoneChangeForLogin = (text: string) => {
    setEmailPhoneForLogin(text.toLocaleLowerCase());
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
    if (text !== ' ' && text.length <= 15) setNameForSignUp(text);
  };

  const onEmailPhoneChangeForSignUp = (text: string) => {
    if (text !== ' ') setEmailPhoneForSignUp(text.toLocaleLowerCase());
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
    async function signIn(data: {email: string; password: string}) {
      const {email, password} = data;
      // await downloadPdf('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf');
      try {
        setLoading(true);
        const user = await Auth.signIn(email, password);
        await getUserDetails({email, password});

        console.log('----->user', user.signInUserSession.idToken);
        const Authorization1 = user.signInUserSession.idToken.jwtToken;
        setLoading(false);

        if (!user.signInUserSession.idToken.payload.email_verified) {
          await Auth.resendSignUp(email);

          navigation.navigate('mail_verification', {
            emailPhoneForSignUp: email,
          });
        } else {
          navigation.navigate('App', {
            Authorization1,
          });
        }
      } catch (error) {
        setLoading(false);
        console.log('----->error', error);
        if (error.name === 'UserNotConfirmedException') {
          navigation.navigate('mail_verification', {
            emailPhoneForSignUp: email,
          });
        } else {
          setVisible(true);
          setSnackbarError(error.message);
        }
      }
    }

    return (
      <View>
        <>
          {forgotPasswordScreen ? (
            <View>
              <Forgot {...props} navigate="Login" />
            </View>
          ) : (
            <Formik
              initialValues={{email: '', password: ''}}
              validateOnBlur={false}
              validateOnChange={false}
              validationSchema={LoginSchema}
              onSubmit={values => {
                signIn({email: values.email, password: values.password});
              }}>
              {({values, errors, handleChange, handleSubmit}) => (
                <View>
                  <Snackbar
                    duration={4000}
                    style={{zIndex: 10, backgroundColor: colors.failure}}
                    visible={visible}
                    onDismiss={() => setVisible(false)}>
                    {snackbarError}
                  </Snackbar>
                  <Text style={styles.headerLabelText}>Login</Text>
                  <InputBox
                    errorText={errors.email}
                    name="email"
                    placeHolder="Email"
                    style={styles.renderLoginTextBox}
                    value={values.email}
                    onChangeText={handleChange('email')}
                  />
                  <InputBox
                    secureTextEntry
                    showEye
                    errorText={errors.password}
                    name="password"
                    placeHolder="Password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                  />
                  <TouchableOpacity
                    style={styles.forgotPasswordView}
                    onPress={() => setForgotPasswordScreen(true)}>
                    <Text style={styles.forgotPasswordText}> Forgot password?</Text>
                  </TouchableOpacity>
                  {incorrectPasswordError ? (
                    <View style={styles.incorrectContainer}>
                      <Text style={styles.incorrectContainerText}>{incorrectPasswordError}</Text>
                    </View>
                  ) : null}

                  <Button
                    style={styles.renderLoginButton}
                    text="Login"
                    variant="primary"
                    onPress={handleSubmit}
                  />
                </View>
              )}
            </Formik>
          )}

          {/* <View style={styles.imageContainer}>
            <TouchableOpacity>
              <Image source={require('../../assets/images/google.png')} style={styles.socialIcon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../../assets/images/FB.png')} style={styles.socialIcon} />
            </TouchableOpacity>
          </View> */}
          <View style={styles.signUp}>
            <Text>
              {"Don't have an account? "}
              <Text style={{color: colors.skyBlue}} onPress={() => setMode('signUp')}>
                Sign Up
              </Text>
            </Text>
          </View>
        </>
      </View>
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
            onButtonPress('login');
            setNameForSignUp('');
            setEmailPhoneForSignUp('');
            setPhoneForSignUp('');
            setConfirmPasswordForSignUpError('');
            setPasswordForSignUpError('');
          }
          setLoading(false);
        } catch (error) {
          console.log('----->error in signup', error);

          setLoading(false);
          if (error.message === 'User already exists') {
            setVisible(true);
            setSnackbarError('User already exist.');
          }
        }
      }
    };

    return (
      <View>
        <Snackbar
          duration={4000}
          style={{zIndex: 10, backgroundColor: colors.failure}}
          visible={visible}
          onDismiss={() => setVisible(false)}>
          {snackbarError}
        </Snackbar>

        <Text style={styles.headerLabelTextSignUp}>Sign Up</Text>
        <InputBox placeHolder="Name" value={nameForSignUp} onChangeText={onNameChangeForSignUp} />
        <InputBox
          placeHolder="Phone No"
          value={phoneForSignUp}
          onChangeText={onPhoneChangeForSignUp}
        />
        <InputBox
          errorText={validationSignUp}
          placeHolder="Email Id"
          value={emailPhoneForSignUp}
          onChangeText={onEmailPhoneChangeForSignUp}
        />
        <InputBox
          secureTextEntry
          showEye
          errorText={passwordForSignUpError}
          placeHolder="Password"
          value={passwordForSignUp}
          onChangeText={onPasswordChangeForSignUp}
        />
        <InputBox
          secureTextEntry
          showEye
          errorText={confirmPasswordForSignUpError}
          placeHolder="Re-enter Password"
          value={confirmPasswordForSignUp}
          onChangeText={onConfirmPasswordChangeForSignUp}
        />
        <Button style={styles.signUpButton} text="Sign Up" variant="primary" onPress={signUp} />
        {/* <View style={styles.imageContainer}>
          <TouchableOpacity>
            <Image source={require('../../assets/images/google.png')} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../../assets/images/FB.png')} style={styles.socialIcon} />
          </TouchableOpacity>
        </View> */}
        <View style={styles.loginContainer}>
          <Text>
            {'Already have an account? '}
            <Text style={{color: colors.skyBlue}} onPress={() => setMode('login')}>
              Login
            </Text>
          </Text>
        </View>        
      </View>
    );
  };

  if (loading) {
    return <Loader />;
  }

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
              onPress={async() => {
                await onButtonPress('login');
                onButtonPress('signUp');
              }}
            />
          </Animated.View>
        ) : null}
      </View>
    </View>
  );
}

export default Login;
