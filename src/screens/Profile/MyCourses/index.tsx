import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import TopHeader from '../../../components/TopHeader';
import {CourseIcon} from '../../../assets/svg';
import CourseCard from '../../../components/CourseCard';
import {createService, readService, Authorization} from '../../../services/HttpService/HttpService';

const DATA = [1, 2, 4, 5, 3];

function MyCourses(props) {
  const {subscribedCourses} = useSelector(s => s.home);

  return (
    <View style={styles.container}>
      <View>
        <TopHeader icon={<CourseIcon />} title="My Courses" {...props} />
        <FlatList
          data={subscribedCourses}
          // eslint-disable-next-line no-underscore-dangle
          keyExtractor={item => item._id}
          numColumns={2}
          renderItem={({item}) => <CourseCard course data={item} {...props} price />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 100,
  },
});

export default MyCourses;
