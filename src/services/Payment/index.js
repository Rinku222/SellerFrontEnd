import {createService, readService, deleteService} from '../HttpService/HttpService';

export default function usePaymentServices() {
  return {
    addPayment: data => {
      const {courseList, razorPaymentId, paymentStatus} = data;
      return createService(`/payment`, {courseList, razorPaymentId, paymentStatus});
    },
  };
}
