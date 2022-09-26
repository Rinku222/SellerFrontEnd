import React, {useEffect, useState} from 'react';

import {View, StyleSheet, Image, ScrollView, Text, TouchableOpacity} from 'react-native';
import {ActivityIndicator, Divider, TextInput} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {colors} from '../../../../config/colors';
import UserImage from '../../../../assets/images/laps.png';
import ReviewsList from '../../../../components/Review';
import {LockIcon, SendIcon} from '../../../../assets/svg';
import Message from '../../../../components/Message';
import useMainScreenActions from '../../../../redux/actions/mainScreenActions';

function RightIcon(onSubmit) {
  return (
    <TouchableOpacity onPress={onSubmit}>
      <SendIcon />
    </TouchableOpacity>
  );
}

function Messages(props: any) {
  const {courseBought, courseId} = props;
  const [message, setMessage] = useState('');

  const [loader, setLoader] = useState(false);
  const [offSet, setOffset] = useState(0);

  const {messages = [], count = 0} = useSelector(s => s.main.messages);

  const {readMessages, addMessage} = useMainScreenActions();

  useEffect(() => {
    console.log('----->inside useeffect');
  }, []);

  const onSubmit = async () => {
    await addMessage({courseId, message});
    await readMessages({courseId, offSet: 0});
    setOffset(0);
    setMessage('');
  };

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 1;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      onScroll={async ({nativeEvent}) => {
        if (isCloseToBottom(nativeEvent) && !loader && offSet + 10 < count) {
          setLoader(true);
          await readMessages({courseId, offSet: offSet + 10});
          setLoader(false);
          setOffset(offSet + 10);
        }
      }}>
      {courseBought ? (
        <View>
          <View style={styles.imageContainer}>
            <Image source={UserImage} style={styles.image} />
            <View style={{flex: 1}}>
              <TextInput
                dense
                multiline
                activeOutlineColor={colors.black}
                activeUnderlineColor="transparent"
                mode="outlined"
                numberOfLines={3}
                outlineColor={colors.black}
                placeholder="Message"
                // secureTextEntry={newPassword}
                right={
                  <TextInput.Icon
                    name={() => RightIcon(onSubmit)}
                    // onPress={onSubmit}
                    // onPress={() => console.log('----->icon pressed')}
                  />
                }
                style={styles.input}
                value={message}
                onChangeText={v => setMessage(v)}
              />
            </View>
          </View>
          <Divider style={styles.divider} />
        </View>
      ) : null}

      {messages?.map((item, index) => {
        return (
          <View key={index}>
            <Message data={item} />
          </View>
        );
      })}
      {loader ? (
        <View style={{marginVertical: 10}}>
          <ActivityIndicator animating color={colors.primary} size="small" />
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: 5,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
  },
  input: {
    margin: 12,
    flexGrow: 1,
    padding: 0,
    borderRadius: 5,
    // height: 50,
    // backgroundColor: colors.white,
  },
  divider: {
    height: 3,
    backgroundColor: colors.themeBlack,
    marginVertical: 10,
  },
});

export default Messages;
