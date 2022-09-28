import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, FlatList, Image, Text} from 'react-native';
import {useSelector} from 'react-redux';
import TopHeader from '../../../components/TopHeader';
import {CourseIcon} from '../../../assets/svg';
import CourseCard from '../../../components/CourseCard';
import {createService, readService, Authorization} from '../../../services/HttpService/HttpService';

const DATA = [];

function renderEmpty() {
  return (
    <View
      style={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image source={require('../../../assets/images/EmptyCourse.png')} style={styles.emptyImage} />
      <Text style={styles.emptyText}>You haven’t started any course yet!</Text>
    </View>
  );
}

function MyCourses(props) {
  const {subscribedCourses} = useSelector(s => s.home);

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <TopHeader icon={<CourseIcon />} title="My Courses" {...props} />
        <FlatList
          contentContainerStyle={{flex: 1}}
          data={subscribedCourses}
          keyExtractor={item => item._id}
          // eslint-disable-next-line no-underscore-dangle
          ListEmptyComponent={renderEmpty}
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
    // marginBottom: 100,
    flex: 1,
  },
  emptyText: {
    color: '#285892',
    fontWeight: 'bold',
  },
});

export default MyCourses;
