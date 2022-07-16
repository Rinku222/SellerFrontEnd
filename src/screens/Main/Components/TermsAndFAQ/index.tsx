import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {useSelector} from 'react-redux';
import useMainServices from '../../../../services/Main';
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
  const {courseId} = props;

  const {FAQ} = useSelector(s => s.main);

  return <TabViewExample FAQ={FAQ} {...props} />;
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
