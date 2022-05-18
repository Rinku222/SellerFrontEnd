import React, {useState} from 'react';
import {View, StyleSheet, Text, Animated, TouchableWithoutFeedback, ScrollView} from 'react-native';
import {NavigationState, SceneRendererProps, TabView} from 'react-native-tab-view';
import Video from 'react-native-video';
import {colors} from '../../config/colors';
import Layout from '../../utils/Layout';
import Messages from './Components/Messages/Index';
import Notes from './Components/Notes';
import Reviews from './Components/Reviews';
import TermsAndFAQ from './Components/TermsAndFAQ';
import DocumentsAndVideos from './Components/VideosAndDocuments';

type Route = {
  key: string;
  title: string;
};

type State = NavigationState<Route>;

const routes: Route[] = [
  {key: '0', title: 'Messages'},
  {key: '1', title: 'Terms & FAQ'},
  {key: '2', title: 'Reviews'},
  {key: '3', title: 'Notes'},
  {key: '4', title: 'Videos and Documents'},
];

const renderItem =
  ({
    navigationState,
    position,
  }: {
    navigationState: State;
    position: Animated.AnimatedInterpolation;
  }) =>
  // eslint-disable-next-line react/function-component-definition
  ({route, index}: {route: Route; index: number}) => {
    const inputRange = navigationState.routes.map((_, i) => i);

    const activeOpacity = position.interpolate({
      inputRange,
      outputRange: inputRange.map((i: number) => (i === index ? 1 : 0)),
    });
    const inactiveOpacity = position.interpolate({
      inputRange,
      outputRange: inputRange.map((i: number) => (i === index ? 0 : 1)),
    });

    return (
      <View style={styles.tab}>
        <Animated.View style={[styles.item, {opacity: inactiveOpacity}]}>
          <Text style={[styles.label, styles.inactive]}>{route.title}</Text>
        </Animated.View>
        <Animated.View style={[styles.item, styles.activeItem, {opacity: activeOpacity}]}>
          <Text style={[styles.label, styles.active]}>{route.title}</Text>
        </Animated.View>
      </View>
    );
  };

const renderTabBar = (props: SceneRendererProps & {navigationState: State}) => (
  <View style={styles.tabbar}>
    <ScrollView horizontal contentContainerStyle={{flexGrow: 1}}>
      {props.navigationState.routes.map((route: Route, index: number) => {
        return (
          <TouchableWithoutFeedback key={route.key} onPress={() => props.jumpTo(route.key)}>
            {renderItem(props)({route, index})}
          </TouchableWithoutFeedback>
        );
      })}
    </ScrollView>
  </View>
);

function MainScreen() {
  // const [selectedTab, setSelectedTab] = useState(5);
  const [selectedTab, setSelectedTab] = useState(0);

  const renderScene = ({
    route: {key},
  }: SceneRendererProps & {
    route: Route;
  }) => {
    console.log('-------->key', key);
    switch (key) {
      case '0':
        return <Messages />;
      case '1':
        return <TermsAndFAQ />;
      case '2':
        return <Reviews />;
      case '3':
        return <Notes />;
      case '4':
        return <DocumentsAndVideos />;

      default:
        return <View />;
    }
  };

  return (
    <View style={{flexGrow: 1}}>
      <View style={{flexGrow: 1, position: 'relative', top: 0, bottom: 0, paddingBottom: 0}}>
        <Video
          controls
          source={{
            uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          }}
          style={styles.videos}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.header}>Clinical Learning</Text>
        <View style={styles.scoreContainer}>
          <Text style={styles.creditText}>Credits earned:</Text>
          <View style={styles.scoreTextContainer}>
            <Text style={styles.scoreText}>500</Text>
            <Text>/1000</Text>
          </View>
        </View>
        <View style={{flexGrow: 1}}>
          <TabView
            initialLayout={{width: Layout.window.width}}
            navigationState={{index: selectedTab, routes}}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setSelectedTab}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginHorizontal: 10,
    marginTop: -120,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  scoreContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  creditText: {
    fontWeight: 'bold',
  },
  scoreTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreText: {
    fontWeight: 'bold',
  },

  videos: {
    width: '100%',
    height: 250,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  tabbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fafafa',
  },
  tab: {
    // alignItems: 'center',
    // borderTopWidth: StyleSheet.hairlineWidth,
    // borderTopColor: 'rgba(0, 0, 0, .2)',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeItem: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  active: {
    color: '#000',
    backgroundColor: colors.themeBlue,
  },
  inactive: {
    color: '#000',
  },

  label: {
    fontSize: 15,
    // backgroundColor: colors.themeBlue,
    borderRadius: 5,
    padding: 10,
    marginLeft: 5,
  },
});

export default MainScreen;
