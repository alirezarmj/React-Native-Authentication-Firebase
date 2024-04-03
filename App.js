import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { Colors } from "./constants/styles";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { useContext, useEffect, useState } from "react";
import IconButton from "./components/ui/IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerRight: ({ tintColor }) => <IconButton color={tintColor} size={24} icon="exit" onPress={() => authCtx.logout()} /> }} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

const Root = () => {
  const authCtx = useContext(AuthContext);
  const [isAuthenticationReady, setAuthenticationReady] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Preventing auto hide of SplashScreen
        await SplashScreen.preventAutoHideAsync();

        // Fetch token from AsyncStorage
        const storedToken = await AsyncStorage.getItem("token");

        // Authenticate if token exists
        if (storedToken) {
          authCtx.authenticate(storedToken);
        }

        // Indicate that authentication is ready
        setAuthenticationReady(true);
      } catch (error) {
        console.error("Error initializing app:", error);
      } finally {
        // Hide SplashScreen when done
        await SplashScreen.hideAsync();
      }
    };

    initializeApp();
  }, [authCtx]);

  // Show SplashScreen until authentication is ready
  if (!isAuthenticationReady) {
    return null; // or a custom loading indicator
  }
  // useEffect(() => {
  //   const fetchToken = async () => {
  //     const storedToken = await AsyncStorage.getItem("token");
  //     if (storedToken) authCtx.authenticate(storedToken);
  //     SplashScreen.preventAutoHideAsync();
  //   };
  //   fetchToken();
  // }, []);
  return <Navigation />;
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
