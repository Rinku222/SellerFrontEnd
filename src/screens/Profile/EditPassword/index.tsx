import React, {useState} from 'react';
import {View, StyleSheet, Text, Button, Image} from 'react-native';
import {TextInput} from 'react-native-paper';
// import {Image} from 'react-native-svg';
import {Formik} from 'formik';
import * as Yup from 'yup';
import TopHeader from '../../../components/TopHeader';
// import Email from '../../../assets/images/Change_email.png';
import Password from '../../../assets/images/password.png';
import ThemeButton from '../../../components/ThemeButton/ThemeButton';

const schema = Yup.object().shape({
  //   email: Yup.string().email('Invalid email format').required('Required'),
});

const onSubmit = values => {
  console.log('----->values in submit form', values);
};

function ChangePassword(props) {
  const [newPassword, setNewPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState(true);

  return (
    <View>
      <TopHeader title="Update Password" {...props} />
      <View style={styles.container}>
        <Image source={Password} style={{marginBottom: 20}} />
        <Text style={styles.text}>
          New password must be different from previously used password
        </Text>
        <Formik initialValues={{}} validationSchema={schema} onSubmit={onSubmit}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View style={styles.formikContainer}>
              {console.log('----->values', values)}
              <TextInput
                mode="outlined"
                placeholder="Current Password"
                style={styles.textInput}
                value={values.email}
                onBlur={handleBlur('current')}
                onChangeText={handleChange('current')}
              />
              <TextInput
                mode="outlined"
                placeholder="New Password"
                right={
                  <TextInput.Icon
                    name="eye"
                    size={25}
                    onPress={() => setNewPassword(!newPassword)}
                  />
                }
                secureTextEntry={newPassword}
                style={styles.textInput}
                value={values.new}
                onBlur={handleBlur('email')}
                onChangeText={handleChange('new')}
              />
              <TextInput
                mode="outlined"
                placeholder="Confirm Password"
                right={
                  <TextInput.Icon
                    name="eye"
                    size={25}
                    onPress={() => setConfirmPassword(!confirmPassword)}
                  />
                }
                secureTextEntry={confirmPassword}
                style={styles.textInput}
                value={values.confirm}
                onBlur={handleBlur('email')}
                onChangeText={handleChange('confirm')}
              />
              <View style={styles.button}>
                <ThemeButton title="Change Password" onPress={handleSubmit} />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}

function EditPassword(props) {
  return (
    <View style={styles.mainContainer}>
      <ChangePassword {...props} />
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
    width: 250,
    padding: 0,
    height: 40,
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
});

export default EditPassword;
