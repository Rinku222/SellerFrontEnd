/**
 * Copyright (c) 2017-present, Wonday (@wonday.org)
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {StyleSheet, Dimensions, View, Text, TouchableOpacity} from 'react-native';
import Pdf from 'react-native-pdf';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export function PDFExample(props) {
  const {navigation} = props;
  const source = {uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true};

  //   const source = require('./test.pdf');  // ios only
  //   const source = {uri:'bundle-assets://test.pdf' };
  //   const source = {uri:'file:///sdcard/test.pdf'};
  //   const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};
  //   const source = {uri:"content://com.example.blobs/xxxxxxxx-...?offset=0&size=xxx"};
  //   const source = {uri:"blob:xxxxxxxx-...?offset=0&size=xxx"};

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
