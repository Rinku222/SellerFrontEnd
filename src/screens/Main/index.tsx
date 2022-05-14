import React, {useState} from 'react';
import {View, StyleSheet, Text, ScrollView, TouchableOpacity} from 'react-native';
import Video from 'react-native-video';
import {colors} from '../../config/colors';
import Messages from './Components/Messages/Index';
import Notes from './Components/Notes';
import Reviews from './Components/Reviews';
import TermsAndFAQ from './Components/TermsAndFAQ';
import DocumentsAndVideos from './Components/VideosAndDocuments';

const TABS = [
  {id: 1, name: 'Messages'},
  {id: 2, name: 'Terms & FAQ'},
  {id: 3, name: 'Reviews'},
  {id: 4, name: 'Notes'},
  {id: 5, name: 'Videos and Documents'},
];

function RenderTab(props: any) {
  const {selectedTab} = props;

  switch (selectedTab) {
    case 1:
      return <Messages />;
    case 5:
      return <DocumentsAndVideos />;
    case 3:
      return <Reviews />;
    case 4:
      return <Notes />;
    case 2:
      return <TermsAndFAQ />;
    default:
      return <Text>hello</Text>;
  }
}

function MainScreen() {
  const [selectedTab, setSelectedTab] = useState(5);

  return (
    <View style={styles.container}>
      <View>
        <Video
          controls
          fullscreen
          fullscreenAutorotate
          playInBackground
          source={{
            uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          }}
          style={{width: '100%', height: 250}}
        />
      </View>
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <Text style={{fontWeight: 'bold', fontSize: 16, marginBottom: 15}}>Clinical Learning</Text>
        <View style={{justifyContent: 'space-between', flexDirection: 'row', marginBottom: 10}}>
          <Text style={{fontWeight: 'bold'}}>Credits earned:</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold'}}>500</Text>
            <Text>/1000</Text>
          </View>
        </View>
        <ScrollView horizontal style={{flexDirection: 'row', overflow: 'scroll'}}>
          {TABS.map(item => {
            return (
              <TouchableOpacity key={item.id} onPress={() => setSelectedTab(item.id)}>
                <Text
                  style={{
                    color: selectedTab === item.id ? colors.white : colors.black,
                    backgroundColor:
                      item.id === selectedTab ? colors.themeYellow : colors.backgroundGrey,
                    textAlign: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 10,
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <RenderTab selectedTab={selectedTab} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {padding: 10},
  content: {
    paddingHorizontal: 15,
  },
});

export default MainScreen;
