import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { regionFrom } from '../lib/helpers/regionFrom';
import { Box, Button, HStack, Heading, Text, VStack } from 'native-base';
import { createOpenLink } from 'react-native-open-maps';
import * as Location from 'expo-location';
import { isEmpty } from 'lodash';
import { haversineDistance } from '../lib/helpers/haversineDistance';

export default function Map({ navigation, route }) {
	const { koordinat_lokasi } = route.params;
	const debiturLocation = regionFrom(
		koordinat_lokasi?.latitude,
		koordinat_lokasi?.longitude,
		2
	);

	const map = React.useRef();
	const [myLocation, setMyLocation] = React.useState(null);
	const [message, setMessage] = React.useState('');
	const [isMinimized, setIsMinimized] = React.useState(false);
	const [haversineResult, setHaversineResult] = React.useState(0);

	const isLocationEmpty =
		myLocation?.latitude === 0 || myLocation?.longitude === 0;

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
				const allCoords = [myLocation, debiturLocation];

				setMyLocation(myLocation);
				requestAnimationFrame(() =>
					map.current.fitToCoordinates(allCoords, {
						edgePadding: { top: 40, right: 40, bottom: 40, left: 40 },
						animated: true,
					})
				);
        setIsMinimized(true);
			} catch (err) {
				setMessage(err.message);
			} finally {
				setMessage('');
			}
		})();
	}, []);

	React.useEffect(() => {
		let interval;

		if (!isEmpty(myLocation) && !isEmpty(koordinat_lokasi)) {
			const baseLocation = {
				latitude: myLocation?.latitude,
				longitude: myLocation?.longitude,
			};

			const targetLocation = {
				latitude: koordinat_lokasi?.latitude,
				longitude: koordinat_lokasi?.longitude,
			};

			interval = setInterval(() => {
				const haversineResult = haversineDistance(baseLocation, targetLocation);

				setHaversineResult(haversineResult);
			}, 1000);
		}

		return () => {
			clearInterval(interval);
		};
	}, [myLocation, koordinat_lokasi]);

	const openGoogleMapsNavigation = createOpenLink({
		start: `${myLocation?.latitude}, ${myLocation?.longitude}`,
		end: `${debiturLocation?.latitude}, ${debiturLocation?.longitude}`,
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
					coordinate={debiturLocation}
					title='title'
					description='description'
				/>
			</MapView>
			<Box position='absolute' bottom={0} left={0} right={0} margin={4}>
				<HStack marginBottom={4} space={2}>
					<TouchableOpacity
						onPress={() => navigation.goBack()}
						style={styles.arrowBack}
					>
						<MaterialIcons name='arrow-back' color='#000' size={32} />
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => setIsMinimized(!isMinimized)}
						style={styles.arrowBack}
					>
						<MaterialIcons
							name={isMinimized ? 'maximize' : 'minimize'}
							color='#000'
							size={32}
						/>
					</TouchableOpacity>
				</HStack>
				{!isMinimized && (
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
									? `${myLocation?.latitude ?? 0}, ${
											myLocation?.longitude ?? 0
									  }`
									: message}
							</Text>
						</Box>
						<Box>
							<Heading fontSize={14} fontWeight='normal'>
								Perkiraan Jarak ke Lokasi Debitur
							</Heading>
							<Text Text fontWeight='bold' fontSize={18}>
								{haversineResult.toFixed(2)} meters /{' '}
								{(haversineResult / 1000).toFixed(2)} kilometers
							</Text>
						</Box>
						<Box>
							<Button bg='primary.400' onPress={openGoogleMapsNavigation}>
								Buka Navigasi di Map
							</Button>
						</Box>
					</VStack>
				)}
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
