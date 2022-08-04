import React, {useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import {Button} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {DeleteIcon} from '../../../assets/svg';
import EmptyCartIcon from '../../../assets/images/emptyCart.png';
import CartCourseCard from '../../../components/CartCourseCard';
import TopHeader from '../../../components/TopHeader';
import {colors} from '../../../config/colors';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13];

function Cart(props) {
  const {data} = props;

  return (
    <ScrollView style={{marginBottom: 50}}>
      {data.map((item, index: number) => {
        return (
          <View key={index} style={{marginBottom: 10, marginHorizontal: 5}}>
            <CartCourseCard course={item} />
          </View>
        );
      })}
    </ScrollView>
  );
}

function EmptyCart() {
  return (
    <View style={{flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image source={EmptyCartIcon} style={{width: 60, height: 54, marginBottom: 20}} />
      <Text
        style={{textAlign: 'center', fontWeight: 'bold', color: colors.primary, marginBottom: 10}}>
        Your Cart is Empty!
      </Text>
      <Text style={{textAlign: 'center', marginHorizontal: 70}}>
        Looks like you haven’t added any courses to your cart yet
      </Text>
    </View>
  );
}

function Step1(props) {
  const {navigation} = props;
  const {cart} = useSelector(s => s.home);

  return (
    <View style={{position: 'relative', flexGrow: 1}}>
      <TopHeader {...props} />
      {cart.length ? <Cart data={cart} /> : <EmptyCart />}
      {cart.length ? (
        <Button
          color={colors.primary}
          labelStyle={{color: colors.white}}
          mode="contained"
          style={{
            position: 'absolute',
            bottom: 70,
            right: 40,
            left: 40,
            zIndex: 5,
            paddingVertical: 5,
            borderRadius: 8,
          }}
          onPress={() => navigation.navigate('Step2')}>
          Proceed to buy
        </Button>
      ) : null}
    </View>
  );
}

export default Step1;
