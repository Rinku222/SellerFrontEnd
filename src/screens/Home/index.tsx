import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {useSelector} from 'react-redux';
import {colors} from '../../config/colors';
import OfferCard from '../../components/OfferCard';
import OgoingCourseCard from '../../components/OngoingCourseCard';
// import CourseCard from '../../components/CourseCard';
import {styles} from './styles';
import {screenWidth} from '../../config/globalStyles';

import {onGoingCoursesList} from './OngoingCourses';
import {CartIcon} from '../../assets/svg';
import {readService, Authorization} from '../../services/HttpService/HttpService';
import CourseCard from '../../components/CourseCard';
// import homeActions from 'redux/actions/notificationActions';
import homeActions from '../../redux/actions/homeActions';
import {Loader} from '../../../App';
import loadingVariable from '../../redux/selector';

function TopRow({firstName}) {
  return (
    <View style={styles.topRow}>
      <Text style={styles.hugeText}>
        Hey
        <Text style={{color: colors.themeYellow}}>{firstName}</Text>
      </Text>
      <TouchableOpacity style={{padding: 4}}>
        <CartIcon />
      </TouchableOpacity>
    </View>
  );
}

function OnGoingCourses() {
  let _carousel = useRef(null);

  const renderCarouselItem = ({item, index}) => {
    return (
      // <Text>Hello</Text>
      <OgoingCourseCard creatorName={item.creatorName} programName={item.programName} />
    );
  };

  return (
    <Carousel
      loop
      data={onGoingCoursesList}
      itemWidth={screenWidth - 10}
      layout="stack"
      layoutCardOffset={-20}
      ref={c => {
        _carousel = c;
      }}
      renderItem={renderCarouselItem}
      sliderWidth={screenWidth - 30}
    />
  );
}

function RenderRecommended({recommended}) {
  return (
    <ScrollView horizontal style={{marginTop: 10}}>
      <View style={{flexDirection: 'row'}}>
        {recommended?.map(item => (
          <View style={{width: 200}}>
            <CourseCard data={item} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function Home({route}) {
  const [firstName, setFirstName] = useState(' Rinku');

  const loading = loadingVariable();

  console.log('----->loading in home screen', loading);

  const {allCourses} = useSelector(s => s.home);

  const {getHomeCourses} = homeActions();

  const loadData = async () => {
    await getHomeCourses({offset: 0, limit: 10});
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollView style={styles.container}>
      <TopRow firstName={firstName} />
      <ScrollView contentContainerStyle={{flex: 1, paddingTop: 40}}>
        <OfferCard />
        <Text style={styles.labelText}>Ongoing Course</Text>
        <View style={{flex: 1}}>
          <OnGoingCourses />
          <View>
            <RenderRecommended recommended={allCourses} />
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
}

export default Home;
