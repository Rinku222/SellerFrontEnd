import React, {useEffect} from 'react';
import {View} from 'react-native';

function Splash(props) {
  useEffect(() => {
    props.navigation.navigate('Login');
  }, []);

  return <View />;
}

export default Splash;
