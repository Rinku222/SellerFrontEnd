import React from 'react';
import {View, StyleSheet, Text, Button, Image} from 'react-native';
import {TextInput} from 'react-native-paper';
// import {Image} from 'react-native-svg';
import {Formik} from 'formik';
import * as Yup from 'yup';
import TopHeader from '../../../components/TopHeader';
import Email from '../../../assets/images/Change_email.png';
import ThemeButton from '../../../components/ThemeButton/ThemeButton';

const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Required'),
});

const onSubmit = values => {
  console.log('----->values', values);
};

function ChangeEmail(props) {
  return (
    <View>
      <TopHeader title="Update Email Id" {...props} />
      <View style={styles.container}>
        <Image source={Email} style={{marginBottom: 20}} />
        <Text style={styles.text}>Enter Verification code you receive on hello@gmail.com</Text>
        <Formik initialValues={{email: ''}} validationSchema={schema} onSubmit={onSubmit}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View style={styles.formikContainer}>
              <TextInput
                placeholder="Your Email id"
                style={styles.textInput}
                value={values.email}
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')}
              />
              <View style={styles.button}>
                <ThemeButton title="Request OTP" onPress={handleSubmit} />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}

function EditEmail(props) {
  return (
    <View style={styles.mainContainer}>
      <ChangeEmail {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {padding: 10},
  container: {
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  button: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  textInput: {
    width: 200,
    padding: 0,
    height: 40,
  },
  formikContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
  },
  text: {
    alignItems: 'center',
  },
});

export default EditEmail;
