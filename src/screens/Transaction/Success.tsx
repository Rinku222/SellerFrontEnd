import React, {useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import {useSelector} from 'react-redux';
import TransactionSuccess from '../../components/TransactionSuccess';

function Success(props) {
  const {navigation} = props;
  const {cart} = useSelector(s => s.home);

  return (
    <View style={{position: 'relative', flexGrow: 1}}>
      <TransactionSuccess />
      {/* <Text>Success</Text> */}
    </View>
  );
}

export default Success;
