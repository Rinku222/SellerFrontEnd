import {View, Text} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import {useSelector} from 'react-redux';
import {colors} from '../../config/colors';

function Payment(navigation: any, total: number) {
  console.log('----->button pressed');

  // const {cart} = useSelector(s => s.home);

  // const discount = 0;

  // const subTotal = cart.reduce((sum: number, currentValue) => (sum += currentValue.amount), 0);

  // const total = subTotal - discount;

  console.log('----->total', total);
  const options = {
    description: 'Credits towards consultation',
    image: 'https://i.imgur.com/3g7nmJC.png',
    currency: 'INR',
    key: 'rzp_test_rgvN2VyBKgX6DT', // Your api key
    amount: total * 100,
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
      // handle success
      console.log('----->handle success');
    })
    .catch(error => {
      // handle failure
      // alert(`Error: ${error.code} | ${error.description}`);
      console.log('----->handle failure');
    });
}

export default Payment;
