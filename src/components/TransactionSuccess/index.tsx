import React, {useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {Button} from 'react-native-paper';
import success from '../../assets/images/success.png';
import {colors} from '../../config/colors';
import {fontSizes} from '../../config/globalStyles';

function TransactionSuccess(props) {
  const {navigation, route} = props;
  const {params} = route;
  const {id} = params;
  const {cart} = useSelector(s => s.home);

  return (
    <View style={{alignItems: 'center', justifyContent: 'space-around', flexGrow: 1}}>
      <View style={{alignItems: 'center'}}>
        <View>
          <Image source={success} style={{width: 300, height: 220}} />
        </View>
        <Text style={{color: '#4C9569', fontSize: 24, fontWeight: 'bold', marginVertical: 10}}>
          Transaction Successful
        </Text>
        <Text style={{color: colors.black, marginVertical: 5, fontWeight: 'bold'}}>
          Transaction Id: {id}
        </Text>
        <Text style={{color: colors.black, marginVertical: 5, fontWeight: 'bold'}}>
          Thanks for your purchase
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
          onPress={() => navigation.navigate('App')}>
          Go to Home
        </Button>
      </View>
    </View>
  );
}

export default TransactionSuccess;
