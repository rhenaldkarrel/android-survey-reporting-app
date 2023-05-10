import {
	Button,
	FormControl,
	HStack,
	Input,
	Radio,
	ScrollView,
	Select,
	Text,
	VStack,
} from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { useDataStrukturPembiayaan } from '../../../api/form-permohonan';
import { ToastAndroid } from 'react-native';
import { useState } from 'react';

export default function StrukturPembiayaan({ formPermohonanId }) {
	const { dataStrukturPembiayaan, postDataStrukturPembiayaan } =
		useDataStrukturPembiayaan(formPermohonanId);
	const [isLoading, setIsLoading] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm({
		values: {
			harga_kendaraan: dataStrukturPembiayaan.harga_kendaraan?.toString(),
			uang_muka: dataStrukturPembiayaan.uang_muka?.toString(),
			jumlah_pembiayaan: dataStrukturPembiayaan.jumlah_pembiayaan?.toString(),
			suku_bunga_margin: dataStrukturPembiayaan.suku_bunga_margin?.toString(),
			jenis_bunga: dataStrukturPembiayaan.jenis_bunga,
			biaya_administrasi: dataStrukturPembiayaan.biaya_administrasi?.toString(),
			biaya_provinsi: dataStrukturPembiayaan.biaya_provinsi?.toString(),
			biaya_lainnya: dataStrukturPembiayaan.biaya_lainnya,
			nominal_biaya_lainnya:
				dataStrukturPembiayaan.nominal_biaya_lainnya?.toString(),
			angsuran_bulanan: dataStrukturPembiayaan.angsuran_bulanan?.toString(),
			jangka_waktu_pembiayaan: parseInt(
				dataStrukturPembiayaan.jangka_waktu_pembiayaan
			).toString(),
			angsuran_pertama_dibayar: dataStrukturPembiayaan.angsuran_pertama_dibayar,
			tanggal_jatuh_tempo: dataStrukturPembiayaan.tanggal_jatuh_tempo,
			tanggal_mulai: dataStrukturPembiayaan.tanggal_mulai,
			cara_bayar_angsuran: dataStrukturPembiayaan.cara_bayar_angsuran,
		},
	});

	const onSubmit = async (data) => {
		setIsLoading(true);

		ToastAndroid.show('Mohon tunggu sebentar...', ToastAndroid.SHORT);

		const formattedData = {
			...data,
			harga_kendaraan: Number(data.harga_kendaraan),
			uang_muka: Number(data.uang_muka),
			jumlah_pembiayaan: Number(data.jumlah_pembiayaan),
			suku_bunga_margin: Number(data.suku_bunga_margin),
			biaya_administrasi: Number(data.biaya_administrasi),
			biaya_provinsi: Number(data.biaya_provinsi),
			nominal_biaya_lainnya: Number(data.nominal_biaya_lainnya),
			angsuran_bulanan: Number(data.angsuran_bulanan),
			jangka_waktu_pembiayaan: data.jangka_waktu_pembiayaan + ' bulan',
		};

		try {
			const response = await postDataStrukturPembiayaan(formattedData);

			if (response.success) {
				ToastAndroid.show('Berhasil menyimpan data!', ToastAndroid.SHORT);
			} else {
				throw new Error('Terjadi kesalahan ketika menyimpan data!');
			}
		} catch (err) {
			ToastAndroid.show(
				err.response?.data?.message || err.message || err,
				ToastAndroid.SHORT
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<ScrollView
			contentContainerStyle={{ paddingVertical: 32, paddingHorizontal: 16 }}
		>
			<VStack space='12px'>
				<FormControl>
					<FormControl.Label>Harga Kendaraan</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onBlur={onBlur}
								onChangeText={(val) => onChange(val)}
								value={value}
								keyboardType='number-pad'
								InputLeftElement={<Text ml='8px'>Rp</Text>}
							/>
						)}
						name='harga_kendaraan'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Uang Muka</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onBlur={onBlur}
								onChangeText={(val) => onChange(val)}
								value={value}
								keyboardType='number-pad'
								InputLeftElement={<Text ml='8px'>Rp</Text>}
							/>
						)}
						name='uang_muka'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Jumlah Pembiayaan</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onBlur={onBlur}
								onChangeText={(val) => onChange(val)}
								value={value}
								keyboardType='number-pad'
								InputLeftElement={<Text ml='8px'>Rp</Text>}
							/>
						)}
						name='jumlah_pembiayaan'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Suku Bunga/Margin</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onBlur={onBlur}
								onChangeText={(val) => onChange(val)}
								value={value}
								keyboardType='number-pad'
								InputRightElement={<Text mr='8px'>% per thn</Text>}
							/>
						)}
						name='suku_bunga_margin'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Jenis Bunga</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Select
								placeholder='Jenis Bunga'
								selectedValue={value}
								onBlur={onBlur}
								onValueChange={(val) => onChange(val)}
							>
								<Select.Item label='Efektif' value='Efektif' />
								<Select.Item label='Flat' value='Flat' />
							</Select>
						)}
						name='jenis_bunga'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Biaya Administrasi</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onBlur={onBlur}
								onChangeText={(val) => onChange(val)}
								value={value}
								keyboardType='number-pad'
								InputLeftElement={<Text ml='8px'>Rp</Text>}
							/>
						)}
						name='biaya_administrasi'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Biaya Provinsi</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onBlur={onBlur}
								onChangeText={(val) => onChange(val)}
								value={value}
								keyboardType='number-pad'
								InputLeftElement={<Text ml='8px'>Rp</Text>}
							/>
						)}
						name='biaya_provinsi'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Biaya Lainnya</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Select
								placeholder='Biaya Lainnya'
								selectedValue={value}
								onBlur={onBlur}
								onValueChange={(val) => onChange(val)}
							>
								<Select.Item label='BBN/Pajak/STNK' value='BBN/Pajak/STNK' />
								<Select.Item
									label='Pelunasan Kontrak'
									value='Pelunasan Kontrak'
								/>
								<Select.Item label='Lainnya' value='Lainnya' />
							</Select>
						)}
						name='biaya_lainnya'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Nominal Biaya Lainnya</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onBlur={onBlur}
								onChangeText={(val) => onChange(val)}
								value={value}
								keyboardType='number-pad'
								InputLeftElement={<Text ml='8px'>Rp</Text>}
							/>
						)}
						name='nominal_biaya_lainnya'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Angsuran Bulanan</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onBlur={onBlur}
								onChangeText={(val) => onChange(val)}
								value={value}
								keyboardType='number-pad'
								InputLeftElement={<Text ml='8px'>Rp</Text>}
							/>
						)}
						name='angsuran_bulanan'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Jangka Waktu Pembiayaan</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onBlur={onBlur}
								onChangeText={(val) => onChange(val)}
								value={value}
								keyboardType='number-pad'
								InputRightElement={<Text mr='8px'>bulan</Text>}
							/>
						)}
						name='jangka_waktu_pembiayaan'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<Controller
						control={control}
						render={({ field: { onChange, value } }) => (
							<Radio.Group
								name='angsuran_pertama_dibayar'
								onChange={(val) => onChange(val)}
								value={value}
							>
								<Radio value='Dimuka' my='4px'>
									<Text mx={2}>Angsuran Pertama Dibayar Dimuka</Text>
								</Radio>
								<Radio value='Dibelakang'>
									<Text mx={2}>Angsuran Pertama Dibayar Dibelakang</Text>
								</Radio>
							</Radio.Group>
						)}
						name='angsuran_pertama_dibayar'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Tanggal Jatuh Tempo</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onBlur={onBlur}
								onChangeText={(val) => onChange(val)}
								value={value}
								placeholder='1 Mei 2023'
							/>
						)}
						name='tanggal_jatuh_tempo'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Tanggal Mulai</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onBlur={onBlur}
								onChangeText={(val) => onChange(val)}
								value={value}
								placeholder='1 Mei 2023'
							/>
						)}
						name='tanggal_mulai'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Cara Bayar Angsuran</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Select
								placeholder='Cara Bayar Angsuran'
								selectedValue={value}
								onBlur={onBlur}
								onValueChange={(val) => onChange(val)}
							>
								<Select.Item label='Tunai' value='Tunai' />
								<Select.Item label='Transfer' value='Transfer' />
								<Select.Item label='Giro' value='Giro' />
							</Select>
						)}
						name='cara_bayar_angsuran'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Kondisi Lain (bila ada)</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onBlur={onBlur}
								onChangeText={(val) => onChange(val)}
								value={value}
							/>
						)}
						name='kondisi_lain'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<Button
					bgColor='primary.400'
					onPress={handleSubmit(onSubmit)}
					isLoading={isLoading}
				>
					Simpan Data
				</Button>
			</VStack>
		</ScrollView>
	);
}
