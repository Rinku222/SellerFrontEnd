import React, {useState} from 'react';
import {TextInput, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../config/colors';
import {screenWidth} from '../../config/globalStyles';

function InputBox(props) {
  const {
    placeHolder = '',
    margin = 28,
    style = {},
    secureTextEntry = false,
    onChangeText = () => {},
    onSubmitEditing = () => {},
    value = '',
    errorText = '',
    keyboardType,
    showEye,
  } = props;

  const [password, setPassword] = useState(!showEye);

  return (
    <View style={[style, {marginBottom: 20}]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TextInput
          keyboardType={keyboardType || 'default'}
          placeholder={placeHolder}
          placeholderTextColor={colors.placeholderGray}
          secureTextEntry={password ? false : secureTextEntry}
          style={[styles.box, {width: screenWidth - margin * 2}, style]}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
        />
        {showEye ? (
          <TouchableOpacity style={styles.eye} onPress={() => setPassword(!password)}>
            <MaterialCommunityIcons name={password ? 'eye' : 'eye-off'} size={30} />
          </TouchableOpacity>
        ) : null}
      </View>

      {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    height: 50,
    paddingHorizontal: 18,
    alignItems: 'center',
    borderRadius: 8,
    borderColor: colors.themeGray,
    borderWidth: StyleSheet.hairlineWidth,
    fontSize: 16,
  },
  eye: {position: 'absolute', right: 5},
  errorText: {
    color: 'red',
    paddingHorizontal: 18,
    fontSize: 10,
    marginTop: 4,
  },
});

export default InputBox;
