import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import TabViewExample from '../TabView';

function RenderTab(props: any) {
  const {selectedTab} = props;

  switch (selectedTab) {
    case 1:
      return <Text>Terms updated</Text>;
    case 2:
      return <Text>FAQ</Text>;
    default:
      return <Text>hello</Text>;
  }
}

function TermsAndFAQ(props: any) {
  return <TabViewExample />;
}

const styles = StyleSheet.create({
  container: {padding: 10, flexGrow: 1, justifyContent: 'space-around'},
  tab: {
    marginTop: 20,
  },
  text: {
    borderBottomWidth: 2,
    flexGrow: 1,
    textAlign: 'center',
    paddingVertical: 5,
  },
  subContainer: {
    flexDirection: 'row',
  },
});

export default TermsAndFAQ;
