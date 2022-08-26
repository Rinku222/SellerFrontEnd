import React, {useEffect} from 'react';
import {View} from 'react-native';

function Splash(props) {
  useEffect(() => {
    console.log('----->inside useeffect of splash');
    props.navigation.navigate('Login');
  }, []);

  return <View />;
}

export default Splash;
