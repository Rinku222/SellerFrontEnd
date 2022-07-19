import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import {Button, Dialog, Divider, Paragraph, Portal, Provider, Subheading} from 'react-native-paper';
import {PrevArrowIcon, NextArrowIcon} from '../../../assets/svg';
import {useAlert} from '../../../components/Alert';
import ThemeButton from '../../../components/ThemeButton/ThemeButton';
import TopHeader from '../../../components/TopHeader';
import {colors} from '../../../config/colors';
// import DialogComponent from './DialogBox';

const ButtonText = [
  {label: 'A.', value: 'Assam'},
  {label: 'B.', value: 'Gujarat'},
  {label: 'C.', value: 'MP'},
  {label: 'D.', value: 'None'},
];

const LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function Quiz(props: any) {
  const [active, setActive] = useState(10);

  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const handlePrev = () => {
    if (active > 0) {
      setActive(active - 1);
    }
  };

  const handleNext = () => {
    setActive(active + 1);
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
            <Subheading style={{fontWeight: '700'}}>{active}</Subheading>
            <ScrollView style={{marginTop: 5}}>
              <Text style={{lineHeight: 25}}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit porro dignissimos ut,
                possimus corporis exercitationem recusandae, officiis eligendi ipsum quae nulla unde
                aperiam quidem pariatur. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Rerum error aperiam maiores hic blanditiis sint.
              </Text>
              <View style={{marginTop: 20, paddingHorizontal: 10}}>
                {ButtonText.map(item => {
                  return (
                    <View
                      style={{
                        marginTop: 25,
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 20,
                      }}>
                      <Text>{`${item.label} ${item.value}`}</Text>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>

          <Portal>
            <Dialog style={{alignItems: 'center'}} visible={visible} onDismiss={hideDialog}>
              <Dialog.Title
                style={{
                  textAlign: 'center',
                }}>
                Your Score
              </Dialog.Title>
              <Dialog.Content style={{width: '100%'}}>
                <Paragraph style={{fontSize: 20, textAlign: 'center'}}>8/10</Paragraph>
                <Divider style={{borderWidth: 1}} />
              </Dialog.Content>

              <Dialog.Actions style={{alignItems: 'center'}}>
                <Button onPress={hideDialog}>Done</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          {active === 10 ? (
            <View style={styles.saveButton}>
              <ThemeButton title="Save" onPress={showDialog} />
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
    marginTop: 90,
  },
  numberList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Quiz;
