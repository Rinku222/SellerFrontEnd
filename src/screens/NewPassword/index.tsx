import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Auth} from 'aws-amplify';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Snackbar} from 'react-native-paper';
import Button from '../../components/Button';
import InputBox from '../../components/InputBox';
import {styles} from '../Login/styles';
import {colors} from '../../config/colors';

const EmailSchema = Yup.object().shape({
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

function NewPassword(props) {
  const {route, navigation} = props;
  const {userName} = route.params;

  const [snackbarError, setSnackbarError] = useState('');
  const [visible, setVisible] = useState(false);

  const forgotPassword = (otp: string, newPassword: string) => {
    Auth.forgotPasswordSubmit(userName, otp, newPassword)
      .then(value => {
        navigation.navigate('Login');
      })
      .catch(error => {
        if (error.name === 'CodeMismatchException') {
          setSnackbarError('Invalid Code');
          setVisible(true);
        } else {
          setSnackbarError('Attempt limit exceeded, please try after some time');
          setVisible(true);
        }
      });
  };

  return (
    <View style={{flexGrow: 1}}>
      <Formik
        initialValues={{otp: '', password: '', confirmPassword: ''}}
        validationSchema={EmailSchema}
        onSubmit={values => {
          forgotPassword(values.otp, values.password);
        }}>
        {({values, errors, handleChange, handleSubmit, touched}) => (
          <View style={{marginHorizontal: 20}}>
            <Text style={styles.newPasswordText}>New Password</Text>

            <InputBox
              errorText={errors.otp}
              keyboardType="numeric"
              name="otp"
              placeHolder="Enter OTP"
              style={styles.bottomText}
              value={values.otp}
              onChangeText={handleChange('otp')}
            />
            <InputBox
              showEye
              errorText={errors.password}
              name="password"
              placeHolder="Enter New Password"
              style={styles.bottomText}
              value={values.password}
              onChangeText={handleChange('password')}
            />
            <InputBox
              showEye
              errorText={errors.confirmPassword}
              name="confirmPassword"
              placeHolder="Re-Enter New Password"
              style={styles.bottomText}
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
            />

            <Button
              style={{marginBottom: 20, alignSelf: 'center', marginTop: 22}}
              text="Send"
              variant="primary"
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
      <Snackbar
        duration={4000}
        style={{backgroundColor: colors.failure, marginBottom: 20}}
        visible={visible}
        onDismiss={() => setVisible(false)}>
        {snackbarError}
      </Snackbar>
    </View>
  );
}

export default NewPassword;
