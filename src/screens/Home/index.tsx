import React, {useState, useRef} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {colors} from '../../config/colors';
import OfferCard from '../../components/OfferCard';
import OgoingCourseCard from '../../components/OngoingCourseCard';
import CourseCard from '../../components/CourseCard';
import {styles} from './styles';
import {screenWidth} from '../../config/globalStyles';

import {onGoingCoursesList} from './OngoingCourses';
import {CartIcon} from '../../assets/svg';

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
    <ScrollView horizontal style={{marginTop: 40}}>
      <View style={{flexDirection: 'row'}}>
        {recommended.map(item, index => (
          <CourseCard key={index} />
        ))}
      </View>
    </ScrollView>
  );
}

function Home(props) {
  const [firstName, setFirstName] = useState('Rishi');
  const [recommended, setRecommended] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  return (
    <View style={styles.container}>
      <TopRow firstName={firstName} />
      <ScrollView contentContainerStyle={{flex: 1, paddingTop: 40}}>
        <OfferCard />
        <Text style={styles.labelText}>Ongoing Course</Text>
        <View style={{flex: 1}}>
          <OnGoingCourses />
          <View style={{position: 'absolute', top: 100}}>
            <RenderRecommended recommended={recommended} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default Home;
