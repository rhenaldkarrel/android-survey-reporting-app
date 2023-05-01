import {
	Box,
	Button,
	Divider,
	HStack,
	Heading,
	ScrollView,
	Text,
	VStack,
} from 'native-base';
import useAuth from '../hooks/useAuth';
import { StatusBar } from 'react-native';

export default function Home({ navigation }) {
	const { auth } = useAuth();

	return (
		<ScrollView marginTop={StatusBar.currentHeight}>
			<Box p='16px' bg='primary.400'>
				<Text fontWeight='medium' fontSize='18px' color='white'>
					Halo, {auth.name}!
				</Text>
			</Box>
			<VStack
				padding='12px'
				space='12px'
				paddingBottom='24px'
				borderTopLeftRadius='16px'
				borderTopRightRadius='16px'
			>
				<Box>
					<Heading fontSize='16px' fontWeight='medium'>
						Statistik Survey
					</Heading>
				</Box>
				<VStack space='8px'>
					<HStack space='8px' display='flex'>
						<Box bg='primaryShade.800' p='6px' flex={1} borderRadius='8px'>
							<Text>Total Survey Aktif</Text>
							<Text fontSize='48px'>15</Text>
						</Box>
						<Box bg='primaryShade.800' p='6px' flex={1} borderRadius='8px'>
							<Text>Total Survey Sedang Diisi</Text>
							<Text fontSize='48px'>15</Text>
						</Box>
					</HStack>
					<HStack space='8px' display='flex'>
						<Box bg='primaryShade.800' p='6px' flex={1} borderRadius='8px'>
							<Text>Total Survey Selesai</Text>
							<Text fontSize='48px'>15</Text>
						</Box>
						<Box bg='primaryShade.800' p='6px' flex={1} borderRadius='8px'>
							<Text>Total Survey Dibatalkan</Text>
							<Text fontSize='48px'>15</Text>
						</Box>
					</HStack>
				</VStack>
				<Box>
					<Heading fontSize='16px' fontWeight='medium'>
						Statistik Debitur
					</Heading>
				</Box>
				<VStack space='8px'>
					<HStack space='8px' display='flex'>
						<Box bg='primaryShade.800' p='6px' flex={1} borderRadius='8px'>
							<Text>Total Debitur</Text>
							<Text fontSize='48px'>15</Text>
						</Box>
						<Box bg='primaryShade.800' p='6px' flex={1} borderRadius='8px'>
							<Text>Total Pencairan</Text>
							<Text fontSize='48px'>15</Text>
						</Box>
					</HStack>
					<HStack space='8px' display='flex'>
						<Box bg='primaryShade.800' p='6px' flex={1} borderRadius='8px'>
							<Text>Total Debitur Bulan Ini</Text>
							<Text fontSize='48px'>15</Text>
						</Box>
						<Box bg='primaryShade.800' p='6px' flex={1} borderRadius='8px'>
							<Text>Total Pencairan Bulan Ini</Text>
							<Text fontSize='48px'>15</Text>
						</Box>
					</HStack>
				</VStack>
			</VStack>
		</ScrollView>
	);
}
