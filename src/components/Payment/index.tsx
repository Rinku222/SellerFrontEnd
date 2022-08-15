import RazorpayCheckout, {CheckoutOptions} from 'react-native-razorpay';
import {colors} from '../../config/colors';
import usePaymentServices from '../../services/Payment';

async function payment(navigation: any, total: number, courseList, addPayment) {
  console.log('----->button pressed');

  // >err {"code": 0, "description": "{\"error\":{\"code\":\"BAD_REQUEST_ERROR\",\"description\":\"Payment processing cancelled by user\",\"source\":\"customer\",\"step\":\"payment_authentication\",\"reason\":\"payment_cancelled\"}}", "error": {"code": "BAD_REQUEST_ERROR", "description": "Payment processing cancelled by user", "reason": "payment_cancelled", "source": "customer", "step": "payment_authentication"}}

  const amount = total * 100;
  const options: CheckoutOptions = {
    description: 'Credits towards consultation',
    image: 'https://i.imgur.com/3g7nmJC.png',
    currency: 'INR',
    // order_id: 'test-1',
    key: 'rzp_test_rgvN2VyBKgX6DT', // Your api key
    amount,
    name: 'Medical Learning',
    // prefill: {
    //   email: 'void@razorpay.com',
    //   contact: '9191919191',
    //   name: 'Razorpay Software',
    // },
    theme: {color: colors.primary},
    retry: {enabled: true, max_count: 1},
  };
  const result = await RazorpayCheckout.open(
    options,
    data => {
      const {razorpay_payment_id} = data;
      addPayment({courseList, razorPaymentId: razorpay_payment_id, paymentStatus: 'success'});
      navigation.navigate('Transaction_Success', {
        id: razorpay_payment_id,
      });
    },
    err => {
      console.log('----->err', err);

      if (err.error.metadata) {
        addPayment({
          courseList,
          razorPaymentId: err.error.metadata.payment_id,
          paymentStatus: 'failed',
        });
      }
      navigation.navigate('Transaction_Failed', {total});
    },
  );
}

export default payment;
