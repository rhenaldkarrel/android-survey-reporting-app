import { Heading, Text, VStack, View } from 'native-base';
import React from 'react';
import {
	ActivityIndicator,
	FlatList,
	StatusBar,
	ToastAndroid,
} from 'react-native';
import DebiturCard from '../components/DebiturCard';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

export default function Survei() {
	const axios = useAxiosPrivate();
	const [formPengajuanData, setFormPengajuanData] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const { auth } = useAuth();

	React.useEffect(() => {
		(async () => {
			try {
				const res = await axios.get(
					`/debitur/form-pengajuan/has-surveyor/${auth.userId}`
				);

				setFormPengajuanData(res.data.data);
			} catch (err) {
				ToastAndroid.show(err);
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	return (
		<View marginTop={StatusBar.currentHeight}>
			<VStack space='8px' m='16px'>
				<Heading fontWeight='medium' fontSize='16px'>
					Daftar Survei
				</Heading>
				{isLoading ? (
					<ActivityIndicator />
				) : (
					<>
						{formPengajuanData.length > 0 ? (
							<FlatList
								data={formPengajuanData}
								keyExtractor={({ _id }) => _id}
								ItemSeparatorComponent={<View style={{ height: 16 }} />}
								renderItem={({ item }) => (
									<DebiturCard formPengajuanData={item} />
								)}
							/>
						) : (
							<Text>No data found</Text>
						)}
					</>
				)}
			</VStack>
		</View>
	);
}
