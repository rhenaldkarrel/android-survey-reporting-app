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

export default function DataPenghasilan({ debiturId }) {
	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm({});

	return (
		<ScrollView
			contentContainerStyle={{ paddingVertical: 32, paddingHorizontal: 16 }}
		>
			<VStack space='12px'>
				<FormControl>
					<FormControl.Label>Joint Income</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Select
								placeholder='Joint Income'
								selectedValue={value}
								onBlur={onBlur}
								onValueChange={(val) => onChange(val)}
							>
								<Select.Item label='Ya' value='true' />
								<Select.Item label='Tidak' value='false' />
							</Select>
						)}
						name='joint_income'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Jabatan/Golongan</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onBlur={onBlur}
								onChangeText={(val) => onChange(val)}
								value={value}
							/>
						)}
						name='jabatan_golongan'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Sumber Penghasilan</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Select
								placeholder='Sumber Penghasilan'
								selectedValue={value}
								onBlur={onBlur}
								onValueChange={(val) => onChange(val)}
							>
								<Select.Item label='Hasil Usaha' value='Hasil Usaha' />
								<Select.Item label='Gaji' value='Gaji' />
								<Select.Item label='Hasil Sewa' value='Hasil Sewa' />
								<Select.Item label='Bunga Deviden' value='Bunga Deviden' />
								<Select.Item label='Orangtua' value='Orangtua' />
							</Select>
						)}
						name='sumber_penghasilan'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Penghasilan Utama Pemohon</FormControl.Label>
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
						name='penghasilan_utama'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>
						Sumber Penerimaan Penghasilan Utama
					</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Select
								placeholder='Penerimaan Penghasilan Utama'
								selectedValue={value}
								onBlur={onBlur}
								onValueChange={(val) => onChange(val)}
							>
								<Select.Item label='Tunai' value='tunai' />
								<Select.Item label='Transfer' value='transfer' />
							</Select>
						)}
						name='sumber_penerimaan_penghasilan_utama'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Penghasilan Pasangan</FormControl.Label>
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
						name='penghasilan_pasangan'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Penghasilan Tambahan</FormControl.Label>
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
						name='penghasilan_tambahan'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Sumber Penghasilan Tambahan</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Select
								placeholder='Sumber Penghasilan Tambahan'
								selectedValue={value}
								onBlur={onBlur}
								onValueChange={(val) => onChange(val)}
							>
								<Select.Item label='Hasil Usaha' value='hasil_usaha' />
								<Select.Item label='Gaji' value='gaji' />
								<Select.Item label='Hasil Sewa' value='hasil_sewa' />
								<Select.Item label='Bunga Deviden' value='bunga_deviden' />
								<Select.Item label='Orangtua' value='orang_tua' />
							</Select>
						)}
						name='sumber_penghasilan_tambahan'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Kisaran Total Penghasilan (Rp)</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Select
								placeholder='Kisaran Total Penghasilan'
								selectedValue={value}
								onBlur={onBlur}
								onValueChange={(val) => onChange(val)}
							>
								<Select.Item label='<= 5.000.000' value='<= 5 juta rupiah' />
								<Select.Item
									label='>= 5.000.000-15.000.000'
									value='>= 5 sampai 15 juta rupiah'
								/>
								<Select.Item
									label='> 15.000.000-25.000.000'
									value='> 15 sampai 25 juta rupiah'
								/>
								<Select.Item label='> 25.000.000' value='> 25 juta rupiah' />
							</Select>
						)}
						name='kisaran_total_penghasilan'
						defaultValue=''
						shouldUnregister={true}
					/>
				</FormControl>
				<Button bgColor='primary.400'>Simpan Data</Button>
			</VStack>
		</ScrollView>
	);
}
