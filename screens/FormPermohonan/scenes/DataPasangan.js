import {
	Button,
	FormControl,
	HStack,
	Input,
	ScrollView,
	Select,
	Text,
	VStack,
} from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { useDataPasangan } from '../../../api/form-permohonan';
import { ToastAndroid } from 'react-native';
import { useState } from 'react';
import _ from 'lodash';

export default function DataPasangan({ debiturId, formPermohonanId }) {
	const { dataPasangan, postDataPasangan } = useDataPasangan(formPermohonanId);
	const [isLoading, setIsLoading] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm({
		values: {
			nama_lengkap: dataPasangan.nama_lengkap,
			no_ktp: dataPasangan.no_ktp,
			tempat_tanggal_lahir: dataPasangan.tempat_tanggal_lahir,
			jenis_kelamin: dataPasangan.jenis_kelamin,
			alamat_ktp: dataPasangan.alamat_ktp?.alamat,
			alamat_ktp_rt: dataPasangan.alamat_ktp?.rt,
			alamat_ktp_rw: dataPasangan.alamat_ktp?.rw,
			alamat_ktp_kota: dataPasangan.alamat_ktp?.kota,
			alamat_ktp_kelurahan: dataPasangan.alamat_ktp?.kelurahan,
			alamat_ktp_kecamatan: dataPasangan.alamat_ktp?.kecamatan,
			alamat_ktp_kode_pos: dataPasangan.alamat_ktp?.kode_pos?.toString(),
			no_hp: dataPasangan.no_hp,
			no_telp: dataPasangan.no_telp,
			pekerjaan: dataPasangan.pekerjaan,
		},
	});

	const onSubmit = async (data) => {
		setIsLoading(true);

		ToastAndroid.show('Mohon tunggu sebentar...', ToastAndroid.SHORT);

		const formattedData = {
			...data,
			alamat_ktp: {
				alamat: data.alamat_ktp,
				rt: data.alamat_ktp_rt,
				rw: data.alamat_ktp_rw,
				kecamatan: data.alamat_ktp_kecamatan,
				kelurahan: data.alamat_ktp_kelurahan,
				kode_pos: Number(data.alamat_ktp_kode_pos),
				kota: data.alamat_ktp_kota,
			},
		};

		const cleanedData = _.omit(formattedData, [
			'alamat_ktp_rt',
			'alamat_ktp_rw',
			'alamat_ktp_kecamatan',
			'alamat_ktp_kelurahan',
			'alamat_ktp_kode_pos',
			'alamat_ktp_kota',
		]);

		try {
			const response = await postDataPasangan(cleanedData);

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
				<Text fontStyle='italic' fontSize='12px' color='gray.500'>
					Isi data pasangan bila ada.
				</Text>
				<FormControl>
					<FormControl.Label>Nama Lengkap (sesuai KTP)</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onBlur={onBlur}
								onChangeText={(val) => onChange(val)}
								value={value}
							/>
						)}
						name='nama_lengkap'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>No. KTP</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onBlur={onBlur}
								onChangeText={(val) => onChange(val)}
								value={value}
								keyboardType='numeric'
							/>
						)}
						name='no_ktp'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Tempat Tanggal Lahir</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onBlur={onBlur}
								onChangeText={(val) => onChange(val)}
								value={value}
								placeholder='Jakarta, 13 Mei 1990'
							/>
						)}
						name='tempat_tanggal_lahir'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Jenis Kelamin</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Select
								placeholder='Jenis Kelamin'
								selectedValue={value}
								onBlur={onBlur}
								onValueChange={(val) => onChange(val)}
							>
								<Select.Item label='Laki-laki' value='laki-laki' />
								<Select.Item label='Perempuan' value='perempuan' />
							</Select>
						)}
						name='jenis_kelamin'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Alamat (sesuai KTP)</FormControl.Label>
					<VStack space='12px'>
						<Controller
							control={control}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input
									onBlur={onBlur}
									onChangeText={(val) => onChange(val)}
									value={value}
									placeholder='Alamat'
								/>
							)}
							name='alamat_ktp'
							defaultValue=''
							shouldUnregister={true}
						/>
						<HStack space='12px'>
							<Controller
								control={control}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										onBlur={onBlur}
										onChangeText={(val) => onChange(val)}
										value={value}
										placeholder='RT'
										keyboardType='numeric'
										flex={1}
									/>
								)}
								name='alamat_ktp_rt'
								defaultValue=''
								shouldUnregister={true}
							/>
							<Controller
								control={control}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										onBlur={onBlur}
										onChangeText={(val) => onChange(val)}
										value={value}
										placeholder='RW'
										keyboardType='numeric'
										flex={1}
									/>
								)}
								name='alamat_ktp_rw'
								defaultValue=''
								shouldUnregister={true}
							/>
							<Controller
								control={control}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										onBlur={onBlur}
										onChangeText={(val) => onChange(val)}
										value={value}
										placeholder='Kode Pos'
										keyboardType='numeric'
										flex={1}
									/>
								)}
								name='alamat_ktp_kode_pos'
								defaultValue=''
								shouldUnregister={true}
							/>
						</HStack>
						<HStack space='12px'>
							<Controller
								control={control}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										onBlur={onBlur}
										onChangeText={(val) => onChange(val)}
										value={value}
										placeholder='Kelurahan'
										flex={1}
									/>
								)}
								name='alamat_ktp_kelurahan'
								defaultValue=''
								shouldUnregister={true}
							/>
							<Controller
								control={control}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										onBlur={onBlur}
										onChangeText={(val) => onChange(val)}
										value={value}
										placeholder='Kecamatan'
										flex={1}
									/>
								)}
								name='alamat_ktp_kecamatan'
								defaultValue=''
								shouldUnregister={true}
							/>
						</HStack>
						<Controller
							control={control}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input
									onBlur={onBlur}
									onChangeText={(val) => onChange(val)}
									value={value}
									placeholder='Kota'
								/>
							)}
							name='alamat_ktp_kota'
							defaultValue=''
							shouldUnregister={true}
						/>
					</VStack>
				</FormControl>
				<FormControl>
					<FormControl.Label>No. HP</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onBlur={onBlur}
								onChangeText={(val) => onChange(val)}
								value={value}
								keyboardType='phone-pad'
							/>
						)}
						name='no_hp'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>No. Telepon</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onBlur={onBlur}
								onChangeText={(val) => onChange(val)}
								value={value}
								keyboardType='phone-pad'
							/>
						)}
						name='no_telp'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Pekerjaan</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Select
								placeholder='Pekerjaan'
								selectedValue={value}
								onBlur={onBlur}
								onValueChange={(val) => onChange(val)}
							>
								<Select.Item label='Karyawan' value='Karyawan' />
								<Select.Item label='Wiraswasta' value='Wiraswasta' />
								<Select.Item label='Profesi' value='Profesi' />
								<Select.Item label='Tidak Bekerja' value='Tidak Bekerja' />
							</Select>
						)}
						name='pekerjaan'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<Button
					bgColor='primary.400'
					isLoading={isLoading}
					onPress={handleSubmit(onSubmit)}
				>
					Simpan Data
				</Button>
			</VStack>
		</ScrollView>
	);
}
