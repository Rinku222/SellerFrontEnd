import React, {useState} from 'react';
import _ from 'lodash';
import {useTranslation} from 'react-i18next';
import {Keyboard, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Divider, Menu, Searchbar, withTheme} from 'react-native-paper';
import {getShadow} from '../../utils';
import {colors} from '../../config/colors';

function SearchDropdown(props: any) {
  const {placeholder, options, searchQuery, selected, onSelect, onChangeText, style} = props;
  const {t} = useTranslation();
  const [isFocused, setFocused] = useState(false);
  //   const showOptions = !Number.isFinite(selected) && isFocused && options?.length > 0;
  const showOptions = !selected && isFocused && options?.length > 0;

  return (
    <>
      <Searchbar
        inputStyle={styles.searchInput}
        placeholder={t(placeholder)}
        style={[styles.searchBar, style]}
        theme={{roundness: 5}}
        value={searchQuery}
        onChangeText={v => {
          onChangeText(v);
          if (!v || (v && selected)) {
            onSelect();
          }
        }}
        onFocus={() => setFocused(true)}
      />
      {showOptions ? (
        <View style={styles.listContainer}>
          <ScrollView
            nestedScrollEnabled
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled">
            {options.map(({label, value}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    Keyboard.dismiss();
                    onChangeText(label);
                    onSelect(value);
                  }}>
                  <Menu.Item title={label} />
                  <Divider />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      ) : null}
    </>
  );
}
SearchDropdown.defaultProps = {
  placeholder: 'label_search',
};
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  listContainer: {
    backgroundColor: colors.white,
    marginTop: 5,
    maxHeight: 200,
    marginHorizontal: 15,
    ...getShadow(2),
  },
  searchBar: {
    backgroundColor: colors.searchBar,
    ...getShadow(0),
  },
  searchInput: {
    fontSize: 17,
  },
});
export default withTheme(SearchDropdown);
