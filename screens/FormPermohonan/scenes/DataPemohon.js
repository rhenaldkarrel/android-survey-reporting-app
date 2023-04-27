import _ from 'lodash';
import {
	Button,
	FormControl,
	HStack,
	Input,
	ScrollView,
	Select,
	VStack,
} from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { ToastAndroid } from 'react-native';
import {
	useDataPemohon
} from '../../../api/form-permohonan';
import { useState } from 'react';

export default function DataPemohon({ debiturId, formPermohonanId }) {
	const [isLoading, setIsLoading] = useState(false);

	const { dataPemohon, postDataPemohon } = useDataPemohon(formPermohonanId);

	const {
		control,
		getValues,
		formState: { errors },
		watch,
	} = useForm({
		values: {
			nama_lengkap: dataPemohon.nama_lengkap,
			no_ktp: dataPemohon.no_ktp,
			tempat_tanggal_lahir: dataPemohon.tempat_tanggal_lahir,
			agama: dataPemohon.agama,
			hobi: dataPemohon.hobi,
			nama_ibu_kandung: dataPemohon.nama_ibu_kandung,
			status_pernikahan: dataPemohon.status_pernikahan,
			jumlah_tanggungan: dataPemohon.jumlah_tanggungan?.toString(),
			pendidikan_terakhir: dataPemohon.pendidikan_terakhir,
			jenis_kelamin: dataPemohon.jenis_kelamin,
			alamat_ktp: dataPemohon.alamat_ktp?.alamat,
			alamat_ktp_rt: dataPemohon.alamat_ktp?.rt,
			alamat_ktp_rw: dataPemohon.alamat_ktp?.rw,
			alamat_ktp_kota: dataPemohon.alamat_ktp?.kota,
			alamat_ktp_kelurahan: dataPemohon.alamat_ktp?.kelurahan,
			alamat_ktp_kecamatan: dataPemohon.alamat_ktp?.kecamatan,
			alamat_ktp_kode_pos: dataPemohon.alamat_ktp?.kode_pos?.toString(),
			alamat_domisili: dataPemohon.alamat_domisili?.alamat,
			alamat_domisili_rt: dataPemohon.alamat_domisili?.rt,
			alamat_domisili_rw: dataPemohon.alamat_domisili?.rw,
			alamat_domisili_kota: dataPemohon.alamat_domisili?.kota,
			alamat_domisili_kelurahan: dataPemohon.alamat_domisili?.kelurahan,
			alamat_domisili_kecamatan: dataPemohon.alamat_domisili?.kecamatan,
			alamat_domisili_kode_pos:
				dataPemohon.alamat_domisili?.kode_pos?.toString(),
			status_rumah: dataPemohon.status_rumah,
			lama_tinggal: dataPemohon.lama_tinggal,
			no_hp: dataPemohon.no_hp,
			no_whatsapp: dataPemohon.no_whatsapp,
			no_telp: dataPemohon.no_telp,
			no_fax: dataPemohon.no_fax,
			email: dataPemohon.email,
			kewarganegaraan: dataPemohon.kewarganegaraan,
			tujuan_pembiayaan: dataPemohon.tujuan_pembiayaan,
			nama_bank: dataPemohon.nama_bank,
			rekening_atas_nama: dataPemohon.rekening_atas_nama,
			tujuan_pengadaan_barang_jasa: dataPemohon.tujuan_pengadaan_barang_jasa,
			no_npwp: dataPemohon.no_npwp,
		},
	});

	const onSubmit = async () => {
		setIsLoading(true);

		ToastAndroid.show('Mohon tunggu sebentar...', ToastAndroid.SHORT);

		const data = getValues();

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
			alamat_domisili: {
				alamat: data.alamat_domisili,
				rt: data.alamat_domisili_rt,
				rw: data.alamat_domisili_rw,
				kecamatan: data.alamat_domisili_kecamatan,
				kelurahan: data.alamat_domisili_kelurahan,
				kode_pos: Number(data.alamat_domisili_kode_pos),
				kota: data.alamat_domisili_kota,
			},
			jumlah_tanggungan: Number(data.jumlah_tanggungan),
		};

		const cleanedData = _.omit(formattedData, [
			'alamat_ktp_rt',
			'alamat_ktp_rw',
			'alamat_ktp_kecamatan',
			'alamat_ktp_kelurahan',
			'alamat_ktp_kode_pos',
			'alamat_ktp_kota',
			'alamat_domisili_rt',
			'alamat_domisili_rw',
			'alamat_domisili_kecamatan',
			'alamat_domisili_kelurahan',
			'alamat_domisili_kode_pos',
			'alamat_domisili_kota',
		]);

		try {
			const response = await postDataPemohon(cleanedData);

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
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Agama</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Select
								placeholder='Agama'
								selectedValue={value}
								onBlur={onBlur}
								onValueChange={(val) => onChange(val)}
							>
								<Select.Item label='Islam' value='Islam' />
								<Select.Item label='Protestan' value='Protestan' />
								<Select.Item label='Katolik' value='Katolik' />
								<Select.Item label='Hindu' value='Hindu' />
								<Select.Item label='Buddha' value='Buddha' />
							</Select>
						)}
						name='agama'
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Hobi</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onBlur={onBlur}
								onChangeText={(val) => onChange(val)}
								value={value}
							/>
						)}
						name='hobi'
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Nama Ibu Kandung</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onBlur={onBlur}
								onChangeText={(val) => onChange(val)}
								value={value}
							/>
						)}
						name='nama_ibu_kandung'
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Status Pernikahan</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Select
								placeholder='Status Pernikahan'
								selectedValue={value}
								onBlur={onBlur}
								onValueChange={(val) => onChange(val)}
							>
								<Select.Item label='Belum Kawin' value='Belum Kawin' />
								<Select.Item label='Kawin' value='Kawin' />
								<Select.Item label='Duda/Janda' value='Duda/Janda' />
							</Select>
						)}
						name='status_pernikahan'
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Jumlah Tanggungan</FormControl.Label>
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
						name='jumlah_tanggungan'
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Pendidikan Terakhir</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Select
								placeholder='Pendidikan Terakhir'
								selectedValue={value}
								onBlur={onBlur}
								onValueChange={(val) => onChange(val)}
							>
								<Select.Item label='SD' value='SD' />
								<Select.Item label='SMP' value='SMP' />
								<Select.Item label='SMA' value='SMA' />
								<Select.Item label='D1/D2/D3/D4' value='D1/D2/D3/D4' />
								<Select.Item label='S1/S2/S3' value='S1/S2/S3' />
							</Select>
						)}
						name='pendidikan_terakhir'
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
							shouldUnregister={true}
						/>
					</VStack>
				</FormControl>
				<FormControl>
					<FormControl.Label>Alamat Domisili</FormControl.Label>
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
							name='alamat_domisili'
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
								name='alamat_domisili_rt'
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
								name='alamat_domisili_rw'
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
								name='alamat_domisili_kode_pos'
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
								name='alamat_domisili_kelurahan'
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
								name='alamat_domisili_kecamatan'
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
							name='alamat_domisili_kota'
							shouldUnregister={true}
						/>
					</VStack>
				</FormControl>
				<FormControl>
					<FormControl.Label>Status Rumah</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Select
								placeholder='Status Rumah'
								selectedValue={value}
								onBlur={onBlur}
								onValueChange={(val) => onChange(val)}
							>
								<Select.Item label='Milik Sendiri' value='Milik Sendiri' />
								<Select.Item label='Rumah Kontrak' value='Rumah Kontrak' />
								<Select.Item label='Rumah Keluarga' value='Rumah Keluarga' />
								<Select.Item
									label='Rumah Dinas/Perusahaan'
									value='rumah_dinas_perusahaan'
								/>
							</Select>
						)}
						name='status_rumah'
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Lama Tinggal</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onBlur={onBlur}
								onChangeText={(val) => onChange(val)}
								value={value}
							/>
						)}
						name='lama_tinggal'
						shouldUnregister={true}
					/>
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
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>No. Whatsapp</FormControl.Label>
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
						name='no_whatsapp'
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
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>No. NPWP</FormControl.Label>
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
						name='no_npwp'
						shouldUnregister={true}
					/>
					<FormControl.HelperText>
						Wajib diisi untuk pembiayaan &ge; 50 juta, Sewa Guna Usaha,
						Pembiayaan Rumah
					</FormControl.HelperText>
				</FormControl>
				<FormControl>
					<FormControl.Label>Email</FormControl.Label>
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
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Kewarganegaraan</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Select
								placeholder='Kewarganegaraan'
								selectedValue={value}
								onBlur={onBlur}
								onValueChange={(val) => onChange(val)}
							>
								<Select.Item label='WNI' value='WNI' />
								<Select.Item label='WNA' value='WNA' />
							</Select>
						)}
						name='kewarganegaraan'
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>
						Tujuan Pembiayaan (Pengadaan/Pembelian)
					</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Select
								placeholder='Tujuan Pembiayaan'
								selectedValue={value}
								onBlur={onBlur}
								onValueChange={(val) => onChange(val)}
							>
								<Select.Item label='Barang' value='Barang' />
								<Select.Item label='Jasa' value='Jasa' />
							</Select>
						)}
						name='tujuan_pembiayaan'
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Nama Bank</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onBlur={onBlur}
								onChangeText={(val) => onChange(val)}
								value={value}
							/>
						)}
						name='nama_bank'
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Rekening Atas Nama</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onBlur={onBlur}
								onChangeText={(val) => onChange(val)}
								value={value}
							/>
						)}
						name='rekening_atas_nama'
						shouldUnregister={true}
					/>
				</FormControl>
				<FormControl>
					<FormControl.Label>Tujuan Pengadaan Barang/Jasa</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onBlur={onBlur}
								onChangeText={(val) => onChange(val)}
								value={value}
							/>
						)}
						name='tujuan_pengadaan_barang_jasa'
						shouldUnregister={true}
					/>
				</FormControl>
				<Button bgColor='primary.400' onPress={onSubmit} isLoading={isLoading}>
					Simpan Data
				</Button>
			</VStack>
		</ScrollView>
	);
}
