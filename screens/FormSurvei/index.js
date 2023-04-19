import { ScrollView, Text, View } from 'native-base';
import { useState } from 'react';
import { ActivityIndicator, TouchableWithoutFeedback, useWindowDimensions } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import DataPemohon from './scenes/DataPemohon';
import DataPasangan from './scenes/DataPasangan';

const SecondRoute = () => (
	<ScrollView style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const renderScene = ({ route }) => {
	const { debiturId } = route;

	switch (route.key) {
		case 'dataPemohon':
			return <DataPemohon debiturId={debiturId} />;
		case 'dataPasangan':
			return <DataPasangan debiturId={debiturId} />;
		case 'dataPenjamin':
			return <SecondRoute debiturId={debiturId} />;
		case 'dataKerabat':
			return <SecondRoute debiturId={debiturId} />;
		case 'dataPekerjaan':
			return <SecondRoute debiturId={debiturId} />;
		case 'informasiKendaraan':
			return <SecondRoute debiturId={debiturId} />;
		case 'dataPenghasilan':
			return <SecondRoute debiturId={debiturId} />;
		case 'dataAsuransi':
			return <SecondRoute debiturId={debiturId} />;
		case 'strukturPembiayaan':
			return <SecondRoute debiturId={debiturId} />;
		case 'dataPenjual':
			return <SecondRoute debiturId={debiturId} />;
		default:
			return null;
	}
};

const LazyPlaceholder = ({ route }) => (
  <View flex={1} alignItems="center" justifyContent="center">
    <ActivityIndicator />
    <Text>Memuat {route.title}…</Text>
  </View>
);

export default function FormSurvei({ route }) {
	const { _id } = route.params;
	const layout = useWindowDimensions();

	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{ key: 'dataPemohon', title: 'Data Pemohon', debiturId: _id },
		{ key: 'dataPasangan', title: 'Data Pasangan', debiturId: _id },
		{ key: 'dataPenjamin', title: 'Data Penjamin', debiturId: _id },
		{ key: 'dataKerabat', title: 'Data Kerabat', debiturId: _id },
		{ key: 'dataPekerjaan', title: 'Data Pekerjaan', debiturId: _id },
		{ key: 'informasiKendaraan', title: 'Informasi Kendaraan', debiturId: _id },
		{ key: 'dataPenghasilan', title: 'Data Penghasilan', debiturId: _id },
		{ key: 'dataAsuransi', title: 'Data Asuransi', debiturId: _id },
		{ key: 'strukturPembiayaan', title: 'Struktur Pembiayaan', debiturId: _id },
		{ key: 'dataPenjual', title: 'Data Penjual', debiturId: _id },
	]);

	return (
		<TabView
      lazy
      renderLazyPlaceholder={LazyPlaceholder}
			navigationState={{ index, routes }}
			renderScene={renderScene}
			onIndexChange={setIndex}
			initialLayout={{ width: layout.width }}
			renderTabBar={(props) => (
				<TabBar
					{...props}
					style={{ backgroundColor: '#82c24b' }}
					scrollEnabled
				/>
			)}
		/>
	);
}
