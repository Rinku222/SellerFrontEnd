import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, ScrollView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextInput, Button} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {getShadow} from '../../../../config/globalStyles';
import {colors} from '../../../../config/colors';
import ThemeButton from '../../../../components/ThemeButton/ThemeButton';
import {PDFExample} from '../../../PDF/PDF';
import useMainScreenActions from '../../../../redux/actions/mainScreenActions';

const DATA = [];

type BottomIconProps = {
  edit: boolean;
  setEdit: (edit: boolean) => void;
};

type ParaGraphIconProps = {
  edit: boolean;
};

function AddNote(props) {
  const {setShowAddNote} = props;
  const [stickyTitle, setStickyTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stickyNoteId, setStickyNoteId] = useState('');

  console.log('----->setStickynoteId in addnote ', stickyNoteId);

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          dense
          activeOutlineColor={colors.lightGrey}
          mode="outlined"
          placeholder="Write Title of notes"
          style={styles.input}
          value={stickyTitle}
          onChangeText={v => setStickyTitle(v)}
        />
        <ParaGraphHeader edit description={description} setDescription={setDescription} />
        <BottomIcon
          edit
          description={description}
          setEdit={setShowAddNote}
          setStickynoteId={setStickyNoteId}
          stickynoteId={stickyNoteId}
          stickyTitle={stickyTitle}
          {...props}
        />
      </View>
    </View>
  );
}

function RenderNote(props) {
  const [edit, setEdit] = useState(false);
  const {item, setShowAddNote, noteId, setNoteId} = props;

  const {stickyTitle, description, creationTS} = item;

  const timestemp = new Date(23456789000);
  // const formatted = timestemp.format('dd/mm/yyyy hh:MM:ss');

  console.log('----->item', item);
  console.log('----->timestemp', timestemp);

  return (
    <View style={styles.renderNoteMainContainer}>
      <Text>{stickyTitle}</Text>
      <ParaGraphHeader edit={false} renderDescription={description} />
      <BottomIcon
        edit={false}
        {...props}
        creationTS={creationTS}
        noteId={noteId}
        setEdit={setEdit}
        setNoteId={setNoteId}
      />
    </View>
  );
}

