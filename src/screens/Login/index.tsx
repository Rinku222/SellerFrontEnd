import React, { useEffect, useState, useRef, useMemo } from 'react';
import { View, Animated, Easing, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Auth } from 'aws-amplify';
import { styles } from './styles';
import Button from '../../components/Button';
import SplashSvgXml from '../../assets/svg/SplashSvg';
import InputBox from '../../components/InputBox';
import { screenHeight } from '../../config/globalStyles';
import { colors } from '../../config/colors';
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
  const [otp, setOtp] = useState({ 1: '', 2: '', 3: '', 4: '', 5: '', 6: '' })
  const {navigation} = props

  const inputOne = useRef()
  const inputTwo = useRef()
  const inputThree = useRef()
  const inputFour = useRef()
  const inputFive = useRef()
  const inputSix = useRef()




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
      <Animated.View style={{ transform: [{ scale: scaleForSvg }], marginTop: margiTopForSvg }}>
        <SvgXml xml={SplashSvgXml} />
      </Animated.View>
    );
  }

  const memoizedSplash = useMemo(() => SplashSvg, []);

  const onEmailPhoneChangeForLogin = (text: string) => {
    setEmailPhoneForLogin(text);
  };
  const onPasswordChangeForLogin = (text: string) => {
    setPasswordForLogin(text);
  };

  const onEmailPhoneChangeForSignUp = (text: string) => {
    setEmailPhoneForSignUp(text);
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

  const renderVerification =  () => {
    const code = Object.values(otp).toString()
    console.log("Code is",code.replace(/,/g,""))

    async function confirmSignUp() {
      try {
        const user = await Auth.confirmSignUp("deepak@amci.net.in",code.replace(/,/g,""));
        console.log("confirm Sign Up", JSON.stringify(user))
      } catch (error) {
          console.log('error confirming sign up', error);
      }
  }

    return (<View style={{ marginTop: 50, flex: 1 }}>
          <TopHeader title="Email verification" />
          <View style={styles.verifyContainer}>
            <Image source={Email} />
            <Text numberOfLines={5} style={{ width: 265, height: 100, top: 15, fontSize: 18, textAlign: 'center' }}>
              Enter the verification code you received on ri*@lip**.com on this mail id
            </Text>
            <View style={{ width: 300, marginHorizontal: 20, marginBottom: 20, justifyContent: "space-between", flexDirection: 'row', paddingRight: 2 }}>
              <View style={{ borderRadius: 5, borderColor: 'grey', borderWidth: 0.5 }}>
                <TextInput keyboardType='number-pad' maxLength={1}
                  ref={inputOne}
                  style={{ fontSize: 20, color: 'black', padding: 0, textAlign: "center", paddingHorizontal: 15, paddingVertical: 10 }}
                  onChangeText={(text) => {
                    setOtp({ ...otp, 1: text })
                    text && inputTwo.current.focus()
                  }} />
              </View>
              <View style={{ borderRadius: 5, borderColor: 'grey', borderWidth: 0.5 }}>
                <TextInput keyboardType='number-pad'
                  maxLength={1}
                  ref={inputTwo}
                  style={{ fontSize: 20, color: 'black', padding: 0, textAlign: "center", paddingHorizontal: 15, paddingVertical: 10 }}
                  onChangeText={(text) => {
                    setOtp({ ...otp, 2: text })
                    text ? inputThree.current.focus() : inputOne.current.focus()
                  }} />
              </View>
              <View style={{ borderRadius: 5, borderColor: 'grey', borderWidth: 0.5 }}>
                <TextInput keyboardType='number-pad'
                  maxLength={1}
                  ref={inputThree}
                  style={{ fontSize: 20, color: 'black', padding: 0, textAlign: "center", paddingHorizontal: 15, paddingVertical: 10 }}
                  onChangeText={(text) => {
                    setOtp({ ...otp, 3: text })
                    text ? inputFour.current.focus() : inputTwo.current.focus()
                  }} />
              </View>
              <View style={{ borderRadius: 5, borderColor: 'grey', borderWidth: 0.5 }}>
                <TextInput keyboardType='number-pad'
                  maxLength={1}
                  ref={inputFour}
                  style={{ fontSize: 20, color: 'black', padding: 0, textAlign: "center", paddingHorizontal: 15, paddingVertical: 10 }}
                  onChangeText={(text) => {
                    setOtp({ ...otp, 4: text })
                    text ? inputFive.current.focus() : inputThree.current.focus()
                  }} />
              </View>
              <View style={{ borderRadius: 5, borderColor: 'grey', borderWidth: 0.5 }}>
                <TextInput keyboardType='number-pad'
                  maxLength={1}
                  ref={inputFive}
                  style={{ fontSize: 20, color: 'black', padding: 0, textAlign: "center", paddingHorizontal: 15, paddingVertical: 10 }}
                  onChangeText={(text) => {
                    setOtp({ ...otp, 5: text })
                    text ? inputSix.current.focus() : inputFour.current.focus()
                  }} />
              </View>
              <View style={{ borderRadius: 5, borderColor: 'grey', borderWidth: 0.5 }}>
                <TextInput keyboardType='number-pad'
                  maxLength={1}
                  ref={inputSix}
                  style={{ fontSize: 20, color: 'black', padding: 0, textAlign: "center", paddingHorizontal: 15, paddingVertical: 10 }}
                  onChangeText={(text) => {
                    setOtp({ ...otp, 6: text })
                    text ? inputSix.current.focus() : inputFive.current.focus()
                  }} />
              </View>
            </View>
            <Button
              style={{ marginTop: 20, alignSelf: 'center', backgroundColor: 'red' }}
              text="Verify"
              variant="primary"
              onPress={confirmSignUp}
            />
          </View>
        </View>
    )
  }

  const renderLogin = () => {

    async function signIn() {
      try {
        const user = await Auth.signIn("deepak@amci.net.in", "Deepak@1234");
        console.log("Login success response", JSON.stringify(user))
      } catch (error) {
        console.log('error signing in', JSON.stringify(error));
      }
    }

    return (
      <>
        <Text style={styles.headerLabelText}>Login</Text>
        <InputBox
          placeHolder="Email / Phone"
          style={{ marginBottom: 26 }}
          value={emailPhoneForLogin}
          onChangeText={onEmailPhoneChangeForLogin}
        />
        <InputBox
          secureTextEntry
          placeHolder="Password"
          style={{ marginBottom: 26 }}
          value={passwordForLogin}
          onChangeText={onPasswordChangeForLogin}
        />
        <Button
          // disabled={drawerHeight !== finallBottomDrawerHeight}
          style={{ marginBottom: 25, alignSelf: 'center' }}
          text="Login"
          variant="primary"
          onPress={signIn}
        />
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <TouchableOpacity>
            <Image source={require('../../assets/images/google.png')} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../../assets/images/FB.png')} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>
        <View style={{ alignSelf: 'center', marginTop: 24 }}>
          <Text>
            {"Don't have an account? "}
            <Text style={{ color: colors.skyBlue }} onPress={() => setMode('signUp')}>
              Sign Up
            </Text>
          </Text>
        </View>
      </>
    );
  };


  const renderSignUp = () => {


    const signUp = async () => {
      try {
        // console.log("Sign up clicked")
        // const { user } = await Auth.signUp({
        //   username: "deepak@amci.net.in",
        //   password: "Deepak@1234",
        //   attributes: {
        //     email: "deepak@amci.net.in",          // optional
        //     phone_number: "+918105818297",   // optional - E.164 number convention
        //     // other custom attributes 
        //   }
        // });
        // if(user){
          navigation.navigate('mail_verification',{
            itemId: 86,
            otherParam: 'anything you want here',
          })
        // }
        // console.log("Success sign up response", JSON.stringify(user));
      } catch (error) {
        console.log('error signing up:', JSON.stringify(error));
      }
    }
    return (
      <>

        <Text style={styles.headerLabelTextSignUp}>Sign Up</Text>
        <InputBox
          placeHolder="Email / Phone"
          style={{marginBottom: 22}}
          value={emailPhoneForSignUp}
          onChangeText={onEmailPhoneChangeForSignUp}
        />
        <InputBox
          secureTextEntry
          placeHolder="Password"
          style={{marginBottom: 22}}
          value={passwordForSignUp}
          onChangeText={onPasswordChangeForSignUp}
        />
        <InputBox
          secureTextEntry
          errorText={confirmPasswordForSignUpError}
          placeHolder="Reenter Password"
          style={{marginBottom: 22}}
          value={confirmPasswordForSignUp}
          onChangeText={onConfirmPasswordChangeForSignUp}
        />
        <Button
          // disabled={drawerHeight !== finallBottomDrawerHeight}
          style={{marginBottom: 20, alignSelf: 'center'}}
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
      <Animated.View style={[styles.mainBody, { height: heightForBottom }]}>
        <Animated.View style={[styles.headerLabel, { opacity: appearOpacity }]}>
          {mode === 'signUp' ? renderSignUp() : renderLogin()}
        </Animated.View>


        {mode === 'landing' ? (
          <Animated.View style={{ opacity: fadeOpacity }}>
            <Button
              disabled={drawerHeight === finallBottomDrawerHeight}
              style={{ marginBottom: 25 }}
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
