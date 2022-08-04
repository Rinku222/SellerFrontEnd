import React, {useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {useSelector} from 'react-redux';
import {colors} from '../../config/colors';
import OfferCard from '../../components/OfferCard';
import OgoingCourseCard from '../../components/OngoingCourseCard';
import {styles} from './styles';
import {screenWidth} from '../../config/globalStyles';
import {CartIcon, WarningIcon} from '../../assets/svg';
import CourseCard from '../../components/CourseCard';
import homeActions from '../../redux/actions/homeActions';
import {Loader} from '../../../App';
import loadingVariable from '../../redux/selector';
import useUserActions from '../../redux/actions/userActions';

function TopRow({firstName, cartLength, navigation}) {
  return (
    <View style={styles.topRow}>
      <Text style={styles.hugeText}>
        Hey
        <Text style={{color: colors.themeYellow}}> {firstName}</Text>
      </Text>
      <TouchableOpacity style={{padding: 4}} onPress={() => navigation.navigate('Step1')}>
        <CartIcon style={styles.cartIcon} />
        <Text style={styles.cartLength}>{cartLength}</Text>
      </TouchableOpacity>
    </View>
  );
}

function OnGoingCourses(props) {
  const {subscribedCourses} = props;

  let _carousel = useRef(null);

  const renderCarouselItem = ({item, index}) => {
    return (
      // <Text>Hello</Text>
      <OgoingCourseCard
        courseImage={item.coverImageUrl}
        creatorName={item.owner.name}
        creatorUrl={item.owner.profileUrl}
        programName={item.courseTitle}
      />
    );
  };

  return (
    <View style={styles.ongoingCourses}>
      {subscribedCourses.length ? (
        <Carousel
          loop
          data={subscribedCourses}
          itemWidth={screenWidth - 10}
          layout="stack"
          layoutCardOffset={-20}
          ref={c => {
            _carousel = c;
          }}
          renderItem={renderCarouselItem}
          sliderWidth={screenWidth - 30}
        />
      ) : (
        <View style={styles.cardContainer}>
          <WarningIcon />
          <Text>You are not subscribed to any courses</Text>
        </View>
      )}
    </View>
  );
}

function RenderRecommended(props) {
  const {recommended} = props;

  return (
    <ScrollView horizontal style={{marginTop: 10}}>
      <View style={{flexDirection: 'row'}}>
        {recommended?.map((item, index) => (
          <View key={index} style={{width: 200, margin: 5}}>
            <CourseCard data={item} {...props} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function Home(props) {
  const loading = loadingVariable();

  const {allCourses, subscribedCourses, cart} = useSelector(s => s.home);

  const {user} = useSelector(s => s.user);

  const {_id, displayName, email, phone, profileUrl} = user || {};

  const {getHomeCourses, getAllSubscribedCourses, getCart} = homeActions();
  const {getUserData} = useUserActions();

  const loadData = async () => {
    getHomeCourses({offset: 0, limit: 10});
    getAllSubscribedCourses();
    getUserData();
    getCart();
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollView style={styles.container}>
      <TopRow cartLength={cart.length} firstName={displayName} {...props} />
      <ScrollView contentContainerStyle={{flex: 1, paddingTop: 40}}>
        <OfferCard />
        <Text style={styles.labelText}>Ongoing Course</Text>
        <View style={{flex: 1}}>
          <OnGoingCourses subscribedCourses={subscribedCourses} />
          <View>
            <RenderRecommended recommended={allCourses} {...props} />
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
}

export default Home;
