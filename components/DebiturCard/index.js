import React from 'react';
import { Box, Heading, Text, Divider, HStack, Button } from 'native-base';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { STATUS_SURVEI } from '../../lib/constants';
import { TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DebiturCard = ({ formPengajuanData }) => {
	const navigation = useNavigation();

	const { _id } = formPengajuanData;
	const { alamat, rt, rw, kelurahan, kecamatan, kota, kode_pos } =
		formPengajuanData.alamat_domisili;
	const { koordinat_lokasi } = formPengajuanData.alamat_domisili;

	const RenderButtons = () => {
		switch (formPengajuanData.status) {
			case STATUS_SURVEI.siap_survei:
				return (
					<React.Fragment>
						<Button
							leftIcon={<MaterialIcons name='chat' color='#82c24b' />}
							flex={1}
							variant='outline'
							borderColor='primary.400'
							onPress={() =>
								Linking.openURL(
									`https://wa.me/${formPengajuanData.no_whatsapp}`
								)
							}
						>
							Chat
						</Button>
						<Button
							leftIcon={<MaterialIcons name='location-pin' color='#82c24b' />}
							flex={1}
							onPress={() =>
								navigation.navigate('Informasi Lokasi Debitur', {
									koordinat_lokasi,
								})
							}
							variant='outline'
							borderColor='primary.400'
						>
							Lokasi
						</Button>
						<Button
							leftIcon={<MaterialIcons name='description' color='#fff' />}
							flex={1}
							borderColor='primary.400'
							onPress={() =>
								navigation.navigate('FormSurvei', {
									_id,
								})
							}
						>
							Form Survei
						</Button>
					</React.Fragment>
				);
			case STATUS_SURVEI.selesai_survei:
				return (
					<Button
						leftIcon={<MaterialIcons name='description' color='#82c24b' />}
						flex={1}
						variant='outline'
						disabled
					>
						Form Survei Telah Dikirim
					</Button>
				);
		}
	};

	return (
		<Box bg='primaryShade.800' p='6px' borderRadius='8px'>
			<HStack display='flex' justifyContent='space-between'>
				<Box maxWidth='70%'>
					<Heading fontSize='16px' fontWeight='medium'>
						{formPengajuanData.nama_lengkap}
					</Heading>
					<Text>{`${alamat}, RT/RW ${rt}/${rw}, ${kelurahan}, ${kecamatan}, ${kota} ${kode_pos}`}</Text>
				</Box>
				<TouchableOpacity>
					<MaterialIcons
						style={{ padding: 4, borderRadius: 8 }}
						name='edit'
						size={18}
					/>
				</TouchableOpacity>
			</HStack>
			<Divider my='8px' />
			<HStack display='flex' space='8px'>
				{RenderButtons()}
			</HStack>
		</Box>
	);
};

export default DebiturCard;
