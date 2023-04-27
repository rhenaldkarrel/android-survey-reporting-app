import {
	Box,
	Button,
	Center,
	Flex,
	FormControl,
	HStack,
	Heading,
	Image,
	Input,
	Text,
} from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { login } from '../api/auth';
import useAuth from '../hooks/useAuth';
import { ToastAndroid } from 'react-native';
import axios from 'axios';

export default function Login() {
	const { setAuth } = useAuth();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (data) => {
		try {
			const response = await login({
				email: data.email,
				password: data.password,
			});

			const { role } = response.data.data;

			if (role !== 'surveyor') {
				throw new Error('Akun tidak valid! Silahkan coba lagi.');
			}

			setAuth(response.data.data);
		} catch (err) {
			ToastAndroid.show(
				err.response?.data?.message || err.message || err,
				ToastAndroid.SHORT
			);
		}
	};

	return (
		<Center w='100%' h='100%'>
			<Box safeArea>
				<Image
					source={require('../assets/company-logo.png')}
					w={100}
					height={70}
					alt='Logo perusahaan'
				/>
				<Heading
					size='lg'
					fontWeight='600'
					color='coolGray.800'
					_dark={{
						color: 'warmGray.50',
					}}
				>
					Selamat datang
				</Heading>
				<Heading
					mt='1'
					_dark={{
						color: 'warmGray.200',
					}}
					color='coolGray.600'
					fontWeight='medium'
					size='xs'
				>
					Aplikasi pelaporan hasil survei PT. SMART Multi Finance cabang Bekasi
				</Heading>

				<Flex direction='column'>
					<FormControl isRequired isInvalid={'email' in errors}>
						<FormControl.Label>Email</FormControl.Label>
						<Controller
							control={control}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input
									onBlur={onBlur}
									placeholder='johndoe@gmail.com'
									onChangeText={(val) => onChange(val)}
									keyboardType='email-address'
									value={value}
								/>
							)}
							name='email'
							rules={{
								required: 'Nilai tidak boleh kosong!',
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: 'Format email salah!',
								},
							}}
							defaultValue=''
							shouldUnregister={true}
						/>
						<FormControl.ErrorMessage>
							{errors.email?.message}
						</FormControl.ErrorMessage>
					</FormControl>
					<FormControl isRequired isInvalid={'password' in errors}>
						<FormControl.Label>Kata Sandi</FormControl.Label>
						<Controller
							control={control}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input
									onBlur={onBlur}
									placeholder='••••••••'
									onChangeText={(val) => onChange(val)}
									value={value}
									type='password'
								/>
							)}
							name='password'
							rules={{ required: 'Nilai tidak boleh kosong!' }}
							defaultValue=''
							shouldUnregister={true}
						/>
						<FormControl.ErrorMessage>
							{errors.password?.message}
						</FormControl.ErrorMessage>
					</FormControl>
					<Button mt='2' bgColor='primary.400' onPress={handleSubmit(onSubmit)}>
						Masuk
					</Button>
					<HStack mt='6' justifyContent='center'>
						<Text
							fontSize='sm'
							color='coolGray.600'
							_dark={{
								color: 'warmGray.200',
							}}
						>
							Pastikan akun Anda sudah didaftarkan oleh Admin.
						</Text>
					</HStack>
				</Flex>
			</Box>
		</Center>
	);
}
