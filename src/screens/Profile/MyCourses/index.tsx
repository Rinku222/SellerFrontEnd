import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, FlatList} from 'react-native';
import TopHeader from '../../../components/TopHeader';
import {CourseIcon} from '../../../assets/svg';
import CourseCard from '../../../components/CourseCard';
import {createService, readService, Authorization} from '../../../services/HttpService/HttpService';

const DATA = [1, 2, 4, 5, 3];

function MyCourses(props) {
  const [courses, setCourses] = useState();

  const loadData = async () => {
    const result = await readService(`/course?offset=${0}&limit=${10}`, {headers: {Authorization}});
    setCourses(result?.data.course);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <TopHeader icon={<CourseIcon />} title="My Courses" {...props} />
        <FlatList
          data={courses}
          keyExtractor={item => item.toString()}
          numColumns={2}
          renderItem={({item}) => <CourseCard course data={item} {...props} />}
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
