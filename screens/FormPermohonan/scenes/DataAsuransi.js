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
import { useDataAsuransi } from '../../../api/form-permohonan';
import { useState } from 'react';
import { ToastAndroid } from 'react-native';

export default function DataAsuransi({ debiturId, formPermohonanId }) {
	const { dataAsuransi, postDataAsuransi } = useDataAsuransi(formPermohonanId);
	const [isLoading, setIsLoading] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm({
		values: {
			jenis_asuransi: dataAsuransi.jenis_asuransi,
			nilai_pertanggungan: dataAsuransi.nilai_pertanggungan?.toString(),
			premi_dibayar_secara: dataAsuransi.premi_dibayar_secara,
			nominal_premi_dibayar: dataAsuransi.nominal_premi_dibayar?.toString(),
			periode_premi_dibayar: dataAsuransi.periode_premi_dibayar?.toString(),
			jaminan_tambahan: dataAsuransi.jaminan_tambahan,
		},
	});

	const onSubmit = async (data) => {
		setIsLoading(true);

		ToastAndroid.show('Mohon tunggu sebentar...', ToastAndroid.SHORT);

		const formattedData = {
			...data,
			nilai_pertanggungan: Number(data.nilai_pertanggungan),
			nominal_premi_dibayar: Number(data.nominal_premi_dibayar),
			periode_premi_dibayar: Number(data.periode_premi_dibayar),
		};

		try {
			const response = await postDataAsuransi(formattedData);

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
					<FormControl.Label>Jenis Asuransi</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Select
								placeholder='Jenis Asuransi'
								selectedValue={value}
								onBlur={onBlur}
								onValueChange={(val) => onChange(val)}
							>
								<Select.Item
									label='Total Loss Only (TLO)'
									value='Total Loss Only (TLO)'
								/>
								<Select.Item label='All Risk' value='All Risk' />
							</Select>
						)}
						name='jenis_asuransi'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Nilai Pertanggungan</FormControl.Label>
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
						name='nilai_pertanggungan'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Premi Dibayar Secara</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Select
								placeholder='Premi Dibayar Secara'
								selectedValue={value}
								onBlur={onBlur}
								onValueChange={(val) => onChange(val)}
							>
								<Select.Item label='Tunai' value='Tunai' />
								<Select.Item label='Angsuran' value='Angsuran' />
							</Select>
						)}
						name='premi_dibayar_secara'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Nominal Premi Dibayar</FormControl.Label>
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
						name='nominal_premi_dibayar'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Periode Premi Dibayar</FormControl.Label>
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
						name='periode_premi_dibayar'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Jaminan Tambahan</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onBlur={onBlur}
								onChangeText={(val) => onChange(val)}
								value={value}
							/>
						)}
						name='jaminan_tambahan'
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
