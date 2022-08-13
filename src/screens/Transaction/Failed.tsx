import React, {useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import {useSelector} from 'react-redux';

function Failed(props) {
  const {navigation} = props;
  const {cart} = useSelector(s => s.home);

  return (
    <View style={{position: 'relative', flexGrow: 1}}>
      <Text>Failed</Text>
    </View>
  );
}

export default Failed;
