import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Animated,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {NavigationState, SceneRendererProps, TabView} from 'react-native-tab-view';
import VideoPlayer from 'react-native-video-controls';
import {useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ActivityIndicator} from 'react-native-paper';
import {colors} from '../../config/colors';
import {getShadow} from '../../config/globalStyles';
import Layout from '../../utils/Layout';
import Description from './Components/Description';
import Messages from './Components/Messages/Index';
import Notes from './Components/Notes';
import Reviews from './Components/Reviews';
import TermsAndFAQ from './Components/TermsAndFAQ';
import DocumentsAndVideos from './Components/VideosAndDocuments';
import {CartIcon, UsersIcon} from '../../assets/svg';
import useMainScreenActions from '../../redux/actions/mainScreenActions';
import useMainServices from '../../services/Main';
import useWishlistActions from '../../redux/actions/wishlistActions';
import homeActions from '../../redux/actions/homeActions';

type Route = {
  key: string;
  title: string;
};

type State = NavigationState<Route>;

const routes: Route[] = [
  {key: '1', title: 'Description'},
  {key: '0', title: 'Videos'},
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
  const {route, navigation} = props;
  const {params} = route;

  // const {courseId} = params;

  const courseId = useSelector(s => s.main.courseId);

  const {setVideoTime, addToCart} = useMainServices();

  const {descriptions} = useSelector(s => s.main);

  const totalDuration = useRef(0);
  const currentTime = useRef(0);

  const {
    categoryId,
    courseTitle,
    coverImageUrl,
    duration,
    description,
    wishListed,
    totalCredits,
    totalLession,
    subscriptionCount,
    recentVideo,
    reviewed,
    terms,
    subscribed,
    whishListId,
    insideCart,
  } = descriptions || {};

  const {videoUrl, _id} = recentVideo || {};

  const videoDuration = recentVideo?.duration;
  const _sectionId = recentVideo?.sectionId || '';
  const videoRef = useRef(videoDuration);

  const {getSections, getDescriptions, readReviews, addReview, readFAQ, readMessages} =
    useMainScreenActions();
  const {addWishlist, deleteWishlist} = useWishlistActions();
  const {getCart} = homeActions();

  const [selectedTab, setSelectedTab] = useState(0);
  const [video, setVideo] = useState(videoUrl || '');
  const [videoId, setVideoId] = useState('');
  const [sectionId, setSectionId] = useState();
  const [paused, setPaused] = useState(true);
  const [addToCartLoader, setAddToCartLoader] = useState(false);

  const courseBought = subscribed || false;

  const handleWishlistPress = async () => {
    if (wishListed) {
      await deleteWishlist({wishlistId: whishListId});
    } else {
      await addWishlist({courseId});
    }
    getDescriptions({courseId, offset: 0, limit: 20});
  };

  const loadData = async () => {
    await getDescriptions({courseId, offset: 0, limit: 20});
    getSections({courseId, offset: 0, limit: 20});
    readReviews({courseId, offset: 0, limit: 20});
    readFAQ({courseId, offSet: 0, limit: 20});
    readMessages({courseId, offSet: 0, limit: 10});
    if (videoDuration) {
      videoRef?.current?.seekTo?.(videoDuration / 1000);
    }
  };

  useEffect(() => {
    loadData();
  }, [courseId, videoId]);

  useEffect(() => {
    if (_id && _id !== videoId) {
      setVideoId(_id);
      setSectionId(_sectionId);
    }
  }, [_id, videoId]);

  useEffect(() => {
    if (paused && currentTime.current !== 0) {
      setVideoTime({courseId, sectionId, videoId, duration: currentTime.current * 1000});
    }
  }, [courseId, paused, videoId]);

  const handleVideoId = id => {
    setVideoId(id);
  };

  const handleSectionId = id => {
    setSectionId(id);
  };

  const handleAddToCart = async () => {
    if (insideCart) {
      navigation.navigate('Step1');
    } else {
      setAddToCartLoader(true);
      await addToCart({courseId});
      await getDescriptions({courseId, offset: 0, limit: 20});
      setAddToCartLoader(false);
      getCart();
    }
  };

  const renderScene = ({
    route: {key},
  }: SceneRendererProps & {
    route: Route;
  }) => {
    switch (key) {
      case '1':
        return <Description description={description} />;
      case '0':
        return (
          <DocumentsAndVideos
            {...props}
            courseBought={courseBought}
            courseId={courseId}
            setSectionId={handleSectionId}
            setVideo={setVideo}
            setVideoId={handleVideoId}
          />
        );
      case '2':
        return (
          <TermsAndFAQ {...props} courseBought={courseBought} courseId={courseId} terms={terms} />
        );
      case '3':
        return <Notes courseBought={courseBought} videoId={videoId} {...props} />;
      case '4':
        return <Messages courseBought={courseBought} courseId={courseId} {...props} />;
      case '5':
        return (
          <Reviews
            addReview={addReview}
            courseBought={courseBought}
            courseId={courseId}
            readReviews={readReviews}
            reviewed={reviewed}
            {...props}
          />
        );
      default:
        return <View />;
    }
  };

  return (
    <View style={styles.mainContainer1}>
      <View style={styles.videoContainer}>
        <VideoPlayer
          navigator={navigation}
          paused={paused}
          ref={videoRef}
          source={{
            uri: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          }}
          style={styles.videos}
          onBuffer={buffer => console.log('----->buffer', buffer)}
          onEnd={() => setPaused(true)}
          onError={err => console.log('----->err', err)}
          onPause={() => setPaused(true)}
          onPlay={() => setPaused(false)}
          onProgress={e => {
            totalDuration.current = e.seekableDuration;
            currentTime.current = e.currentTime;
          }}
        />
      </View>

      {!subscribed ? (
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            left: 10,
            zIndex: 5,
            backgroundColor: colors.primary,
            borderRadius: 10,
            paddingVertical: 10,
          }}
          onPress={handleAddToCart}>
          <View>
            {!addToCartLoader ? (
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                {insideCart ? <Text style={{color: colors.white}}>View Cart</Text> : null}
                <CartIcon style={{color: colors.white, marginHorizontal: 10}} />
                {!insideCart ? <Text style={{color: colors.white}}>Add to Cart</Text> : null}
              </View>
            ) : (
              <ActivityIndicator animating color={colors.white} size="small" />
            )}
          </View>
        </TouchableOpacity>
      ) : null}

      <View style={{backgroundColor: colors.black, flexGrow: 1}}>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 10,
            }}>
            <Text style={styles.header}>{courseTitle}</Text>
            <TouchableOpacity onPress={() => handleWishlistPress()}>
              {wishListed ? (
                <MaterialCommunityIcons color={colors.primary} name="cards-heart" size={20} />
              ) : (
                <MaterialCommunityIcons name="cards-heart-outline" size={20} />
              )}
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 10, paddingHorizontal: 5}}>
            <Text style={{paddingRight: 10}}>{duration}</Text>
            <Text style={{paddingHorizontal: 10}}>{totalLession} Lessons</Text>
            <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
              <Text>{subscriptionCount}</Text>
              <UsersIcon />
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
    marginBottom: 5,
    paddingHorizontal: 5,
    color: colors.black,
  },
  videos: {
    width: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  mainContainer1: {
    flexGrow: 1,
    backgroundColor: colors.white,
    position: 'relative',
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
});

export default MainScreen;
