import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Animated,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {NavigationState, SceneRendererProps, TabView} from 'react-native-tab-view';
import VideoPlayer from 'react-native-video-controls';
import Feather from 'react-native-vector-icons/Feather';
import {colors} from '../../config/colors';
import {getShadow} from '../../config/globalStyles';
import Layout from '../../utils/Layout';
import Description from './Components/Description';
import Messages from './Components/Messages/Index';
import Notes from './Components/Notes';
import Reviews from './Components/Reviews';
import TermsAndFAQ from './Components/TermsAndFAQ';
import DocumentsAndVideos from './Components/VideosAndDocuments';
import {InfoIcon} from '../../assets/svg';
import LikeImage from '../../assets/images/likeImage.png';

type Route = {
  key: string;
  title: string;
};

type State = NavigationState<Route>;

const routes: Route[] = [
  {key: '0', title: 'Description'},
  {key: '1', title: 'Videos and Documents'},
  {key: '2', title: 'Terms & FAQ'},
  {key: '3', title: 'Notes'},
  {key: '4', title: 'Messages'},
  {key: '5', title: 'Reviews'},
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
      <View>
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
    <ScrollView horizontal contentContainerStyle={styles.contentContainer}>
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

function MainScreen(props: any) {
  const [selectedTab, setSelectedTab] = useState(0);

  const renderScene = ({
    route: {key},
  }: SceneRendererProps & {
    route: Route;
  }) => {
    switch (key) {
      case '0':
        return <Description />;
      case '1':
        return <DocumentsAndVideos />;
      case '2':
        return <TermsAndFAQ />;
      case '3':
        return <Notes />;
      case '4':
        return <Messages />;
      case '5':
        return <Reviews />;
      default:
        return <View />;
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.videoContainer}>
        <VideoPlayer
          source={{
            uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          }}
          style={styles.videos}
        />
      </View>

      <View style={{backgroundColor: '#000', flexGrow: 1}}>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 10,
              paddingBottom: 10,
            }}>
            <Text style={styles.header}>Clinical Learning</Text>
            <Image source={LikeImage} style={styles.images} />
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.creditText}>Credits earned:</Text>
            <View style={styles.scoreTextContainer}>
              <Text style={styles.scoreText}>500</Text>
              <Text style={styles.scoreSubText}>/1000</Text>
              <InfoIcon />
            </View>
          </View>
          <View style={styles.mainContainer}>
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonContentContainer}>
          <Feather color="#fff" name="shopping-cart" size={20} />
          <Text style={styles.buttonText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderTopLef: 10,
    paddingTop: 10,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
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
  scoreSubText: {
    marginRight: 5,
  },

  videos: {
    width: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  mainContainer: {
    flexGrow: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    backgroundColor: colors.backgroundGrey,
    ...getShadow(3),
    borderRadius: 5,
    flexGrow: 1,
  },
  videoContainer: {
    flexGrow: 1,
    position: 'relative',
    top: 0,
    bottom: 0,
    paddingBottom: 0,
  },
  tabbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.themeLightGray,
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
    color: colors.black,
    backgroundColor: colors.themeBlue,
    borderRadius: 10,
  },
  inactive: {
    color: colors.black,
  },

  label: {
    fontSize: 15,
    padding: 10,
    marginLeft: 5,
  },
  images: {
    width: 25,
    height: 25,
    marginRight: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    left: 10,
    paddingVertical: 3,
    backgroundColor: colors.primary,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  buttonText: {
    color: colors.white,
    marginLeft: 15,
  },
});

export default MainScreen;
