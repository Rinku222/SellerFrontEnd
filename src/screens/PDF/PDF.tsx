import React from 'react';
import {StyleSheet, Dimensions, View, Text, TouchableOpacity} from 'react-native';
import Pdf from 'react-native-pdf';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export function PDFExample(props) {
  const {navigation, route} = props;

  const {url} = route.params;

  const source = {uri: url, cache: true};

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons color="black" name="arrow-back-ios" size={20} />
      </TouchableOpacity>
      <Pdf
        source={source}
        style={styles.pdf}
        trustAllCerts={false}
        onError={error => {
          console.log(error);
        }}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  backButton: {
    margin: 5,
    padding: 5,
    alignSelf: 'flex-start',
  },
});
