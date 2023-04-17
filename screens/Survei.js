import { Heading, View, Text, VStack } from 'native-base';
import {
	StatusBar,
	ToastAndroid,
	FlatList,
	ActivityIndicator,
} from 'react-native';
import DebiturCard from '../components/DebiturCard';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import React from 'react';
import useAuth from '../hooks/useAuth';

export default function Survei() {
	const axios = useAxiosPrivate();
	const [formPengajuanData, setFormPengajuanData] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const { auth } = useAuth();

	React.useEffect(() => {
		(async () => {
			try {
				const res = await axios.get(`/debitur?surveyor=${auth.userId}`);

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
