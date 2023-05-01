import {
	Button,
	FormControl,
	Radio,
	ScrollView,
	Text,
	VStack,
} from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { ToastAndroid } from 'react-native';

export default function DataSPK({ debiturId, formSpkId }) {
	const [isLoading, setIsLoading] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm({
		values: {},
	});

	const onSubmit = async (data) => {
		setIsLoading(true);

		ToastAndroid.show('Mohon tunggu sebentar...', ToastAndroid.SHORT);

		try {
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
			contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: 16 }}
		>
			<VStack space='12px'>
				<FormControl>
					<FormControl.Label>Collateral</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Radio.Group
								name='collateral'
								onChange={(val) => onChange(val)}
								value={value}
							>
								<Radio value='3'>
									<Text mx={2}>{'>'} dari nilai pinjaman</Text>
								</Radio>
								<Radio value='2' my='8px'>
									<Text mx={2}>{'='} dari nilai pinjaman</Text>
								</Radio>
								<Radio value='1'>
									<Text mx={2}>{'<'} dari nilai pinjaman</Text>
								</Radio>
							</Radio.Group>
						)}
						name='collateral'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Capacity</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Radio.Group
								name='capacity'
								onChange={(val) => onChange(val)}
								value={value}
							>
								<Radio value='3'>
									<Text mx={2}>{'>'} dari 30% pinjaman</Text>
								</Radio>
								<Radio value='2' my='8px'>
									<Text mx={2}>{'='} dari 30% pinjaman</Text>
								</Radio>
								<Radio value='1'>
									<Text mx={2}>{'<'} dari 30% pinjaman</Text>
								</Radio>
							</Radio.Group>
						)}
						name='capacity'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Condition</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Radio.Group
								name='condition'
								onChange={(val) => onChange(val)}
								value={value}
							>
								<Radio value='3'>
									<Text mx={2}>Barang banyak</Text>
								</Radio>
								<Radio value='2' my='8px'>
									<Text mx={2}>Barang sedang</Text>
								</Radio>
								<Radio value='1'>
									<Text mx={2}>Barang sedikit/tidak banyak</Text>
								</Radio>
							</Radio.Group>
						)}
						name='condition'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Capital</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Radio.Group
								name='capital'
								onChange={(val) => onChange(val)}
								value={value}
							>
								<Radio value='3'>
									<Text mx={2}>{'>'} dari nominal yg dipinjam</Text>
								</Radio>
								<Radio value='2' my='8px'>
									<Text mx={2}>{'='} dari nominal yg dipinjam</Text>
								</Radio>
								<Radio value='1'>
									<Text mx={2}>{'<'} dari nominal yg dipinjam</Text>
								</Radio>
							</Radio.Group>
						)}
						name='capital'
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
