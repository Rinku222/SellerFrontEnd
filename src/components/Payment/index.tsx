import {View, Text} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import {useSelector} from 'react-redux';
import {colors} from '../../config/colors';

function Payment(navigation: any, total: number) {
  console.log('----->button pressed');

  console.log('----->total', total);
  const amount = total * 100;
  console.log('----->amount', amount);
  const options = {
    description: 'Credits towards consultation',
    image: 'https://i.imgur.com/3g7nmJC.png',
    currency: 'INR',
    key: 'rzp_test_rgvN2VyBKgX6DT', // Your api key
    amount,
    name: 'Medical Learning',
    // prefill: {
    //   email: 'void@razorpay.com',
    //   contact: '9191919191',
    //   name: 'Razorpay Software',
    // },
    theme: {color: colors.primary},
  };
  RazorpayCheckout.open(options)
    .then(data => {
      console.log('----->data', data);
      navigation.navigate('Transaction_Success');
    })
    .catch(error => {
      console.log('----->error', error);
      navigation.navigate('Transaction_Failed');
    });
}

export default Payment;
