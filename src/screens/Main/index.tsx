import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Route, SceneRendererProps, TabBar, TabView} from 'react-native-tab-view';
import Video from 'react-native-video';
import {colors} from '../../config/colors';
import Layout from '../../utils/Layout';
import Messages from './Components/Messages/Index';
import Notes from './Components/Notes';
import Reviews from './Components/Reviews';
import TermsAndFAQ from './Components/TermsAndFAQ';
import DocumentsAndVideos from './Components/VideosAndDocuments';

const routes: Route[] = [
  {key: '0', title: 'Messages'},
  {key: '1', title: 'Terms & FAQ'},
  {key: '2', title: 'Reviews'},
  {key: '3', title: 'Notes'},
  {key: '4', title: 'Videos and Documents'},
];

function MainScreen() {
  // const [selectedTab, setSelectedTab] = useState(5);
  const [selectedTab, setSelectedTab] = useState(4);

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
    <View style={styles.container}>
      <View>
        <Video
          controls
          fullscreen
          fullscreenAutorotate
          playInBackground
          source={{
            uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          }}
          style={styles.videos}
        />
      </View>
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
          renderTabBar={tabBarProps => {
            return (
              <TabBar
                {...tabBarProps}
                scrollEnabled
                activeColor={colors.primary}
                // contentContainerStyle={{flexGrow: 1}}
                inactiveColor={colors.lightGrey}
                indicatorStyle={{backgroundColor: 'transparent'}}
                renderTabBarItem={itemProps => {
                  const {key, navigationState} = itemProps;
                  console.log('-------->itemProps', itemProps);
                  console.log('-------->Number(key)', Number(key));
                  console.log('-------->navigationState.index', navigationState.index);
                  return (
                    <TouchableOpacity>
                      <View
                        style={
                          Number(key) === navigationState.index
                            ? {
                                backgroundColor: colors.themeBlue,
                                padding: 10,
                                borderRadius: 20,
                              }
                            : {
                                padding: 10,
                                borderRadius: 20,
                                backgroundColor: '#fff',
                              }
                        }>
                        <Text>{itemProps.route.title}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                style={{backgroundColor: '#fff'}}
                tabStyle={{borderRadius: 15}}
              />
            );
          }}
          onIndexChange={setSelectedTab}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 5,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 15,
  },
  scoreContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
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
  },
  activeTab: {
    backgroundColor: colors.themeBlue,
    padding: 10,
    borderRadius: 20,
  },
  inActiveTab: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  selected: {
    backgroundColor: 'red',
    color: '#fff',
  },
});

export default MainScreen;
