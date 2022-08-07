import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {IconProps} from 'react-native-vector-icons/Icon';
import {colors} from '../config/colors';

const ICONS = {
  home: (props?: Partial<IconProps>) => <Feather {...props} name="home" size={30} />,
  search: (props?: Partial<IconProps>) => <MaterialIcons {...props} name="search" size={30} />,
  wishlist: (props?: Partial<IconProps>) => (
    <MaterialCommunityIcons {...props} name="cards-heart-outline" size={30} />
  ),
  profile: (props?: Partial<IconProps>) => <AntDesign {...props} name="user" size={30} />,
};

function BottomTab({state, descriptors, navigation}) {
  const tabItems = state.routes
    .filter(i => i.name !== 'video')
    .map((route, index) => {
      const {options} = descriptors[route.key];

      const {name} = route;

      const isFocused = state.index === index;

      const onPress = () => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate({name: route.name, merge: true});
        }
      };

      const onLongPress = () => {
        navigation.emit({
          type: 'tabLongPress',
          target: route.key,
        });
      };

      return (
        <TouchableOpacity
          accessibilityLabel={options.tabBarAccessibilityLabel}
          accessibilityRole="button"
          accessibilityState={isFocused ? {selected: true} : {}}
          key={route.name}
          style={styles.tabItemsContainer}
          testID={options.tabBarTestID}
          onLongPress={onLongPress}
          onPress={onPress}>
          <View
            style={[
              styles.tabItemsIcons,
              {backgroundColor: isFocused ? colors.primary : 'transparent'},
            ]}>
            {ICONS[name as keyof typeof ICONS]({color: isFocused ? colors.white : colors.primary})}
          </View>
        </TouchableOpacity>
      );
    });

  const floatingTab = (
    <TouchableOpacity
      key="key"
      style={styles.floatingTabContainer}
      onPress={() => navigation.navigate('video')}>
      <View style={styles.floatingTabIcon}>
        <Ionicons color={colors.white} name="ios-play" size={30} />
      </View>
    </TouchableOpacity>
  );

  tabItems.splice(2, 0, floatingTab);

  return (
    <View style={styles.container}>
      <View style={styles.tabItems}>{tabItems}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 4,
    borderTopWidth: 0,
    shadowOpacity: 0.4,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  tabItems: {
    flexDirection: 'row',
    paddingVertical: 20,
  },
  floatingTabContainer: {
    marginTop: -35,
  },
  floatingTabIcon: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 50,
  },
  tabItemsContainer: {
    flex: 1,
    alignItems: 'center',
  },
  tabItemsIcons: {
    borderRadius: 50,
    padding: 5,
  },
});

export default BottomTab;
