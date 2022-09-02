import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Text, FlatList} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import TopHeader from '../../../components/TopHeader';
import {CertificateIcon} from '../../../assets/svg';
import CourseCard from '../../../components/CourseCard';
import {colors} from '../../../config/colors';
import useUserServices from '../../../services/User';
import CertificateCard from '../../../components/CertificateCard';

const DATA = [1, 2, 4, 5, 3, 9];

function BottomComponent(loading: boolean) {
  return (
    <View>
      {loading ? (
        <ActivityIndicator
          animating
          color={colors.primary}
          size="small"
          // style={styles.wishlistIcon}
        />
      ) : null}
    </View>
  );
}

function MyCertificates(props) {
  const [myCertificates, setMyCertificates] = useState([]);

  const [bigLoading, setBigLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [offSet, setOffset] = useState(0);

  const {getMyCertificates} = useUserServices();

  const EndReached = () => {
    if (offSet + 10 < total) {
      loadData(offSet + 10);
      setOffset(offSet + 10);
    }
  };

  const loadData = async (value: number) => {
    setLoading(true);
    const response = await getMyCertificates({offSet: value});
    const {data} = response;
    const {count, certificates} = data;
    if (count !== data.count) {
      setTotal(data.count);
    }
    setMyCertificates([...myCertificates, ...certificates]);
    setLoading(false);
  };

  useEffect(() => {
    setBigLoading(true);
    loadData(0);
    setBigLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      <View style={{flexGrow: 1}}>
        <TopHeader icon={<CertificateIcon />} title="My Certificate" {...props} />
        <View style={{flexGrow: 1, flex: 1}}>
          <FlatList
            contentContainerStyle={styles.mainContainer}
            data={myCertificates}
            keyExtractor={item => item._id}
            ListFooterComponent={() => BottomComponent(loading)}
            numColumns={2}
            // renderItem={item => <CertificateCard data={item} {...props} />}
            renderItem={item => (
              <View style={{flex: 0.5}}>
                <CertificateCard data={item.item} {...props} />
              </View>
            )}
            onEndReached={() => EndReached()}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flexGrow: 1,
    // marginBottom: 100,
  },
  mainContainer: {
    // flex: 1,
  },
});

export default MyCertificates;
