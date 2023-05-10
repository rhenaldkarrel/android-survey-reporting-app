import {
	Button,
	FormControl,
	Input,
	ScrollView,
	Select,
	Text,
	VStack,
} from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { useDataKendaraan } from '../../../api/form-permohonan';
import { useState } from 'react';
import { ToastAndroid } from 'react-native';

export default function InformasiKendaraan({ formPermohonanId }) {
	const { dataKendaraan, postDataKendaraan } =
		useDataKendaraan(formPermohonanId);
	const [isLoading, setIsLoading] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm({
		values: {
			jenis_kendaraan: dataKendaraan.jenis_kendaraan,
			merk_tipe: dataKendaraan.merk_tipe,
			atas_nama_bpkb: dataKendaraan.atas_nama_bpkb,
			tahun_pembuatan: dataKendaraan.tahun_pembuatan,
			bukti_kepemilikan: dataKendaraan.bukti_kepemilikan,
			nama_di_bpkb: dataKendaraan.nama_di_bpkb,
			alamat_di_bpkb: dataKendaraan.alamat_di_bpkb,
			no_polisi: dataKendaraan.no_polisi,
			pemakaian: dataKendaraan.pemakaian,
			lokasi_kendaraan: dataKendaraan.lokasi_kendaraan,
		},
	});

	const onSubmit = async (data) => {
		setIsLoading(true);

		ToastAndroid.show('Mohon tunggu sebentar...', ToastAndroid.SHORT);

		try {
			const response = await postDataKendaraan(data);

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
					<FormControl.Label>Jenis Kendaraan</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Select
								placeholder='Jenis Kendaraan'
								selectedValue={value}
								onBlur={onBlur}
								onValueChange={(val) => onChange(val)}
							>
								<Select.Item
									label='Sedan/Jeep/Minibus'
									value='Sedan/Jeep/Minibus'
								/>
								<Select.Item label='Light Truck' value='Light Truck' />
								<Select.Item label='Pick Up' value='Pick Up' />
								<Select.Item
									label='Single Cabin/Double Cabin'
									value='Single Cabin/Double Cabin'
								/>
								<Select.Item
									label='Medium & Heavy Duty Truck'
									value='Medium & Heavy Duty Truck'
								/>
							</Select>
						)}
						name='jenis_kendaraan'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Merk/Type</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onBlur={onBlur}
								onChangeText={(val) => onChange(val)}
								value={value}
							/>
						)}
						name='merk_tipe'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Tahun Pembuatan</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onBlur={onBlur}
								onChangeText={(val) => onChange(val)}
								value={value}
								keyboardType='number-pad'
							/>
						)}
						name='tahun_pembuatan'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>BPKB Atas Nama</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Select
								placeholder='Jenis Kendaraan'
								selectedValue={value}
								onBlur={onBlur}
								onValueChange={(val) => onChange(val)}
							>
								<Select.Item
									label='Atas Nama Pemohon'
									value='Atas Nama Pemohon'
								/>
								<Select.Item
									label='Atas Nama Pasangan'
									value='Atas Nama Pasangan'
								/>
								<Select.Item
									label='Atas Nama Orang Lain'
									value='Atas Nama Orang Lain'
								/>
							</Select>
						)}
						name='atas_nama_bpkb'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Bukti Kepemilikan</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onBlur={onBlur}
								onChangeText={(val) => onChange(val)}
								value={value}
							/>
						)}
						name='bukti_kepemilikan'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Nama di BPKB</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onBlur={onBlur}
								onChangeText={(val) => onChange(val)}
								value={value}
							/>
						)}
						name='nama_di_bpkb'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Alamat di BPKB</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onBlur={onBlur}
								onChangeText={(val) => onChange(val)}
								value={value}
							/>
						)}
						name='alamat_di_bpkb'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>No. Polisi</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onBlur={onBlur}
								onChangeText={(val) => onChange(val)}
								value={value}
							/>
						)}
						name='no_polisi'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Pemakaian Kendaraan Untuk</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Select
								placeholder='Pemakaian Kendaraan Untuk'
								selectedValue={value}
								onBlur={onBlur}
								onValueChange={(val) => onChange(val)}
							>
								<Select.Item label='Pribadi' value='Pribadi' />
								<Select.Item label='Komersial' value='Komersial' />
							</Select>
						)}
						name='pemakaian'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Lokasi Kendaraan</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onBlur={onBlur}
								onChangeText={(val) => onChange(val)}
								value={value}
							/>
						)}
						name='lokasi_kendaraan'
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
