import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Home from '../screens/Home';
import Pengaturan from '../screens/Pengaturan';
import Survei from '../screens/Survei';
import { TouchableOpacity } from 'react-native';

const Tab = createBottomTabNavigator();

const AppRoot = () => {
	return (
		<Tab.Navigator
			screenOptions={() => ({
				tabBarActiveTintColor: '#82c24b',
				headerShown: false,
				tabBarButton: ({ onPress, children }) => (
					<TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
						{children}
					</TouchableOpacity>
				),
			})}
		>
			<Tab.Screen
				name='Home'
				component={Home}
				options={{
					tabBarLabel: 'Home',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name='home' color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name='Survei'
				component={Survei}
				options={{
					tabBarLabel: 'Survei',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name='document' color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name='Pengaturan'
				component={Pengaturan}
				options={{
					tabBarLabel: 'Pengaturan',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name='settings' color={color} size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default AppRoot;
