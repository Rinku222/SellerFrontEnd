import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useSelector} from 'react-redux';
import CourseCard from '../../components/CourseCard';
import InputBox from '../../components/InputBox';
import SearchBar from '../../components/SearchBar';
import {colors} from '../../config/colors';
import searchActions from '../../redux/actions/searchActions';
import {getShadow} from '../../utils';

function renderEmpty() {
  return (
    <View
      style={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>No Course matches</Text>
    </View>
  );
}

function RenderCourses(props) {
  const {course} = props;

  return (
    <View style={styles.flatList}>
      <FlatList
        contentContainerStyle={styles.mainContainer}
        data={course}
        extraData={course}
        keyExtractor={item => item.courseId}
        ListEmptyComponent={renderEmpty}
        numColumns={2}
        renderItem={({item}) => (
          <View style={{margin: 5, width: '47%'}}>
            <CourseCard data={item} {...props} />
          </View>
        )}
      />
    </View>
  );
}

function Search(props) {
  const {getAllCourseCategories, getAllSearchedCourses} = searchActions();

  const [searchText, setSearchText] = useState('');
  const [searchName, setSearchName] = useState('');
  const [selected, setSelected] = useState('');

  const {courseCatagory, searchLoading} = useSelector(s => s.search);
  const {course} = useSelector(s => s.search.searchedCourses);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getAllSearchedCourses({
      offset: 0,
      limit: 10,
      searchText: searchName,
      streamId: selected,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchName, selected]);

  const loadData = async () => getAllCourseCategories({offSet: 0, limit: 10});

  const handleChange = async v => {
    setSearchName(v);
  };

  const filteredOptions = useMemo(() => {
    return courseCatagory
      ?.map(i => ({
        label: i.categoryName,
        // eslint-disable-next-line no-underscore-dangle
        value: i._id,
      }))
      .filter(i => {
        const {label} = i;
        return label?.includes(searchText);
      });
  }, [courseCatagory, searchText]);

  return (
    <View style={{flexGrow: 1}}>
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <InputBox
            placeHolder="Search here"
            style={styles.input}
            value={searchName}
            onChangeText={v => handleChange(v)}
          />
        </View>
      </View>
      <SearchBar
        options={filteredOptions}
        placeholder="Search Here"
        searchQuery={searchText}
        selected={selected}
        style={styles.searchCategory}
        onChangeText={setSearchText}
        onSelect={setSelected}
      />
      <View style={styles.courses}>
        <Text style={styles.coursesContainer}>Courses</Text>
      </View>

      {searchLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : (
        <View style={styles.renderCourse}>
          <RenderCourses course={course} {...props} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchCategory: {
    marginHorizontal: 15,
    marginTop: 30,
    backgroundColor: colors.white,
    ...getShadow(5),
  },
  mainContainer: {
    flexGrow: 1,
    paddingRight: 12,
  },
  renderCourse: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  container: {
    backgroundColor: colors.primary,
    height: 150,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  flatList: {
    flex: 1,
    width: '100%',
  },
  searchBar: {
    justifyContent: 'flex-end',
    flexGrow: 1,
    marginBottom: 30,
    alignItems: 'center',
  },
  input: {
    color: colors.black,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  courses: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  coursesContainer: {
    color: colors.black,
    fontSize: 17,
    fontWeight: '600',
  },
});

export default Search;
