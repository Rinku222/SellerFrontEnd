import React from 'react';
import {Text, View} from 'react-native';
import {Auth} from 'aws-amplify';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Button from '../../components/Button';
import InputBox from '../../components/InputBox';
import {styles} from '../Login/styles';

const EmailSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

function Forgot(props: any) {
  const {navigation,navigate} = props;

  const forgotPassword = (email: string) => {
    Auth.forgotPassword(email)
      .then(() => {
        navigation.navigate('new-password', {
          userName: email,
          navigate,
        });
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  return (
    <Formik
      initialValues={{email: ''}}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={EmailSchema}
      onSubmit={values => {
        forgotPassword(values.email);
      }}>
      {({values, errors, handleChange, handleSubmit}) => (
        <View>
          <Text style={styles.forgotPassword}>Enter Email Address</Text>

          <InputBox
            errorText={errors.email}
            name="email"
            placeHolder="Email"
            style={styles.bottomText}
            value={values.email}
            onChangeText={handleChange('email')}
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
  );
}

export default Forgot;
