import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import {Button, Dialog, Divider, Paragraph, Portal, Provider, Subheading} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {PrevArrowIcon, NextArrowIcon} from '../../../assets/svg';
import {useAlert} from '../../../components/Alert';
import ThemeButton from '../../../components/ThemeButton/ThemeButton';
import TopHeader from '../../../components/TopHeader';
import {colors} from '../../../config/colors';
import useMainScreenActions from '../../../redux/actions/mainScreenActions';
// import DialogComponent from './DialogBox';

const letters = {0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E'};

function Quiz(props: any) {
  const {navigation} = props;
  const {questions, _id, attendStatus} = useSelector(s => s.main.assessment);
  const {totalQuestions, earnedMarks} = useSelector(s => s.main.assessmentResult) || {};
  const {courseId} = useSelector(s => s.main);

  const {sessionId} = attendStatus || {};

  const {submitAssessment, updateAssessment} = useMainScreenActions();

  const [active, setActive] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState(questions);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setQuizQuestions(questions);
  }, [questions]);

  const handleSave = async () => {
    if (sessionId) {
      await updateAssessment({assessmentId: _id, questions: quizQuestions, sessionId});
    } else {
      await submitAssessment({assessmentId: _id, questions: quizQuestions});
    }
    setVisible(true);
  };

  const hideDialog = () => setVisible(false);

  const handlePrev = () => {
    if (active > 0) {
      setActive(active - 1);
    }
  };

  const handleNext = () => {
    setActive(active + 1);
  };

  const handleOptionPress = optionId => {
    setQuizQuestions(v => {
      const newArr = [...v];
      newArr[active].optionId = optionId;
      return newArr;
    });
  };

  const currentQuestion = quizQuestions[active];

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <TopHeader color={colors.white} {...props} />
        <View style={styles.numberList}>
          {quizQuestions.map((item, questionIndex) => {
            return (
              <TouchableOpacity
                key={questionIndex}
                style={styles.numberContainer}
                onPress={() => setActive(questionIndex)}>
                <Text style={{color: item === active ? 'black' : 'grey'}}>{questionIndex + 1}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.subContainer}>
            <Subheading style={{fontWeight: '700'}}>{active + 1}</Subheading>
            <ScrollView style={{marginTop: 5}}>
              <Text style={{lineHeight: 25}}>{currentQuestion.questionText}</Text>

              <View style={{marginTop: 20, paddingHorizontal: 10}}>
                {currentQuestion.options.map((item, index) => {
                  const isSelected = currentQuestion.optionId === item.optionId;

                  return (
                    <TouchableOpacity
                      style={{
                        marginTop: 25,
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 20,
                        backgroundColor: isSelected ? colors.primary : 'transparent',
                      }}
                      onPress={() => {
                        handleOptionPress(item.optionId);
                      }}>
                      <Text
                        style={{
                          color: isSelected ? colors.white : 'grey',
                        }}>{`${letters[index]}.  ${item.optionText}`}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>

          <Portal>
            <Dialog
              style={{
                alignItems: 'center',
                backgroundColor: colors.primary,
                color: colors.primary,
                borderRadius: 20,
                padding: 20,
              }}
              visible={visible}
              onDismiss={hideDialog}>
              <Text style={{color: colors.white, fontWeight: 'bold', marginBottom: 10}}>
                Your Score
              </Text>
              <Text style={{color: colors.white, fontSize: 40, marginBottom: 10}}>
                {earnedMarks}/{totalQuestions}
              </Text>
              <Text style={{color: colors.white, marginBottom: 10, fontWeight: 'bold'}}>
                You have earned {earnedMarks} credits
              </Text>
              <Button
                color={colors.white}
                mode="contained"
                onPress={() => {
                  hideDialog();
                  navigation.navigate('VideosScreen');
                }}>
                <Text style={{fontWeight: 'bold', color: colors.primary}}>OK</Text>
              </Button>
            </Dialog>
          </Portal>
          {active + 1 === questions.length ? (
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
    marginTop: 90,
  },
  numberList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Quiz;
