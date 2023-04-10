import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { regionFrom } from '../lib/helpers/regionFrom';
import { Box, Button, Heading, Text, VStack } from 'native-base';
import { createOpenLink } from 'react-native-open-maps';
import * as Location from 'expo-location';

export default function Map({ navigation }) {
	const [myLocation, setMyLocation] = React.useState({
		latitude: 0,
		longitude: 0,
		latitudeDelta: 2,
		longitudeDelta: 2,
	});
	const [message, setMessage] = React.useState('');
	const map = React.useRef();
	const coordinates2 = regionFrom(-6.11934474821684, 106.956970205967, 2);

	const isLocationEmpty =
		myLocation.latitude === 0 || myLocation.longitude === 0;

	React.useEffect(() => {
		(async () => {
			setMessage('Mengambil lokasi...');
			try {
				let { status } = await Location.requestForegroundPermissionsAsync();

				if (status !== 'granted') {
					throw new Error('Akses tidak diberikan.');
				}

				let location = await Location.getCurrentPositionAsync({});
				const {
					coords: { latitude, longitude },
				} = location;

				const myLocation = regionFrom(latitude, longitude, 2);
				const allCoords = [myLocation, coordinates2];

				setMyLocation(myLocation);
				map.current.fitToCoordinates(allCoords, {
					edgePadding: { top: 40, right: 40, bottom: 40, left: 40 },
					animated: true,
				});
			} catch (err) {
				setMessage(err.message);
			} finally {
				setMessage('');
			}
		})();
	}, []);

	const openGoogleMapsNavigation = createOpenLink({
		start: `${myLocation.latitude}, ${myLocation.longitude}`,
		end: 'SMPN 244 Jakarta',
		provider: 'google',
	});

	return (
		<View style={styles.container}>
			<MapView
				style={styles.map}
				showsUserLocation={true}
				initialRegion={myLocation}
				ref={map}
				followsUserLocation={true}
			>
				<Marker
					coordinate={coordinates2}
					title='title'
					description='description'
				/>
			</MapView>
			<Box position='absolute' bottom={0} left={0} right={0} margin={4}>
				<Box marginBottom={4} display='flex' alignSelf='flex-start'>
					<TouchableOpacity
						onPress={() => navigation.goBack()}
						style={styles.arrowBack}
					>
						<MaterialIcons name='arrow-back' color='#000' size={32} />
					</TouchableOpacity>
				</Box>
				<VStack space={4} bg='white' padding={4} borderRadius={12} shadow={2}>
					<Box>
						<Heading fontSize={18}>Pencocokkan Lokasi</Heading>
					</Box>
					<Box>
						<Heading fontSize={14} fontWeight='normal'>
							Lokasi Anda Sekarang
						</Heading>
						<Text Text fontWeight='bold' fontSize={18}>
							{!isLocationEmpty
								? `${myLocation.latitude}, ${myLocation.longitude}`
								: message}
						</Text>
					</Box>
					<Box>
						<Heading fontSize={14} fontWeight='normal'>
							Lokasi Debitur/Tempat Survei
						</Heading>
						<Text Text fontWeight='bold' fontSize={18}>
							8.123124 meter
						</Text>
					</Box>
					<Box>
						<Heading fontSize={14} fontWeight='normal'>
							Perkiraan Jarak ke Lokasi Debitur
						</Heading>
						<Text Text fontWeight='bold' fontSize={18}>
							8.123124 meter
						</Text>
					</Box>
					<Box>
						<Button bg='primary.400' onPress={openGoogleMapsNavigation}>
							Buka Navigasi di Map
						</Button>
					</Box>
				</VStack>
			</Box>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight,
	},
	map: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	arrowBack: {
		backgroundColor: 'white',
		display: 'flex',
		alignSelf: 'flex-start',
		padding: 8,
		borderRadius: 99,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.18,
		shadowRadius: 1.0,
		elevation: 1,
	},
});
