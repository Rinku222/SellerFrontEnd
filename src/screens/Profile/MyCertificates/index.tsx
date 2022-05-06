import React from 'react';
import {View, StyleSheet, ScrollView, FlatList} from 'react-native';
import TopHeader from '../../../components/TopHeader';
import {CertificateIcon} from '../../../assets/svg';
import CourseCard from '../../../components/CourseCard';

const DATA = [1, 2, 4, 5, 3];

function MyCertificates(props) {
  return (
    <View style={styles.container}>
      <View>
        <TopHeader icon={<CertificateIcon />} title="My Certificate" {...props} />
        <ScrollView>
          <FlatList
            data={DATA}
            keyExtractor={item => item.toString()}
            numColumns={2}
            renderItem={() => <CourseCard />}
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

export default MyCertificates;
