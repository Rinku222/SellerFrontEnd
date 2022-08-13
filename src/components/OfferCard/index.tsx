import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {colors} from '../../config/colors';
import {fontSizes} from '../../config/globalStyles';
import TreeSvgXml from '../../assets/svg/TreeSvg';

function OfferCard(props) {
  const {navigation} = props;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.treeSvgStyle}>
        <SvgXml xml={TreeSvgXml} />
      </View>
      <Text style={styles.lightText}>Special offer only for you</Text>
      <Text style={styles.hugeText}>30% off</Text>
      <TouchableOpacity style={styles.yellowButton} onPress={() => navigation.navigate('search')}>
        <Text style={{color: 'white'}}>View course</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    // flex:1,
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 16,
    backgroundColor: colors.themeVeryLightPink,
  },
  treeSvgStyle: {
    position: 'absolute',
    right: -30,
    top: -30,
  },
  lightText: {
    fontSize: 16,
    color: colors.placeholderGray,
    marginBottom: 15,
  },
  hugeText: {
    fontSize: fontSizes.xHuge,
    marginBottom: 12,
  },
  yellowButton: {
    backgroundColor: colors.themeYellow,
    borderRadius: 6,
    paddingLeft: 18,
    width: 120,
    paddingVertical: 4,
  },
});

export default OfferCard;
