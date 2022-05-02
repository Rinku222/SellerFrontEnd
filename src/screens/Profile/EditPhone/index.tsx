import React from 'react';
import {View, StyleSheet, Text, Button, Image} from 'react-native';
import {TextInput} from 'react-native-paper';
// import {Image} from 'react-native-svg';
import {Formik} from 'formik';
import * as Yup from 'yup';
import TopHeader from '../../../components/TopHeader';
import Phone from '../../../assets/images/phone.png';
import ThemeButton from '../../../components/ThemeButton/ThemeButton';

const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Required'),
});

const onSubmit = values => {
  console.log('----->values', values);
};

function ChangePhone(props) {
  return (
    <View>
      <TopHeader title="Update Mobile Number" {...props} />
      <View style={styles.container}>
        <Image source={Phone} style={styles.image} />
        <Text style={styles.text}>
          Enter Verification code you receive on 1212121212 mobile number
        </Text>
        <Formik initialValues={{email: ''}} validationSchema={schema} onSubmit={onSubmit}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View style={styles.formikContainer}>
              <TextInput style={styles.textInput} value="India (+91)" />
              <TextInput
                placeholder="Your Mobile Number"
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

function EditPhone(props) {
  return (
    <View style={styles.mainContainer}>
      <ChangePhone {...props} />
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
    textAlign: 'center',
    marginBottom: 20,
  },
  formikContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
  },
  text: {
    alignItems: 'center',
  },
  image: {
    marginBottom: 20,
  },
});

export default EditPhone;
