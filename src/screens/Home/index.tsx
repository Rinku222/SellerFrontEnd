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

function TopRow({firstName}) {
  return (
    <View style={styles.topRow}>
      <Text style={styles.hugeText}>
        Hey
        <Text style={{color: colors.themeYellow}}> {firstName}</Text>
      </Text>
      <TouchableOpacity style={{padding: 4}}>
        <CartIcon />
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
        {recommended?.map(item => (
          <View style={{width: 200, margin: 5}}>
            <CourseCard data={item} {...props} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function Home(props) {
  // const firstName = useSelector(s => s.user.userData?.username) || '';

  const loading = loadingVariable();

  const {allCourses, subscribedCourses} = useSelector(s => s.home);

  const {user} = useSelector(s => s.user);

  const {_id, displayName, email, phone, profileUrl} = user || {};

  const {getHomeCourses, getAllSubscribedCourses} = homeActions();
  const {getUserData} = useUserActions();

  const loadData = async () => {
    getHomeCourses({offset: 0, limit: 10});
    getAllSubscribedCourses();
    getUserData();
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollView style={styles.container}>
      <TopRow firstName={displayName} />
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
