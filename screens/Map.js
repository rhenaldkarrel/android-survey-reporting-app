import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { regionFrom } from '../lib/helpers/regionFrom';
import { Box, Button, Heading, Text, VStack } from 'native-base';
import { createOpenLink } from 'react-native-open-maps';

export default function Map({ navigation }) {
	const coordinates = regionFrom(-6.129759815614638, 106.9556811104887, 2);
	const coordinates2 = regionFrom(-6.11934474821684, 106.956970205967, 2);

	const openGoogleMapsNavigation = createOpenLink({
		start: `${coordinates.latitude}, ${coordinates.longitude}`,
		end: 'SMPN 244 Jakarta',
		provider: 'google',
	});

	return (
		<View style={styles.container}>
			<MapView style={styles.map} initialRegion={coordinates}>
				<Marker
					coordinate={coordinates}
					title='title'
					description='description'
				/>
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
							8.123124 meter
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
