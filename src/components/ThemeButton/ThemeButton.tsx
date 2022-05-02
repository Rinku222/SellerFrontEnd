import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Subheading, Button} from 'react-native-paper';
import {colors} from '../../config/colors';

function ThemeButton(props) {
  const {title, onPress, style} = props;

  return (
    <Button color={colors.white} style={styles.button} uppercase={false} onPress={onPress}>
      {title}
    </Button>
    // <Button color={colors.themeYellow} style={style} title={title} onPress={onPress} />
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.themeYellow,
    borderRadius: 5,
    textTransform: 'capitalize',
  },
});

export default ThemeButton;
