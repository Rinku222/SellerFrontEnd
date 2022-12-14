import React from 'react';
import {TouchableOpacity, View, Image, Text, StyleSheet} from 'react-native';
import {colors} from '../../config/colors';
import useMainScreenActions from '../../redux/actions/mainScreenActions';

function OngoingCourseCard(props) {
  const {
    programName = 'NA',
    creatorName = 'NA',
    creatorUrl,
    courseImage,
    navigation,
    courseId,
  } = props;
  const {setCourseId} = useMainScreenActions();

  const handlePress = async () => {
    await setCourseId({courseId});
    navigation.navigate('VideosScreen');
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.cardContainer}
      onPress={() => handlePress()}>
      <Image
        source={{
          uri: courseImage,
        }}
        style={styles.leftImageStyle}
      />
      <View style={{marginLeft: 11}}>
        <Text numberOfLines={2} style={styles.titleText}>
          {programName}
        </Text>
        <View style={styles.creatorRow}>
          <Image
            source={{
              uri: creatorUrl,
            }}
            style={styles.avatar}
          />
          <Text style={styles.creatorName}>{creatorName}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.playIconContainer}>
        <Image source={require('../../assets/images/play.png')} style={styles.playIcon} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    width: '94%',
    paddingVertical: 11,
    paddingHorizontal: 8,
    borderRadius: 11,
    backgroundColor: 'white',
    shadowColor: colors.themeShadow,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  leftImageStyle: {
    width: 83,
    height: 75,
    borderRadius: 8,
  },
  titleText: {
    fontSize: 16,
    color: colors.themeDarkBlackText,
    marginBottom: 12,
    flex: 1,
    height: 40,
  },
  creatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: 24,
    width: 24,
    borderRadius: 12,
  },
  creatorName: {
    fontSize: 14,
    color: colors.themeGray,
    marginLeft: 8,
  },
  playIconContainer: {
    position: 'absolute',
    right: 10,
    bottom: 8,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});

export default OngoingCourseCard;
