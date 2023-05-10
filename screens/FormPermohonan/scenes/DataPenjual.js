import {
	Button,
	FormControl,
	HStack,
	Input,
	ScrollView,
	VStack,
} from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { useDataPenjual } from '../../../api/form-permohonan';
import { useState } from 'react';
import { ToastAndroid } from 'react-native';
import _ from 'lodash';

export default function DataPenjual({ formPermohonanId }) {
	const { dataPenjual, postDataPenjual } = useDataPenjual(formPermohonanId);
	const [isLoading, setIsLoading] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm({
		values: {
			nama_penjual_supplier_developer:
				dataPenjual.nama_penjual_supplier_developer,
			alamat: dataPenjual.alamat?.alamat,
			rt: dataPenjual.alamat?.rt,
			rw: dataPenjual.alamat?.rw,
			kelurahan: dataPenjual.alamat?.kelurahan,
			kecamatan: dataPenjual.alamat?.kecamatan,
			kota: dataPenjual.alamat?.kota,
			kode_pos: dataPenjual.alamat?.kode_pos?.toString(),
			no_telp: dataPenjual.no_telp,
		},
	});

	const onSubmit = async (data) => {
		setIsLoading(true);

		ToastAndroid.show('Mohon tunggu sebentar...', ToastAndroid.SHORT);

		const formattedData = {
			...data,
			alamat: {
				alamat: data.alamat,
				rt: data.rt,
				rw: data.rw,
				kecamatan: data.kecamatan,
				kelurahan: data.kelurahan,
				kode_pos: Number(data.kode_pos),
				kota: data.kota,
			},
		};

		const cleanedData = _.omit(formattedData, [
			'rt',
			'rw',
			'kecamatan',
			'kelurahan',
			'kode_pos',
			'kota',
		]);

		try {
			const response = await postDataPenjual(cleanedData);

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
					<FormControl.Label>Nama Penjual/Supplier/Developer</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onBlur={onBlur}
								onChangeText={(val) => onChange(val)}
								value={value}
							/>
						)}
						name='nama_penjual_supplier_developer'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Alamat</FormControl.Label>
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
							name='alamat'
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
										flex={1}
									/>
								)}
								name='rt'
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
										flex={1}
									/>
								)}
								name='rw'
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
										flex={1}
									/>
								)}
								name='kode_pos'
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
								name='kelurahan'
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
								name='kecamatan'
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
							name='kota'
							defaultValue=''
							shouldUnregister={true}
						/>
					</VStack>
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
