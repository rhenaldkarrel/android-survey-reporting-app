import React from 'react';
import {
	Box,
	Heading,
	Text,
	Divider,
	HStack,
	Button,
	VStack,
} from 'native-base';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { STATUS_SURVEI } from '../../lib/constants';
import { TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DebiturCard = ({ formPengajuanData }) => {
	const navigation = useNavigation();

	const { _id: formPengajuanId } = formPengajuanData;
	const { _id: formPermohonanId } = formPengajuanData.form_permohonan;
	const { _id: debiturId } = formPengajuanData.user;

	const { alamat, rt, rw, kelurahan, kecamatan, kota, kode_pos } =
		formPengajuanData.alamat_domisili;
	const { koordinat_lokasi } = formPengajuanData.alamat_domisili;

	const RenderButtons = () => {
		switch (formPengajuanData.status) {
			case STATUS_SURVEI.siap_survei:
				return (
					<VStack space='8px'>
						<HStack space='8px'>
							<Button
								variant='outline'
								borderColor='primary.400'
								onPress={() =>
									Linking.openURL(
										`https://wa.me/${formPengajuanData.no_whatsapp}`
									)
								}
							>
								<MaterialIcons name='chat' color='#82c24b' />
							</Button>
							<Button
								onPress={() =>
									navigation.navigate('Informasi Lokasi Debitur', {
										koordinat_lokasi,
									})
								}
								variant='outline'
								borderColor='primary.400'
							>
								<MaterialIcons name='location-pin' color='#82c24b' />
							</Button>
							<Button
								leftIcon={<MaterialIcons name='description' color='#fff' />}
								flex={1}
								borderColor='primary.400'
								onPress={() =>
									navigation.navigate('FormPermohonan', {
										formPermohonanId,
										debiturId,
									})
								}
							>
								Form Permohonan
							</Button>
						</HStack>
						<HStack space='8px'>
							<Button
								leftIcon={<MaterialIcons name='description' color='#fff' />}
								flex={1}
								borderColor='primary.400'
								onPress={() =>
									navigation.navigate('FormSurvei', {
										debiturId,
									})
								}
							>
								Laporan Kumite
							</Button>
							<Button
								leftIcon={<MaterialIcons name='photo' color='#fff' />}
								flex={1}
								borderColor='primary.400'
								onPress={() =>
									navigation.navigate('BuktiDokumen', {
										debiturId,
										formPengajuanId,
										formPermohonanId,
									})
								}
							>
								Bukti Dokumen
							</Button>
						</HStack>
					</VStack>
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
			{RenderButtons()}
		</Box>
	);
};

export default DebiturCard;
