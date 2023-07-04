import React from 'react';
import {
	Box,
	Heading,
	Text,
	Divider,
	HStack,
	Button,
	VStack,
	useDisclose,
	Actionsheet,
} from 'native-base';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { STATUS_SURVEI } from '../../lib/constants';
import { TouchableOpacity, Linking, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AlertAsync from 'react-native-alert-async';
import { useDataPermohonan } from '../../api/form-permohonan';

const DebiturCard = ({ formPengajuanData, onRefresh }) => {
	const navigation = useNavigation();
	const { isOpen, onOpen, onClose } = useDisclose();

	const { _id: formPengajuanId } = formPengajuanData;
	const { _id: laporanKumiteId } = formPengajuanData.laporan_kumite;
	const { _id: formPermohonanId } = formPengajuanData.form_permohonan;
	const { _id: buktiDokumenId } = formPengajuanData.bukti_dokumen;
	const { _id: formSpkId } = formPengajuanData.form_spk;

	const { updateStatus } = useDataPermohonan();

	const { alamat, rt, rw, kelurahan, kecamatan, kota, kode_pos } =
		formPengajuanData.alamat_domisili;
	const { koordinat_lokasi } = formPengajuanData.alamat_domisili;

	const handleKirim = async () => {
		const choice = await AlertAsync(
			'Apakah pengisian data sudah lengkap?',
			'Anda masih dapat mengubah data apabila masih ada perubahan.',
			[
        { text: 'Batal', onPress: () => Promise.resolve('no') },
				{ text: 'Ya, Kirim', onPress: () => 'yes' },
			],
			{
				cancelable: true,
				onDismiss: () => 'no',
			}
		);

		if (choice === 'yes') {
			try {
        const res = await updateStatus(formPermohonanId, formPengajuanId, 'selesai_survei');

				ToastAndroid.show(res.message, ToastAndroid.SHORT);

        onClose();

        onRefresh();
			} catch (err) {
				ToastAndroid.show(err, ToastAndroid.SHORT);
			}
		}
	};

	const RenderButtons = () => {
		switch (formPengajuanData.status) {
			case STATUS_SURVEI.siap_survei:
			case STATUS_SURVEI.selesai_survei:
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
										formSpkId,
									})
								}
							>
								Form Kelengkapan Data
							</Button>
						</HStack>
						<HStack space='8px'>
							<Button
								leftIcon={<MaterialIcons name='description' color='#fff' />}
								flex={1}
								borderColor='primary.400'
								onPress={() =>
									navigation.navigate('LaporanKumite', {
										laporanKumiteId,
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
										formPengajuanId,
										formPermohonanId,
										buktiDokumenId,
									})
								}
							>
								Bukti Dokumen
							</Button>
						</HStack>
						{formPengajuanData.status === STATUS_SURVEI.selesai_survei && (
							<Button
								leftIcon={<MaterialIcons name='description' color='#82c24b' />}
								flex={1}
								variant='outline'
								disabled
							>
								Form Survei Telah Dikirim
							</Button>
						)}
					</VStack>
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
					<MaterialCommunityIcons
						style={{ padding: 4, borderRadius: 8 }}
						name='dots-vertical'
						size={18}
						onPress={onOpen}
					/>
				</TouchableOpacity>
			</HStack>
			<Divider my='8px' />
			{RenderButtons()}
			<Actionsheet isOpen={isOpen} onClose={onClose}>
				<Actionsheet.Content>
					<Actionsheet.Item onPress={() => handleKirim()}>
						Kirim
					</Actionsheet.Item>
				</Actionsheet.Content>
			</Actionsheet>
		</Box>
	);
};

export default DebiturCard;
