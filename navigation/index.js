import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useAuth from '../hooks/useAuth';
import Login from '../screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import AppRoot from './Tabs';
import UbahProfile from '../screens/UbahProfile';
import Map from '../screens/Map';
import FormPermohonan from '../screens/FormPermohonan';
import BuktiDokumen from '../screens/BuktiDokumen';
import LaporanKumite from '../screens/LaporanKumite';

const Stack = createNativeStackNavigator();

export default function AppStack() {
	const { auth } = useAuth();

	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerStyle: {
						backgroundColor: '#82c24b',
					},
				}}
			>
				{!auth.token ? (
					<Stack.Screen
						name='Login'
						component={Login}
						options={{ headerShown: false }}
					/>
				) : (
					<>
						<Stack.Screen
							name='MainApp'
							component={AppRoot}
							options={{ headerShown: false }}
						/>
						<Stack.Screen name='Ubah Informasi Akun' component={UbahProfile} />
						<Stack.Screen
							name='Informasi Lokasi Debitur'
							component={Map}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name='FormPermohonan'
							options={{
								title: 'Pengisian Form Permohonan',
							}}
							component={FormPermohonan}
						/>
						<Stack.Screen
							name='BuktiDokumen'
							options={{
								title: 'Bukti Dokumen',
							}}
							component={BuktiDokumen}
						/>
						<Stack.Screen
							name='LaporanKumite'
							options={{
								title: 'Laporan Kumite',
							}}
							component={LaporanKumite}
						/>
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}
