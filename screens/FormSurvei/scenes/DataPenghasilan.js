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
								<Select.Item label='Ya' value='ya' />
								<Select.Item label='Tidak' value='tidak' />
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
								placeholder='Premi Dibayar Secara'
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
					<FormControl.Label>Penerimaan Penghasilan Utama</FormControl.Label>
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
								<Select.Item
									label='<= 5.000.000'
									value='kurang_dari_sama_dengan_lima_juta_rupiah'
								/>
								<Select.Item
									label='>= 5.000.000-15.000.000'
									value='lebih_dari_sama_dengan_lima_juta_sampai_lima_belas_juta_rupiah'
								/>
								<Select.Item
									label='> 15.000.000-25.000.000'
									value='lebih_dari_lima_belas_juta_sampai_dua_puluh_lima_juta_rupiah'
								/>
								<Select.Item
									label='> 25.000.000'
									value='lebih_dari_dua_puluh_lima_juta_rupiah'
								/>
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
