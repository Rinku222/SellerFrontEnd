import * as React from 'react';
import {View, StyleSheet, Dimensions, StatusBar, Text, TextPropTypes} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {colors} from '../../../../config/colors';
import Layout from '../../../../utils/Layout';

function FirstRoute() {
  return (
    <View style={styles.container}>
      <Text>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex cupiditate in modi magnam
        magni, nobis aspernatur ipsum, esse deserunt porro totam culpa architecto nostrum. Voluptas
        deleniti est facilis iusto possimus et, quisquam harum illum.
      </Text>
    </View>
  );
}

function SecondRoute() {
  return (
    <View style={styles.container}>
      <Text>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium voluptates repellat
        libero cum eligendi nam recusandae architecto voluptate repudiandae officiis corrupti
        corporis doloremque accusamus nemo illum mollitia voluptas quia, minima voluptatibus
        asperiores. Ab enim, officia eius officiis temporibus, quod neque doloremque tempora
        excepturi velit veniam, sit numquam? Inventore, nihil velit?
      </Text>
    </View>
  );
}

const initialLayout = {width: Dimensions.get('window').width};

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function TabViewExample() {
  const [selectedTab, setSelectedTab] = React.useState(4);

  const [routes] = React.useState([
    {key: 'first', title: 'Terms'},
    {key: 'second', title: 'FAQ'},
  ]);

  return (
    <View style={styles.tabContainer}>
      <TabView
        initialLayout={{width: Layout.window.width}}
        navigationState={{index: selectedTab, routes}}
        renderScene={renderScene}
        renderTabBar={tabBarProps => {
          return (
            <TabBar
              {...tabBarProps}
              activeColor={colors.primary}
              inactiveColor={colors.black}
              indicatorStyle={{backgroundColor: 'blue'}}
              style={{backgroundColor: '#F5F5F5', marginHorizontal: 5}}
            />
          );
        }}
        onIndexChange={setSelectedTab}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  tabContainer: {
    flexGrow: 1,
    marginTop: 15,
  },
});
