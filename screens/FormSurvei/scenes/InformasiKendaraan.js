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

export default function InformasiKendaraan({ debiturId }) {
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
									value='sedan_jeep_minibus'
								/>
								<Select.Item label='Light Truck' value='light_truck' />
								<Select.Item label='Pick Up' value='pick_up' />
								<Select.Item
									label='Single Cabin/Double Cabin'
									value='single_double_cabin'
								/>
								<Select.Item
									label='Medium & Heavy Duty Truck'
									value='single_heavy_duty_truck'
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
									value='atas_nama_pemohon'
								/>
								<Select.Item
									label='Atas Nama Pasangan'
									value='atas_nama_pasangan'
								/>
								<Select.Item
									label='Atas Nama Orang Lain'
									value='atas_nama_orang_lain'
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
								<Select.Item label='Pribadi' value='pribadi' />
								<Select.Item label='Komersial' value='komersial' />
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
				<Button bgColor='primary.400'>Simpan Data</Button>
			</VStack>
		</ScrollView>
	);
}
