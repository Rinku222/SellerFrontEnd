import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {PrevArrowIcon, NextArrowIcon} from '../../../assets/svg';
import ThemeButton from '../../../components/ThemeButton/ThemeButton';
import TopHeader from '../../../components/TopHeader';
import {colors} from '../../../config/colors';

const LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function Quiz(props: any) {
  const [active, setActive] = useState(10);

  const handlePrev = () => {
    if (active > 0) {
      setActive(active - 1);
    }
  };

  const handleNext = () => {
    setActive(active + 1);
  };

  const handleSave = () => {
    // save button function
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <TopHeader color={colors.white} {...props} />
        <View style={styles.numberList}>
          {LIST.map((item, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={styles.numberContainer}
                onPress={() => setActive(item)}>
                <Text style={{color: item === active ? 'black' : 'grey'}}>{item}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.subContainer}>
            <Text>{active}</Text>
            <Text>1</Text>
          </View>
          {active === 10 ? (
            <View style={styles.saveButton}>
              <ThemeButton title="Save" onPress={handleSave} />
            </View>
          ) : (
            <View style={styles.iconsContainer}>
              <TouchableOpacity onPress={handlePrev}>
                <PrevArrowIcon />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNext}>
                <NextArrowIcon />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {padding: 10, backgroundColor: colors.primary, flex: 1},
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    alignItems: 'center',
  },
  subContainer: {
    flexGrow: 1,
  },
  numberContainer: {
    backgroundColor: colors.white,
    marginRight: 5,
    borderRadius: 15,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: colors.white,
    margin: 10,
    borderRadius: 20,
    padding: 10,
    paddingBottom: 30,
  },
  numberList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Quiz;
