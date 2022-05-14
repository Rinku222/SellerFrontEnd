import * as React from 'react';
import {View, StyleSheet, Dimensions, StatusBar, Text, TextPropTypes} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';

// function FirstRoute() {
//   return <View style={[styles.scene, {backgroundColor: '#ff4081'}]} />;
// }

function FirstRoute() {
  return (
    <View>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
    </View>
  );
}

function SecondRoute() {
  return <View style={[styles.scene, {backgroundColor: '#673ab7'}]} />;
}

const initialLayout = {width: Dimensions.get('window').width};

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function TabViewExample() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
  ]);

  return (
    <TabView
      initialLayout={initialLayout}
      navigationState={{index, routes}}
      renderScene={renderScene}
      style={styles.container}
      onIndexChange={setIndex}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  },
  scene: {
    flex: 1,
  },
});
