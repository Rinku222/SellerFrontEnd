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
  const [selectedTab, setSelectedTab] = useState(1);

  return (
    <TabViewExample />
    // <View style={styles.container}>
    //   <View style={styles.subContainer}>
    //     {TABS.map(item => {
    //       return (
    //         <TouchableOpacity style={{flexGrow: 1}} onPress={() => setSelectedTab(item.id)}>
    //           <Text
    //             style={[
    //               styles.text,
    //               {
    //                 borderBottomColor: selectedTab === item.id ? colors.themeYellow : colors.white,
    //               },
    //             ]}>
    //             {item.name}
    //           </Text>
    //         </TouchableOpacity>
    //       );
    //     })}
    //   </View>
    //   <View style={styles.tab}>
    //     <RenderTab selectedTab={selectedTab} />
    //   </View>
    // </View>
  );
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
