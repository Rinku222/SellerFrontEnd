import {StyleSheet} from 'react-native';
import {colors} from '../../config/colors';
import {fontSizes} from '../../config/globalStyles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: colors.themeLightGray,
    // backgroundColor: 'red',
    paddingHorizontal: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 60,
  },
  hugeText: {
    fontSize: fontSizes.huge,
    fontWeight: 'bold',
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 16,
  },
});
