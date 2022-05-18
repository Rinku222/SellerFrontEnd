import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextInput} from 'react-native-paper';
import {getShadow} from '../../../../config/globalStyles';
import {colors} from '../../../../config/colors';
import ThemeButton from '../../../../components/ThemeButton/ThemeButton';

type BottomIconProps = {
  edit: boolean;
  setEdit: (edit: boolean) => void;
};

type ParaGraphIconProps = {
  edit: boolean;
};

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
          value="hello"
          onChangeText={v => console.log('-------->hello')}
        />
      ) : (
        <Text style={styles.paraGraphContainer}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae provident aspernatur
          unde optio mollitia saepe.
        </Text>
      )}
    </View>
  );
}

function Notes() {
  const [comment, setComment] = useState<string>();
  const [edit, setEdit] = useState(true);

  return (
    <View style={styles.notesContainer}>
      <View style={styles.container}>
        {edit ? (
          <TextInput
            dense
            activeOutlineColor={colors.lightGrey}
            mode="outlined"
            placeholder="Write Title of notes"
            style={styles.input}
            value={comment}
            onChangeText={v => setComment(v)}
          />
        ) : (
          <Text>comment</Text>
        )}
      </View>
      <ParaGraphHeader edit={edit} />
      <BottomIcon edit={edit} setEdit={setEdit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
  },
  input: {
    borderRadius: 5,
    padding: 0,
    backgroundColor: colors.white,
  },
  text: {
    color: colors.black,
  },
  notesContainer: {
    backgroundColor: colors.white,
    ...getShadow(3),
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  icons: {
    marginHorizontal: 5,
  },
  paraGraphContainer: {
    marginTop: 10,
  },
  pagraphTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.whiteShade,
    height: 30,
    borderRadius: 5,
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
