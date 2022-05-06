import React from 'react';
import {View, StyleSheet, ScrollView, FlatList} from 'react-native';
import TopHeader from '../../../components/TopHeader';
import {CourseIcon} from '../../../assets/svg';
import CourseCard from '../../../components/CourseCard';

const DATA = [1, 2, 4, 5, 3];

function MyCourses(props) {
  return (
    <View style={styles.container}>
      <View>
        <TopHeader icon={<CourseIcon />} title="My Courses" {...props} />
        <ScrollView>
          <FlatList
            data={DATA}
            keyExtractor={item => item.toString()}
            numColumns={2}
            renderItem={() => <CourseCard course />}
          />
        </ScrollView>
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
