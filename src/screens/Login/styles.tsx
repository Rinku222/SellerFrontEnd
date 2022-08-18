import {StyleSheet} from 'react-native';
import {colors} from '../../config/colors';
import {fontSizes} from '../../config/globalStyles';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.white,
    justifyContent: 'space-around',
    position: 'relative',
  },
  upperBody: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainBody: {
    backgroundColor: colors.themeLightGray,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 5,
  },
  headerLabelText: {
    fontSize: fontSizes.huge,
    color: colors.themeDarkBlackText,
    marginBottom: 24,
  },
  headerLabelTextSignUp: {
    fontSize: fontSizes.huge,
    color: colors.themeDarkBlackText,
    marginBottom: 18,
  },
  socialIcon: {
    height: 52,
    width: 52,
    borderRadius: 52,
    backgroundColor: colors.white,

    shadowColor: colors.themeShadow,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    // elevation: 5,
  },
  verifyContainer: {
    marginTop: 30,
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
  },

  // renderVerification

  verificationContainer: {
    marginTop: 50,
    flex: 1,
  },
  emailText: {
    width: 265,
    height: 100,
    top: 15,
    fontSize: 18,
    textAlign: 'center',
  },
  inputContainer: {
    width: 300,
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingRight: 2,
  },
  inputText: {
    fontSize: 20,
    color: colors.black,
    padding: 0,
    textAlign: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  inputTextContainer: {
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 0.5,
  },
  button: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: 'red',
  },
  renderLoginTextBox: {
    marginBottom: 26,
  },
  renderLoginButton: {
    marginBottom: 25,
    alignSelf: 'center',
  },
  signUp: {
    alignSelf: 'center',
    marginTop: 24,
  },
  forgot: {
    alignSelf: 'center',
    paddingBottom: 10,
  },
  incorrectContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  incorrectContainerText: {
    color: 'red',
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  bottomText: {
    marginTop: 12,
  },
  signUpButton: {
    marginBottom: 20,
    alignSelf: 'center',
    marginTop: 12,
  },
  loginContainer: {
    alignSelf: 'center',
    marginTop: 16,
  },
  finalBottomDrawer: {
    marginBottom: 25,
  },
});
