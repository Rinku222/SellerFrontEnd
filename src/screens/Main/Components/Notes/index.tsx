import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextInput} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getShadow} from '../../../../config/globalStyles';
import {colors} from '../../../../config/colors';
import ThemeButton from '../../../../components/ThemeButton/ThemeButton';
import Button from '../../../../components/Button';
import {PDFExample} from '../../../PDF/PDF';

const DATA = [1];

type BottomIconProps = {
  edit: boolean;
  setEdit: (edit: boolean) => void;
};

type ParaGraphIconProps = {
  edit: boolean;
};

function AddNote(props) {
  const {setAddNote} = props;
  const [comment, setComment] = useState('');

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          dense
          activeOutlineColor={colors.lightGrey}
          mode="outlined"
          placeholder="Write Title of notes"
          style={styles.input}
          value={comment}
          onChangeText={v => setComment(v)}
        />
        <ParaGraphHeader edit />
        <BottomIcon edit setEdit={setAddNote} />
      </View>
    </View>
  );
}

function RenderNote() {
  return (
    <View style={styles.renderNoteMainContainer}>
      <ParaGraphHeader edit={false} />
      <BottomIcon edit={false} />
    </View>
  );
}

function BottomIcon(props: BottomIconProps) {
  const {edit, setEdit} = props;

  return (
    <View style={styles.paraGraphContainer}>
      {edit ? (
        <View style={styles.mainBottomContainer}>
          <ThemeButton title="Save" onPress={() => setEdit(false)} />
        </View>
      ) : (
        <View style={styles.bottomContainer}>
          <Text>28th Dec 2022</Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity>
              <MaterialCommunityIcons
                color={colors.themeBlack}
                name="share-variant-outline"
                size={20}
                style={styles.icons}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialCommunityIcons
                color={colors.themeBlack}
                name="delete"
                size={20}
                style={styles.icons}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEdit(true)}>
              <AntDesign color={colors.themeBlack} name="edit" size={20} style={styles.icons} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

function ParaGraphHeader(props: ParaGraphIconProps) {
  const {edit} = props;

  return (
    <View style={styles.paraGraphContainer}>
      <View style={styles.pagraphTitle}>
        <Text style={styles.text}>
          {'  '}Module 1{'  '}
        </Text>
        <Text style={styles.text}>Page 6{'   '}</Text>
        <Text style={styles.text}>Paragraph 2</Text>
      </View>
      {edit ? (
        <TextInput
          dense
          multiline
          activeOutlineColor={colors.lightGrey}
          activeUnderlineColor="transparent"
          mode="outlined"
          numberOfLines={5}
          placeholder="Write Title of notes"
          style={styles.input}
          underlineColor="transparent"
          value="world"
          onChangeText={v => console.log('-------->hello')}
        />
      ) : (
        <Text style={styles.paraGraphContainerText}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae provident aspernatur
          unde optio mollitia saepe.
        </Text>
      )}
    </View>
  );
}

function Notes(props) {
  const {courseBought, navigation} = props;
  const [addNote, setAddNote] = useState(false);

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity style={{flex: 1}} onPress={() => navigation.navigate('PDFScreen')}>
        {/* <PDFExample /> */}
        <Text style={{padding: 5}}>Pdf</Text>
      </TouchableOpacity>
      {DATA.length > 0 ? (
        addNote ? (
          <AddNote addNote={addNote} setAddNote={setAddNote} />
        ) : !courseBought ? (
          <View>
            <View style={styles.addNewNoteContainer}>
              <TouchableOpacity
                style={styles.addNewNoteSubContainer}
                onPress={() => setAddNote(true)}>
                <MaterialIcons color={colors.white} name="add" size={20} />
                <Text style={styles.buttonText}>Add New Note</Text>
              </TouchableOpacity>
            </View>
            <RenderNote />
          </View>
        ) : null
      ) : (
        <View>
          {addNote ? (
            <AddNote setAddNote={setAddNote} />
          ) : !courseBought ? (
            <View style={styles.emptyMinContainer}>
              <View style={styles.emptySubContainer}>
                <Text style={styles.emptyText}>Click below button to add new notes</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.buttonContentContainer}
                    onPress={() => setAddNote(true)}>
                    <MaterialIcons color="#fff" name="add" size={20} />
                    <Text style={styles.buttonText}>Add New Note</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : null}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
  },
  addNewNoteContainer: {
    justifyContent: 'flex-end',
    display: 'flex',
    alignItems: 'flex-end',
    marginVertical: 10,
  },
  addNewNoteSubContainer: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 10,
  },
  renderNoteMainContainer: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.greyTheme,
    borderBottomWidth: 0,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 3,
  },
  emptyMinContainer: {
    height: '100%',
    alignItems: 'center',
  },
  emptySubContainer: {
    height: '80%',
    justifyContent: 'space-around',
    width: '50%',
    alignItems: 'center',
  },
  emptyText: {color: colors.themeBlackLight, textAlign: 'center'},
  buttonText: {
    color: colors.white,
    marginLeft: 5,
  },
  buttonContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  buttonContainer: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: 3,
    width: '100%',
  },
  input: {
    borderRadius: 5,
    padding: 0,
    backgroundColor: colors.white,
  },
  text: {
    color: colors.black,
  },
  icons: {
    marginHorizontal: 5,
  },
  paraGraphContainer: {
    marginTop: 10,
  },
  paraGraphContainerText: {
    marginVertical: 20,
  },
  pagraphTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.whiteShade,
    height: 30,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.lightGrey,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainBottomContainer: {
    alignItems: 'flex-end',
  },
});

export default Notes;
