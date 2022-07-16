import * as React from 'react';
import {View, StyleSheet, Dimensions, StatusBar, Text, TextPropTypes} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useSelector} from 'react-redux';
import {colors} from '../../../../config/colors';
import Layout from '../../../../utils/Layout';

function FirstRoute(props) {
  const {terms} = props;

  return (
    <View style={styles.container}>
      <Text>{terms}</Text>
    </View>
  );
}

function SecondRoute() {
  const {FAQ} = useSelector(s => s.main);
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

const renderScene = (params, props) => {
  const {route} = params;
  const {terms} = props;
  switch (route.key) {
    case 'first':
      return <FirstRoute terms={terms} />;
    case 'second':
      return <SecondRoute />;
    default:
      return null;
  }
};

export default function TabViewExample(props) {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const [routes] = React.useState([
    {key: 'first', title: 'Terms'},
    {key: 'second', title: 'FAQ'},
  ]);

  return (
    <View style={styles.tabContainer}>
      <TabView
        initialLayout={{width: Layout.window.width}}
        navigationState={{index: selectedTab, routes}}
        renderScene={e => renderScene(e, props)}
        renderTabBar={tabBarProps => {
          return (
            <TabBar
              {...tabBarProps}
              activeColor={colors.primary}
              inactiveColor={colors.black}
              indicatorStyle={styles.indicatorStyle}
              style={{backgroundColor: '#F5F5F5', marginHorizontal: 5}}
              {...props}
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
    flexGrow: 1,
  },
  tabContainer: {
    flexGrow: 1,
    marginTop: 15,
  },
  indicatorStyle: {
    backgroundColor: colors.themeBlue,
    height: 2,
    borderRadius: 5,
  },
});
