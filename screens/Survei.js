import { Heading, Text, VStack, View } from 'native-base';
import React from 'react';
import { FlatList, StatusBar, RefreshControl } from 'react-native';
import DebiturCard from '../components/DebiturCard';
import { useDataPengajuan } from '../api/form-pengajuan';

export default function Survei() {
	const { dataPengajuan, getAssignedDataPengajuan } = useDataPengajuan();

	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		getAssignedDataPengajuan().then(() => setRefreshing(false));
	}, []);

	return (
		<View marginTop={StatusBar.currentHeight} refres>
			<VStack space='8px' m='16px'>
				<Heading fontWeight='medium' fontSize='16px'>
					Daftar Survei
				</Heading>
				{dataPengajuan.length > 0 ? (
					<FlatList
						data={dataPengajuan}
						keyExtractor={({ _id }) => _id}
						ItemSeparatorComponent={<View style={{ height: 16 }} />}
						renderItem={({ item }) => <DebiturCard onRefresh={onRefresh} formPengajuanData={item} />}
						refreshControl={
							<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
						}
					/>
				) : (
					<Text>No data found</Text>
				)}
			</VStack>
		</View>
	);
}
