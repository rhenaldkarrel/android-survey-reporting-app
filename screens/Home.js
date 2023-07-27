import {
	Box,
	HStack,
	Heading,
	ScrollView,
	Text,
	VStack,
	Select,
} from 'native-base';
import useAuth from '../hooks/useAuth';
import { StatusBar } from 'react-native';
import { useStatistics } from '../api/statistik';
import { useEffect, useState } from 'react';
import {
	getCurrentMonthStartDate,
	getCurrentWeekStartDate,
	getCurrentYearStartDate,
} from '../lib/helpers/getTime';

export default function Home({ navigation }) {
	const { auth } = useAuth();

	const { data, getKinerjaSurveyor, getStatistik } = useStatistics();
	const [dataKinerja, setDataKinerja] = useState({});
	const [filterKinerja, setFilterKinerja] = useState('');

	useEffect(() => {
		(async () => {
			const dataKinerja = await getKinerjaSurveyor(auth.userId);

			setDataKinerja(dataKinerja);
		})();
	}, []);

	const getKinerjaSurveyorByTimestamp = async (date) => {
		const dataKinerja = await getKinerjaSurveyor(auth.userId, date);

		setDataKinerja(dataKinerja);
	};

	const handleChangeFilterKinerja = async (val) => {
		setFilterKinerja(val);

		await getKinerjaSurveyorByTimestamp(val);

		await getStatistik(val);
	};

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
				<Select
					placeholder='Filter'
					selectedValue={filterKinerja}
					onValueChange={(val) => handleChangeFilterKinerja(val)}
					accessibilityLabel='Filter'
					minWidth={120}
				>
					<Select.Item
						label='Tahun ini'
						value={getCurrentYearStartDate().toString()}
					/>
					<Select.Item
						label='Bulan ini'
						value={getCurrentMonthStartDate().toString()}
					/>
					<Select.Item
						label='Minggu ini'
						value={getCurrentWeekStartDate().toString()}
					/>
				</Select>
				<Box>
					<Heading fontSize='16px' fontWeight='medium'>
						Kinerja Anda
					</Heading>
				</Box>
				<VStack space='8px'>
					<HStack space='8px' display='flex'>
						<Box bg='primaryShade.800' p='6px' flex={1} borderRadius='8px'>
							<Text>Total Survey Aktif</Text>
							<Text fontSize='48px'>
								{dataKinerja.totalActiveSurveys?.toString() ?? 0}
							</Text>
						</Box>
						<Box bg='primaryShade.800' p='6px' flex={1} borderRadius='8px'>
							<Text>Total Survey Dibatalkan</Text>
							<Text fontSize='48px'>
								{dataKinerja.totalCanceledSurveys?.toString() ?? 0}
							</Text>
						</Box>
					</HStack>
					<HStack space='8px' display='flex'>
						<Box bg='primaryShade.800' p='6px' flex={1} borderRadius='8px'>
							<Text>Total Survey Selesai</Text>
							<Text fontSize='48px'>
								{dataKinerja.totalFinishedSurveys?.toString() ?? 0}
							</Text>
						</Box>
						<Box bg='primaryShade.800' p='6px' flex={1} borderRadius='8px'>
							<Text>Kinerja</Text>
							<Text fontSize='48px'>{dataKinerja.averagePerformance ?? 0}</Text>
						</Box>
					</HStack>
				</VStack>
				<Box>
					<Heading fontSize='16px' fontWeight='medium'>
						Statistik Survei Perusahaan
					</Heading>
				</Box>
				<VStack space='8px'>
					<HStack space='8px' display='flex'>
						<Box bg='primaryShade.800' p='6px' flex={1} borderRadius='8px'>
							<Text>Total Survey Aktif</Text>
							<Text fontSize='48px'>
								{data.totalActiveSurveys?.toString() ?? 0}
							</Text>
						</Box>
						<Box bg='primaryShade.800' p='6px' flex={1} borderRadius='8px'>
							<Text>Total Survey Dibatalkan</Text>
							<Text fontSize='48px'>
								{data.totalCanceledSurveys?.toString() ?? 0}
							</Text>
						</Box>
					</HStack>
					<HStack space='8px' display='flex'>
						<Box bg='primaryShade.800' p='6px' flex={1} borderRadius='8px'>
							<Text>Total Survey Selesai</Text>
							<Text fontSize='48px'>
								{data.totalFinishedSurveys?.toString() ?? 0}
							</Text>
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
							<Text>Total Debitur Aktif</Text>
							<Text fontSize='48px'>
								{data.totalActiveDebiturs?.toString() ?? 0}
							</Text>
						</Box>
						<Box bg='primaryShade.800' p='6px' flex={1} borderRadius='8px'>
							<Text>Total Pencairan</Text>
							<Text fontSize='48px'>
								{data.totalDisbursement?.toString() ?? 0}
							</Text>
						</Box>
					</HStack>
				</VStack>
			</VStack>
		</ScrollView>
	);
}
