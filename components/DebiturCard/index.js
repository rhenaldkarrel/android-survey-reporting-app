import React from 'react';
import { Box, Heading, Text, Divider, HStack, Button } from 'native-base';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { STATUS_SURVEI } from '../../lib/constants';
import { TouchableOpacity } from 'react-native';

const DebiturCard = ({ status = STATUS_SURVEI.selesai_survei }) => {
	const RenderButtons = () => {
		switch (status) {
			case STATUS_SURVEI.diajukan:
				return (
					<Button leftIcon={<MaterialIcons name='person' color='#fff' />} flex={1} borderColor='primary.400'>
						Ajukan Diri untuk Survei
					</Button>
				);
			case STATUS_SURVEI.menunggu_tanggal:
				return (
					<React.Fragment>
						<Button
							leftIcon={<MaterialIcons name='chat' color='#82c24b' />}
							flex={1}
							variant='outline'
							borderColor='primary.400'
						>
							Chat
						</Button>
						<Button
							leftIcon={<MaterialIcons name='date-range' color='#fff' />}
							flex={1}
						>
							Pilih Waktu & Tanggal
						</Button>
					</React.Fragment>
				);
			case STATUS_SURVEI.siap_survei:
				return (
					<React.Fragment>
						<Button
							leftIcon={<MaterialIcons name='chat' color='#82c24b' />}
							flex={1}
							variant='outline'
							borderColor='primary.400'
						>
							Chat
						</Button>
						<Button
							leftIcon={<MaterialIcons name='location-pin' color='#82c24b' />}
							flex={1}
							variant='outline'
							borderColor='primary.400'
						>
							Lokasi
						</Button>
						<Button
							leftIcon={<MaterialIcons name='description' color='#fff' />}
							flex={1}
							borderColor='primary.400'
						>
							Form Survei
						</Button>
					</React.Fragment>
				);
			case STATUS_SURVEI.selesai_survei:
				return (
					<Button
						leftIcon={<MaterialIcons name='description' color='#82c24b' />}
						flex={1}
						variant='outline'
						disabled
					>
						Form Survei Telah Dikirim
					</Button>
				);
		}
	};

	return (
		<Box bg='primaryShade.800' p='6px' borderRadius='8px'>
			<HStack display='flex' justifyContent='space-between'>
				<Box maxWidth='70%'>
					<Heading fontSize='16px' fontWeight='medium'>
						Adrian
					</Heading>
					<Text>Jalan Ke Arah Rumah Saya No. 1, Babelan, Bekasi</Text>
					<Text>09.00-11.00</Text>
					<Text>14 Maret 2023</Text>
				</Box>
				<TouchableOpacity>
					<MaterialIcons
						style={{ padding: 4, borderRadius: 8 }}
						name='edit'
						size={18}
					/>
				</TouchableOpacity>
			</HStack>
			<Divider my='8px' />
			<HStack display='flex' space='8px'>
				{RenderButtons()}
			</HStack>
		</Box>
	);
};

export default DebiturCard;
