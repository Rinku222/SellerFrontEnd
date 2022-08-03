import * as React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Text,
  TextPropTypes,
  ScrollView,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {BigLockIcon} from '../../../../assets/svg';
import {colors} from '../../../../config/colors';
import Layout from '../../../../utils/Layout';

function FirstRoute(props) {
  const {terms} = props;

  return (
    <View style={styles.container}>
      <Text style={styles.black}>{terms}</Text>
    </View>
  );
}

function SecondRoute() {
  const {FAQ} = useSelector(s => s.main);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={{color: colors.black, marginBottom: 20, fontWeight: 'bold'}}>Questions</Text>
        {FAQ.map((item, index) => {
          return (
            <View style={{marginBottom: 20}}>
              <Text style={{marginBottom: 10, color: colors.black, fontWeight: 'bold'}}>
                Q. {item?.question}
              </Text>
              <Text style={{color: colors.black}}>{item?.answer}</Text>
            </View>
          );
        })}
      </ScrollView>
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
  const {courseBought} = props;

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
      {!courseBought ? (
        <LinearGradient
          colors={['#FFFFFFB3', '#BBBBBB', '#808080']}
          style={{
            position: 'absolute',
            bottom: 60,
            left: 0,
            right: 0,
            alignItems: 'center',
            paddingVertical: 30,
          }}>
          <BigLockIcon />
        </LinearGradient>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexGrow: 1,
  },
  black: {
    color: colors.black,
  },
  tabContainer: {
    flexGrow: 1,
    marginTop: 15,
    position: 'relative',
  },
  indicatorStyle: {
    backgroundColor: colors.themeBlue,
    height: 2,
    borderRadius: 5,
  },
});
