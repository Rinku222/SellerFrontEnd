import React, {useEffect, useState, useRef, useMemo} from 'react';
import {View, Animated, Easing, Text, Image, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {styles} from './styles';
import Button from '../../components/Button';
import SplashSvgXml from '../../assets/svg/SplashSvg';
import InputBox from '../../components/InputBox';
import {screenHeight} from '../../config/globalStyles';
import {colors} from '../../config/colors';

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

  console.log('hh', screenHeight);

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

  const onEmailPhoneChangeForLogin = text => {
    setEmailPhoneForLogin(text);
  };
  const onPasswordChangeForLogin = text => {
    setPasswordForLogin(text);
  };

  const onEmailPhoneChangeForSignUp = text => {
    setEmailPhoneForSignUp(text);
  };
  const onPasswordChangeForSignUp = text => {
    setPasswordForSignUp(text);
  };
  const onConfirmPasswordChangeForSignUp = text => {
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

  const renderLogin = () => {
    return (
      <>
        <Text style={styles.headerLabelText}>Login</Text>
        <InputBox
          placeHolder="Email / Phone"
          style={{marginBottom: 26}}
          value={emailPhoneForLogin}
          onChangeText={onEmailPhoneChangeForLogin}
        />
        <InputBox
          secureTextEntry
          placeHolder="Password"
          style={{marginBottom: 26}}
          value={passwordForLogin}
          onChangeText={onPasswordChangeForLogin}
        />
        <Button
          disabled={drawerHeight !== finallBottomDrawerHeight}
          style={{marginBottom: 25, alignSelf: 'center'}}
          text="Login"
          variant="primary"
        />
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <TouchableOpacity>
            <Image source={require('../../assets/images/google.png')} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../../assets/images/FB.png')} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>
        <View style={{alignSelf: 'center', marginTop: 24}}>
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
          disabled={drawerHeight !== finallBottomDrawerHeight}
          style={{marginBottom: 20, alignSelf: 'center'}}
          text="Sign Up"
          variant="primary"
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
