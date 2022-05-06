import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function TopHeader(props) {
  const {navigation, title, color = 'black', icon} = props;

  return (
    <View>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons color={color} name="arrow-back-ios" size={20} />
      </TouchableOpacity>
      <View style={styles.heading}>
        <View style={styles.icon}>{icon}</View>
        <Text style={{color}}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
  heading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 10,
    flexDirection: 'row',
  },
  icon: {
    marginRight: 10,
  },
});

export default TopHeader;
