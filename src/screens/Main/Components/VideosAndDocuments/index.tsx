import React, {useState} from 'react';

import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {List} from 'react-native-paper';
import {ShareIcon} from '../../../../assets/svg';
import {colors} from '../../../../config/colors';
import {getShadow} from '../../../../config/globalStyles';

const data = [1, 2, 3];
const listData = [1, 2, 3, 4, 5];

function DropDownSection() {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
}

function DropDownList(props: any) {
  return (
    <View style={styles.accordionContainer}>
      <List.Accordion
        title={
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              flex: 1,
              borderWidth: 1,
            }}>
            <Text>Accordion title</Text>
            <Text>Accordion title</Text>
          </View>
        }
        titleStyle={styles.text}>
        {data.map(item => {
          return <List.Item style={styles.title} title={() => DropDownSection()} />;
        })}
      </List.Accordion>
    </View>
  );
}

function DocumentsAndVideos() {
  return (
    <View style={styles.container}>
      {/* <Text>Credits:20/20</Text> */}
      {listData.map(item => {
        return <DropDownList />;
      })}
    </View>
  );
}

// function DocumentsAndVideos() {
//   const [show, setShow] = useState(false);

//   return (
//     <View>
//       <View
//         style={{
//           backgroundColor: 'grey',
//           padding: 10,
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//         }}>
//         <Text>hello</Text>
//         <TouchableOpacity onPress={() => setShow(!show)}>
//           <ShareIcon />
//         </TouchableOpacity>
//       </View>
//       {show ? (
//         <View>
//           <Text>hello</Text>
//         </View>
//       ) : null}
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    // borderWidth: 1,
    margin: 5,
  },
  accordionContainer: {
    paddingBottom: 0,
    backgroundColor: colors.white,
    ...getShadow(2),
    borderRadius: 3,
    margin: 5,
    flexGrow: 1,
  },

  title: {
    marginVertical: -10,
  },
  text: {
    fontSize: 12,
    flexGrow: 1,
    flex: 1,
    borderWidth: 1,
  },
});

export default DocumentsAndVideos;
