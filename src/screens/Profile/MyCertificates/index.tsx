import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Text, FlatList, Image} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import TopHeader from '../../../components/TopHeader';
import {CertificateIcon} from '../../../assets/svg';
import CourseCard from '../../../components/CourseCard';
import {colors} from '../../../config/colors';
import useUserServices from '../../../services/User';
import CertificateCard from '../../../components/CertificateCard';
import Award from '../../../assets/images/award.png';

const DATA = [];

function renderEmpty() {
  return (
    <View
      style={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image source={require('../../../assets/images/award.png')} style={styles.emptyImage} />
      <Text style={styles.emptyText}>You haven’t got certificate yet!</Text>
    </View>
  );
}

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
            contentContainerStyle={
              myCertificates ? styles.mainContainer : styles.emptyMainContainer
            }
            data={myCertificates}
            keyExtractor={item => item._id}
            ListEmptyComponent={renderEmpty}
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
  emptyText: {
    color: '#285892',
    fontWeight: 'bold',
  },
  emptyMainContainer: {
    flex: 1,
  },
});

export default MyCertificates;
