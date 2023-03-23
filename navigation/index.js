import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useAuth from '../hooks/useAuth';
import Login from '../screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import AppRoot from './Tabs';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  const { auth } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!auth.token ? (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
        ) : (
          <>
            <Stack.Screen
              name="MainApp"
              component={AppRoot}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}