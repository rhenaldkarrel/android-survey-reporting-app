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
import { useDataPekerjaan } from '../../../api/form-permohonan';

export default function DataPekerjaan({ debiturId, formPermohonanId }) {
	const { dataPekerjaan, postDataPekerjaan } =
		useDataPekerjaan(formPermohonanId);

	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm({
		values: {
			nama_perusahaan_usaha: dataPekerjaan.nama_perusahaan_usaha,
			pekerjaan: dataPekerjaan.pekerjaan,
			alamat: dataPekerjaan.alamat_tempat_bekerja?.alamat,
			rt: dataPekerjaan.alamat_tempat_bekerja?.rt,
			rw: dataPekerjaan.alamat_tempat_bekerja?.rw,
			kota: dataPekerjaan.alamat_tempat_bekerja?.kota,
			kelurahan: dataPekerjaan.alamat_tempat_bekerja?.kelurahan,
			kecamatan: dataPekerjaan.alamat_tempat_bekerja?.kecamatan,
			kode_pos: dataPekerjaan.alamat_tempat_bekerja?.kode_pos?.toString(),
			no_telp: dataPekerjaan.no_telp,
			no_fax: dataPekerjaan.no_fax,
			no_extension: dataPekerjaan.no_extension,
			email: dataPekerjaan.email,
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
								<Select.Item label='Karyawan' value='Karyawan' />
								<Select.Item label='Pegawai Negeri' value='Pegawai Negeri' />
								<Select.Item label='Pegawai Swasta' value='Pegawai Swasta' />
								<Select.Item label='TNI/POLRI/DPR' value='TNI/POLRI/DPR' />
								<Select.Item label='Wiraswasta' value='Wiraswasta' />
								<Select.Item
									label='Pedagang/Pengusaha'
									value='Pedagang/Pengusaha'
								/>
								<Select.Item
									label='Petani/Nelayan/Peternak'
									value='Petani/Nelayan/Peternak'
								/>
								<Select.Item label='Profesi' value='Profesi' />
								<Select.Item label='Dokter' value='Dokter' />
								<Select.Item label='Dosen/Guru' value='Dosen/Guru' />
								<Select.Item label='Wartawan' value='Wartawan' />
								<Select.Item
									label='Hakim/Jaksa/Pengacara'
									value='Hakim/Jaksa/Pengacara'
								/>
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
										keyboardType='numeric'
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
										keyboardType='numeric'
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
										keyboardType='numeric'
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
				<FormControl>
					<FormControl.Label>No. Fax</FormControl.Label>
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
						name='no_fax'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>No. Extension</FormControl.Label>
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
						name='no_extension'
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
								keyboardType='email-address'
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
