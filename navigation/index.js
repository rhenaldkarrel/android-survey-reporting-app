import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useAuth from '../hooks/useAuth';
import Login from '../screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import AppRoot from './Tabs';
import UbahProfile from '../screens/UbahProfile';
import Map from '../screens/Map';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  const { auth } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ 
        headerStyle: {
          backgroundColor: '#82c24b',
        },
      }}>
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
            <Stack.Screen name="Ubah Informasi Akun" component={UbahProfile} />
            <Stack.Screen name="Informasi Lokasi Debitur" component={Map} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}