function BottomIcon(props: BottomIconProps) {
  const {
    edit,
    setEdit,
    description,
    stickyTitle,
    videoId,
    addNote,
    handleDeleteNote,
    item,
    showAddNote,
    setShowAddNote,
    noteId,
    setNoteId,
    updateNote,
    creationTS,
  } = props;

  const {_id} = item || {};

  const handlePress = async () => {
    if (noteId) {
      console.log('----->call update api');
      console.log('----->noteId', noteId);
      await updateNote({stickynoteId: noteId, stickyTitle, description, videoId});
    } else {
      await addNote({stickyTitle, description, videoId});
    }
    setEdit(false);
  };

  return (
    <View style={styles.paraGraphContainer}>
      {edit ? (
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <View style={styles.deleteButton}>
            <Button color="#a8a8a8" mode="outlined" onPress={() => setShowAddNote(false)}>
              Cancel
            </Button>
          </View>
          <View style={styles.mainBottomContainer}>
            <ThemeButton title="Save" onPress={handlePress} />
          </View>
        </View>
      ) : (
        <View style={styles.bottomContainer}>
          {/* <Text>28th Dec 2022</Text> */}
          <Text>{new Date(creationTS).toLocaleDateString('de-DE')}</Text>

          <View style={styles.iconContainer}>
            {/* <TouchableOpacity>
              <MaterialCommunityIcons
                color={colors.themeBlack}
                name="share-variant-outline"
                size={20}
                style={styles.icons}
              />
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => {
                handleDeleteNote(_id);
              }}>
              <MaterialCommunityIcons
                color={colors.themeBlack}
                name="delete"
                size={20}
                style={styles.icons}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setNoteId(_id);
                setShowAddNote(true);
              }}>
              <AntDesign color={colors.themeBlack} name="edit" size={20} style={styles.icons} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

function ParaGraphHeader(props: ParaGraphIconProps) {
  const {edit, description = '', setDescription = '', renderDescription = ''} = props;

  return (
    <View style={styles.paraGraphContainer}>
      {/* <View style={styles.pagraphTitle}>
        <Text style={styles.text}>
          {'  '}Module 1{'  '}
        </Text>
        <Text style={styles.text}>Page 6{'   '}</Text>
        <Text style={styles.text}>Paragraph 2</Text>
      </View> */}
      {edit ? (
        <TextInput
          dense
          multiline
          activeOutlineColor={colors.lightGrey}
          activeUnderlineColor="transparent"
          mode="outlined"
          numberOfLines={5}
          placeholder="Write Description of notes"
          style={styles.input}
          underlineColor="transparent"
          value={description}
          onChangeText={v => setDescription(v)}
        />
      ) : (
        <Text style={styles.paraGraphContainerText}>{renderDescription}</Text>
      )}
    </View>
  );
}

function Notes(props) {
  const {videoId} = props;
  const [showAddNote, setShowAddNote] = useState(false);
  const [noteId, setNoteId] = useState('');

  const {addNote, readNotes, deleteNote, updateNote} = useMainScreenActions();

  const {notes} = useSelector(s => s.main);

  const loadData = async () => {
    await readNotes({videoId, limit: 20, offset: 0});
  };

  useEffect(() => {
    loadData();
  }, [videoId]);

  //   <TouchableOpacity style={{flex: 1}} onPress={() => navigation.navigate('PDFScreen')}>
  //   {/* <PDFExample /> */}
  //   <Text style={{padding: 5}}>Pdf</Text>
  // </TouchableOpacity>

  const handleDeleteNote = async stickynoteId => {
    await deleteNote({stickynoteId});
    await readNotes({videoId, limit: 20, offset: 0});
  };

  return (
    <View style={{flex: 1, flexGrow: 1}}>
      {notes.length > 0 ? (
        showAddNote ? (
          <AddNote
            addNote={addNote}
            noteId={noteId}
            setNoteId={setNoteId}
            setShowAddNote={setShowAddNote}
            showAddNote={showAddNote}
            updateNote={updateNote}
            {...props}
          />
        ) : (
          <ScrollView style={{marginBottom: 50}}>
            <View style={styles.addNewNoteContainer}>
              <TouchableOpacity
                style={styles.addNewNoteSubContainer}
                onPress={() => setShowAddNote(true)}>
                <MaterialIcons color={colors.white} name="add" size={20} />
                <Text style={styles.buttonText}>Add New Note</Text>
              </TouchableOpacity>
            </View>
            {notes.map(item => {
              return (
                <RenderNote
                  handleDeleteNote={handleDeleteNote}
                  item={item}
                  noteId={noteId}
                  setNoteId={setNoteId}
                  setShowAddNote={setShowAddNote}
                />
              );
            })}
          </ScrollView>
        )
      ) : (
        <View>
          {showAddNote ? (
            <AddNote
              addNote={addNote}
              noteId={noteId}
              setNoteId={setNoteId}
              setShowAddNote={setShowAddNote}
              updateNote={updateNote}
              {...props}
            />
          ) : (
            <View style={styles.emptyMinContainer}>
              <View style={styles.emptySubContainer}>
                <Text style={styles.emptyText}>Click below button to add new notes</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.buttonContentContainer}
                    onPress={() => setShowAddNote(true)}>
                    <MaterialIcons color="#fff" name="add" size={20} />
                    <Text style={styles.buttonText}>Add New Note</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
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
    marginBottom: 10,
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
    // marginTop: 10,
  },
  paraGraphContainerText: {
    marginVertical: 10,
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
  deleteButton: {
    marginRight: 10,
  },
  mainBottomContainer: {
    alignItems: 'flex-end',
  },
});

export default Notes;
