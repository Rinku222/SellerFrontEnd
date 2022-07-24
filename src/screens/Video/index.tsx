import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import CourseCard from '../../components/CourseCard';
import {colors} from '../../config/colors';
import {CourseIcon} from '../../assets/svg';
import ThemeButton from '../../components/ThemeButton/ThemeButton';
import Teaching from '../../assets/images/online-learning.png';
import {Loader} from '../../../App';
import loadingVariable from '../../redux/selector';

const course = true;

function RenderEmpty(props) {
  const {navigation} = props;

  return (
    <View style={styles.emptyMainContainer}>
      <View style={styles.emptyData}>
        <Image source={Teaching} style={styles.image} />
        <Text style={styles.emptyText}>Not Subscribed!</Text>
        <Text style={styles.emptyMessage}>
          You do not seem to have subscribed any courses, please tap on view course button to
          subscribe course
        </Text>
      </View>
      <View>
        <ThemeButton
          style={{backgroundColor: colors.primary}}
          title="View Courses"
          onPress={() => navigation.navigate('search')}
        />
      </View>
    </View>
  );
}

function Video(props) {
  const {navigation} = props;
  const {subscribedCourses} = useSelector(s => s.home);
  const loading = loadingVariable();

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.mainContainer}>
      {subscribedCourses.length ? (
        <View style={styles.header}>
          <CourseIcon />
          <Text style={styles.headerText}>Video Screen</Text>
        </View>
      ) : null}

      <FlatList
        data={subscribedCourses}
        extraData={subscribedCourses}
        keyExtractor={item => item.id}
        ListEmptyComponent={() => <RenderEmpty navigation={navigation} />}
        renderItem={({item}) => (
          <View style={{margin: 5}}>
            <CourseCard course myCourse data={item} {...props} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  headerText: {
    marginLeft: 5,
    color: colors.black,
  },
  emptyMainContainer: {
    flexGrow: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  emptyData: {
    alignItems: 'center',
    marginHorizontal: 30,
  },
  emptyText: {
    marginBottom: 5,
    color: colors.primary,
    fontWeight: 'bold',
  },
  image: {
    marginBottom: 25,
  },
  emptyMessage: {
    textAlign: 'center',
  },
});

export default Video;
