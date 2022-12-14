import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BottomTabBarProps, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../src/screens/Home';
import Login from '../../src/screens/Login';
import Splash from '../../src/screens/Splash';
import BottomTab from './BottomTab';
import HomeProfile from '../screens/Profile/HomeProfile';
import WishList from '../screens/WishList/WishList';
import CreditEarnedDialog from '../components/CreditEarnedDialog/CreditEarnedDialog';
import About from '../screens/Profile/About';
import PersonalInfo from '../screens/Profile/PersonalInfo';
import EditEmail from '../screens/Profile/EditEmail';
import EditPhone from '../screens/Profile/EditPhone';
import EditPassword from '../screens/Profile/EditPassword';
import UpdateSuccess from '../screens/Profile/UpdateSuccess';
import MyCourses from '../screens/Profile/MyCourses';
import MyCertificates from '../screens/Profile/MyCertificates';
import Quiz from '../screens/Profile/Quiz';
import MainScreen from '../screens/Main';
import VerificationMail from '../screens/Verification/EmailVerification/index';
import {PDFExample} from '../screens/PDF/PDF';
import Forgot from '../screens/ForgotPassword';
import NewPassword from '../screens/NewPassword';
import Search from '../screens/Search';
import Video from '../screens/Video';
import Step1 from '../screens/Cart/Step1';
import Step2 from '../screens/Cart/Step2';
import Failed from '../screens/Transaction/Failed';
import Success from '../screens/Transaction/Success';

const AppContainer = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function AuthScreens() {
  return (
    <AuthStack.Navigator initialRouteName="Splash" screenOptions={{headerShown: false}}>
      {/* <AuthStack.Screen component={Splash} name="Splash" options={{gestureEnabled: false}} /> */}
      <AuthStack.Screen component={Login} name="Login" options={{gestureEnabled: false}} />
      <AuthStack.Screen component={Forgot} name="forgot" options={{gestureEnabled: false}} />
      <AuthStack.Screen
        component={NewPassword}
        name="new-password"
        options={{gestureEnabled: false}}
      />
      <AuthStack.Screen
        component={VerificationMail}
        name="mail_verification"
        options={{gestureEnabled: false}}
      />
    </AuthStack.Navigator>
  );
}

const renderTabBar = (props: BottomTabBarProps) => <BottomTab {...props} />;

function AppScreens() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={renderTabBar}>
      <Tab.Screen component={HomeStackScreens} name="home" />
      <Tab.Screen component={WishListStackScreens} name="wishlist" />
      <Tab.Screen component={SearchListStackScreens} name="search" />
      <Tab.Screen component={ProfileStackScreens} name="profile" />
      <Tab.Screen component={Video} name="video" />
    </Tab.Navigator>
  );
}

function HomeStackScreens() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen component={Home} name="Home" options={{gestureEnabled: false}} />
    </HomeStack.Navigator>
  );
}

function ProfileStackScreens() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen
        component={HomeProfile}
        name="HomeProfile"
        options={{gestureEnabled: false}}
      />
      <HomeStack.Screen
        component={PersonalInfo}
        name="PersonalInfo"
        options={{gestureEnabled: false}}
      />
      <HomeStack.Screen component={About} name="About" options={{gestureEnabled: false}} />
      <HomeStack.Screen component={MyCourses} name="MyCourses" options={{gestureEnabled: false}} />
      <HomeStack.Screen
        component={MyCertificates}
        name="MyCertificates"
        options={{gestureEnabled: false}}
      />
      <HomeStack.Screen
        component={EditEmail}
        name="change_email"
        options={{gestureEnabled: false}}
      />
      <HomeStack.Screen
        component={EditPhone}
        name="change_phone"
        options={{gestureEnabled: false}}
      />
      <HomeStack.Screen
        component={EditPassword}
        name="change_password"
        options={{gestureEnabled: false}}
      />
      <HomeStack.Screen
        component={UpdateSuccess}
        name="update_success"
        options={{gestureEnabled: false}}
      />
      {/* <HomeStack.Screen
        component={VerificationMail}
        name="mail_verification"
        options={{gestureEnabled: false}}
      /> */}
    </HomeStack.Navigator>
  );
}

function WishListStackScreens() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen component={WishList} name="WishList" options={{gestureEnabled: false}} />
    </HomeStack.Navigator>
  );
}

function SearchListStackScreens() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen component={Search} name="SearchList" options={{gestureEnabled: false}} />
    </HomeStack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <AppContainer.Navigator screenOptions={{headerShown: false}}>
        <AppContainer.Screen
          component={AuthScreens}
          name="Auth"
          options={{gestureEnabled: false}}
        />

        <AppContainer.Screen component={AppScreens} name="App" options={{gestureEnabled: false}} />
        <AppContainer.Screen component={MainScreen} name="VideosScreen" />
        <AppContainer.Screen component={PDFExample} name="PDFScreen" />
        <AppContainer.Screen component={Quiz} name="Quiz" />
        <AppContainer.Screen component={Step1} name="Step1" />
        <AppContainer.Screen component={Step2} name="Step2" />
        <AppContainer.Screen component={Failed} name="Transaction_Failed" />
        <AppContainer.Screen component={Success} name="Transaction_Success" />

        {/* <AppContainer.Screen component={Home} name="VideosScreen" /> */}
      </AppContainer.Navigator>
    </NavigationContainer>
  );
}
