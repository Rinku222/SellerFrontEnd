import {StyleSheet} from 'react-native';
import {colors} from '../../config/colors';
import {fontSizes} from '../../config/globalStyles';
import {getShadow} from '../../utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: colors.themeLightGray,
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
  ongoingCourses: {
    marginHorizontal: 5,
  },
  cardContainer: {
    height: 75,
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 5,
    ...getShadow(6),
  },
});
