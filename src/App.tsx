import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { RootStackParamList } from "./types/Navigation"

import SplashScreen from './screens/SplashScreen';
import ActivityListScreen from './screens/ActivityListScreen';
import useUserStore from './store/user';
import LoginScreen from './screens/LoginScreen';
import SetCodeScreen from './screens/SetCodeScreen';
import PickUserScreen from './screens/PickUserScreen';
import EnterCodeScreen from './screens/EnterCodeScreen';
import MainScreen from './screens/MainScreen';
import SetStatusScreen from './screens/SetStatusScreen';

import Alert from './components/Alert';
import ScanResult from './screens/ScanResultScreen';


const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const [isLoading, setLoading] = React.useState(true);
  const userStore = useUserStore();

  React.useEffect(() => {
    // AsyncStorage.clear()
    loadUsers();
  }, []);

  const loadUsers = async () => {
    let serializedUsers = (await AsyncStorage.getItem('users')) || '[]';
    let users = JSON.parse(serializedUsers);

    // load users from storage
    userStore.setUsers(users);

    setLoading(false);
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {userStore.currentUser ? (
          <>
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="SetCode" component={SetCodeScreen} />
            <Stack.Screen name="ActivityList" component={ActivityListScreen} />
            <Stack.Screen name="Alert" component={Alert} />
            <Stack.Screen name="SetStatus" component={SetStatusScreen} />
            <Stack.Screen name="ScanResult" component={ScanResult} />
          </>
        ) : (
          <>
            <Stack.Screen name="PickUser" component={PickUserScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="EnterCode" component={EnterCodeScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
