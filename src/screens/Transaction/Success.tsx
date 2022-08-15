import React, {useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import {useSelector} from 'react-redux';
import TransactionSuccess from '../../components/TransactionSuccess';

function Success(props) {
  return (
    <View style={{position: 'relative', flexGrow: 1}}>
      <TransactionSuccess {...props} />
    </View>
  );
}

export default Success;
