import React, {useRef, useEffect, useState, useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {Button} from 'react-native-paper';
import {BlueTickIcon} from '../../../assets/svg';
import TopHeader from '../../../components/TopHeader';
import {colors} from '../../../config/colors';
import {getShadow} from '../../../utils';
import payment from '../../../components/Payment';
import Price from '../../../components/Price';
import homeActions from '../../../redux/actions/homeActions';

import usePaymentServices from '../../../services/Payment';

function OrderSummary(props) {
  const {cart, subTotal, discount, total} = props;

  const bottomData = [
    {name: 'Subtotal', value: subTotal},
    {name: 'Discount', value: discount},
    {name: 'Total', value: total},
  ];

  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 20,
        marginTop: 10,
        borderColor: colors.tableBorder,
        marginBottom: 30,
      }}>
      <View style={{borderBottomWidth: 1, padding: 10, borderColor: colors.tableBorder}}>
        <Text style={{fontWeight: 'bold', color: colors.black}}>ORDER SUMMARY</Text>
      </View>
      <View style={{padding: 10, borderBottomWidth: 1, borderColor: colors.tableBorder}}>
        <View style={{justifyContent: 'space-between', flexDirection: 'row', marginBottom: 10}}>
          <Text style={{color: colors.black, fontWeight: 'bold'}}>Course</Text>
          <Text
            style={{color: colors.black, width: '20%', alignItems: 'center', fontWeight: 'bold'}}>
            Price
          </Text>
        </View>
        {cart.map((item, index) => {
          return (
            <View
              key={index}
              style={{justifyContent: 'space-between', flexDirection: 'row', marginBottom: 5}}>
              <Text numberOfLines={1} style={{flex: 1}}>
                {item.courseTitle}
              </Text>
              <Text style={{width: '20%', alignItems: 'center'}}>{Price(item.amount)}</Text>
            </View>
          );
        })}
      </View>
      <View style={{padding: 10}}>
        {bottomData.map((item, index) => {
          return (
            <View key={index}>
              {item.value ? (
                <View
                  style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
                  <Text style={{fontWeight: 'bold', color: colors.black}}>{item.name}</Text>
                  <Text
                    style={{
                      width: '20%',
                      alignItems: 'center',
                      fontWeight: 'bold',
                      color: colors.black,
                    }}>
                    {Price(item.value)}
                  </Text>
                </View>
              ) : null}
            </View>
          );
        })}
      </View>
    </View>
  );
}

function Step2(props) {
  const {navigation} = props;
  const {cart} = useSelector(s => s.home);

  const {addPayment} = usePaymentServices();
  const {getAllSubscribedCourses, getCart} = homeActions();

  const discount = 0;

  const subTotal = cart.reduce((sum: number, currentValue) => (sum += currentValue.amount), 0);

  const total = subTotal - discount;

  const courseList = cart.map(data => data.courseId);

  return (
    <View style={{position: 'relative', flex: 1}}>
      <TopHeader {...props} />

      <View style={styles.cardMainContainer}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: colors.black,
            margin: 5,
          }}>
          Checkout
        </Text>
        <OrderSummary cart={cart} discount={discount} subTotal={subTotal} total={total} />
      </View>
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
        onPress={() =>
          payment(navigation, total, courseList, addPayment, getAllSubscribedCourses, getCart)
        }>
        Continue to pay {Price(total)}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  cardMainContainer: {
    padding: 12,
    backgroundColor: colors.white,
    margin: 5,
    borderRadius: 12,
    marginHorizontal: 15,
    ...getShadow(10),
  },
});

export default Step2;
