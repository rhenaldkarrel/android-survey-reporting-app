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

export default function DataPekerjaan({ debiturId }) {
	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm({
		defaultValues: {
			email: '',
			name: '',
			password: '',
			confirmPassword: '',
		},
	});

	return (
		<ScrollView
			contentContainerStyle={{ paddingVertical: 32, paddingHorizontal: 16 }}
		>
			<VStack space='12px'>
				<FormControl>
					<FormControl.Label>Nama Perusahaan/Usaha</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onBlur={onBlur}
								onChangeText={(val) => onChange(val)}
								value={value}
							/>
						)}
						name='nama_perusahaan_usaha'
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
								<Select.Item label='Karyawan' value='karyawan' />
								<Select.Item label='Pegawai Negeri' value='pegawai_negeri' />
								<Select.Item label='Pegawai Swasta' value='pegawai_swasta' />
								<Select.Item label='TNI/POLRI/DPR' value='tni_polri_dpr' />
								<Select.Item label='Wiraswasta' value='wiraswasta' />
								<Select.Item label='Pedagang/Pengusaha' value='pedagang_pengusaha' />
								<Select.Item label='Petani/Nelayan/Peternak' value='petani_nelayan_peternak' />
								<Select.Item label='Profesi' value='profesi' />
								<Select.Item label='Dokter' value='dokter' />
								<Select.Item label='Dosen/Guru' value='dosen_guru' />
								<Select.Item label='Wartawan' value='wartawan' />
								<Select.Item label='Hakim/Jaksa/Pengacara' value='hakim_jaksa_pengacara' />
							</Select>
						)}
						name='pekerjaan'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Alamat Tempat Bekerja</FormControl.Label>
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
							/>
						)}
						name='no_telp'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>No. Fax</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onBlur={onBlur}
								onChangeText={(val) => onChange(val)}
								value={value}
							/>
						)}
						name='no_fax'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Email (Pribadi/Perusahaan)</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onBlur={onBlur}
								onChangeText={(val) => onChange(val)}
								value={value}
							/>
						)}
						name='email'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<Button bgColor='primary.400'>Simpan Data</Button>
			</VStack>
		</ScrollView>
	);
}
