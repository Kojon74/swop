import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DiscoverScreen from "../screens/Discover/DiscoverScreen";
import ItemDetailsScreen from "../screens/ItemDetails/ItemDetailsScreen";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import MessagesScreen from "../screens/Messages/MessagesScreen";
import ListItemScreen from "../screens/ListItem/ListItemScreen";
import SettingsScreen from "../screens/Settings/SettingsScreen";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";
import SplashScreen from "../screens/Splash/SplashScreen";
import { useGlobalContext } from "../context/GlobalContext";
import AuthScreen from "../screens/Auth/AuthScreen";
import AuthEmailScreen from "../screens/AuthEmail/AuthEmailScreen";
import CameraScreen from "../screens/Camera/CameraScreen";
import ReviewsScreen from "../screens/Reviews/ReviewsScreen";
import SelectScreen from "../screens/Select/SelectScreen";
import MessageChatScreen from "../screens/MessageChat/MessageChatScreen";

const Tab = createBottomTabNavigator();
const MainStack = createNativeStackNavigator();
const DiscoverStack = createNativeStackNavigator();
const MessagesStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
  },
};

const Navigation = () => {
  const { isLoading, isAuthenticated } = useGlobalContext();

  let screens;

  if (isLoading)
    screens = (
      <>
        <MainStack.Screen name="Splash" component={SplashScreen} />
      </>
    );
  else if (!isAuthenticated)
    screens = (
      <>
        <MainStack.Screen name="Auth" component={AuthScreen} />
        <MainStack.Screen name="AuthEmail" component={AuthEmailScreen} />
      </>
    );
  else
    screens = (
      <>
        <MainStack.Screen name="Tabs" component={BottomTabs} />
        <MainStack.Screen name="SellItem" component={ListItemScreen} />
        <MainStack.Screen name="Camera" component={CameraScreen} />
        <MainStack.Screen name="Select" component={SelectScreen} />
        <MainStack.Screen name="MessageChat" component={MessageChatScreen} />
      </>
    );

  return (
    <NavigationContainer theme={Theme}>
      <MainStack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        {screens}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarLabelStyle: fonts.ps,
      }}
    >
      <Tab.Screen
        name="DiscoverStackNav"
        component={DiscoverStackNav}
        options={{
          tabBarLabel: "Discover",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5
              solid
              name="search"
              color={color}
              size={20}
              style={styles.icons}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MessagesStackNav"
        component={MessagesStackNav}
        options={{
          tabBarLabel: "Messages",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5
              solid
              name="comments"
              color={color}
              size={20}
              style={styles.icons}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStackNav"
        component={ProfileStackNav}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5
              solid
              name="user"
              color={color}
              size={20}
              style={styles.icons}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const DiscoverStackNav = () => {
  return (
    <DiscoverStack.Navigator screenOptions={{ headerShown: false }}>
      <DiscoverStack.Screen name="Discover" component={DiscoverScreen} />
      <DiscoverStack.Screen name="ItemDetails" component={ItemDetailsScreen} />
    </DiscoverStack.Navigator>
  );
};

const MessagesStackNav = () => {
  return (
    <MessagesStack.Navigator screenOptions={{ headerShown: false }}>
      <MessagesStack.Screen name="Message" component={MessagesScreen} />
    </MessagesStack.Navigator>
  );
};

const ProfileStackNav = () => {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} />
      <ProfileStack.Screen name="Reviews" component={ReviewsScreen} />
    </ProfileStack.Navigator>
  );
};

export default Navigation;

const styles = StyleSheet.create({ icons: {} });
