import React from 'react';
import {StyleSheet, Dimensions, View, Text, TouchableOpacity} from 'react-native';
import Pdf from 'react-native-pdf';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {downloadPdf} from '../../components/Download';
import {colors} from '../../config/colors';

export function PDFExample(props: {navigation: any; route: any}) {
  const {navigation, route} = props;

  const {url} = route.params;

  const source = {uri: url, cache: true};

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons color="black" name="arrow-back-ios" size={20} />
      </TouchableOpacity>
      <View style={styles.pdfContainer}>
        <Pdf
          source={source}
          style={styles.pdf}
          trustAllCerts={false}
          onError={error => {
            console.log(error);
          }}
          onLoadComplete={numberOfPages => {
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
      <TouchableOpacity style={styles.downloadButton} onPress={() => downloadPdf(url)}>
        <Text style={{color: colors.white}}>Download</Text>
        <Feather color={colors.white} name="download" size={20} style={styles.downloadIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  pdf: {
    flex: 1,
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
  },
  pdfContainer: {
    flexGrow: 1,
    padding: 10,
  },
  backButton: {
    margin: 5,
    padding: 5,
  },
  downloadButton: {
    position: 'absolute',
    bottom: 20,
    right: 15,
    left: 15,
    backgroundColor: colors.themeYellow,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadIcon: {
    marginLeft: 10,
  },
});
