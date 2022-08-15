import React, {useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {Button} from 'react-native-paper';
import Failure from '../../assets/images/Payment_Failure.png';
import {colors} from '../../config/colors';
import {fontSizes} from '../../config/globalStyles';
import Price from '../Price';

function TransactionFailure(props) {
  const {navigation, route} = props;
  const {cart} = useSelector(s => s.home);

  const discount = 0;

  const subTotal = cart.reduce((sum: number, currentValue) => (sum += currentValue.amount), 0);

  const total = subTotal - discount;

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'space-around',
        flexGrow: 1,
        marginHorizontal: 40,
      }}>
      <View style={{alignItems: 'center'}}>
        <View>
          <Image source={Failure} style={{width: 300, height: 220}} />
        </View>
        <Text style={{color: colors.failure, fontSize: 24, fontWeight: 'bold', marginVertical: 20}}>
          Transaction Failed
        </Text>
        <Text style={{color: colors.black, marginVertical: 5, fontWeight: 'bold'}}>
          Order Amount : {Price(total)}
        </Text>
        <Text style={{color: colors.black, marginVertical: 5, fontWeight: 'bold'}}>
          Payment Failed, Please Try Again.
        </Text>
        <Text
          style={{
            marginVertical: 5,
            fontWeight: 'bold',
            fontSize: 12,
            textAlign: 'center',
          }}>
          If amount is debited same will be credited in 7 to 8 working days.
        </Text>
      </View>
      <View>
        <Button
          color={colors.primary}
          labelStyle={{color: colors.white}}
          mode="contained"
          style={{
            paddingVertical: 5,
            borderRadius: 8,
          }}
          onPress={() => navigation.navigate('Step1')}>
          Try Again
        </Button>
      </View>
    </View>
  );
}

export default TransactionFailure;
