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

export default function DataAsuransi({ debiturId }) {
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
								<Select.Item label='Total Loss Only (TLO)' value='tlo' />
								<Select.Item label='All Risk' value='all_risk' />
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
                InputLeftElement={<Text ml="8px">Rp</Text>}
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
								<Select.Item label='Tunai' value='tunai' />
								<Select.Item label='Angsuran' value='angsuran' />
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
                InputLeftElement={<Text ml="8px">Rp</Text>}
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
                InputRightElement={<Text mr="8px">bulan</Text>}
							/>
						)}
						name='nominal_premi_dibayar'
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
				<Button bgColor='primary.400'>Simpan Data</Button>
			</VStack>
		</ScrollView>
	);
}
