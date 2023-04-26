import { ScrollView, Text, View } from 'native-base';
import { useState } from 'react';
import { ActivityIndicator, useWindowDimensions } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import DataPemohon from './scenes/DataPemohon';
import DataPasangan from './scenes/DataPasangan';
import DataPenjamin from './scenes/DataPenjamin';
import DataKerabat from './scenes/DataKerabat';
import DataPekerjaan from './scenes/DataPekerjaan';
import DataAsuransi from './scenes/DataAsuransi';
import DataPenjual from './scenes/DataPenjual';
import InformasiKendaraan from './scenes/InformasiKendaraan';
import DataPenghasilan from './scenes/DataPenghasilan';
import StrukturPembiayaan from './scenes/StrukturPembiayaan';

const SecondRoute = () => (
	<ScrollView style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const renderScene = ({ route }) => {
	const { debiturId, formPermohonanId } = route;

	switch (route.key) {
		case 'dataPemohon':
			return (
				<DataPemohon
					debiturId={debiturId}
					formPermohonanId={formPermohonanId}
				/>
			);
		case 'dataPasangan':
			return (
				<DataPasangan
					debiturId={debiturId}
					formPermohonanId={formPermohonanId}
				/>
			);
		case 'dataPenjamin':
			return (
				<DataPenjamin
					debiturId={debiturId}
					formPermohonanId={formPermohonanId}
				/>
			);
		case 'dataKerabat':
			return (
				<DataKerabat
					debiturId={debiturId}
					formPermohonanId={formPermohonanId}
				/>
			);
		case 'dataPekerjaan':
			return (
				<DataPekerjaan
					debiturId={debiturId}
					formPermohonanId={formPermohonanId}
				/>
			);
		case 'informasiKendaraan':
			return (
				<InformasiKendaraan
					debiturId={debiturId}
					formPermohonanId={formPermohonanId}
				/>
			);
		case 'dataPenghasilan':
			return (
				<DataPenghasilan
					debiturId={debiturId}
					formPermohonanId={formPermohonanId}
				/>
			);
		case 'dataAsuransi':
			return (
				<DataAsuransi
					debiturId={debiturId}
					formPermohonanId={formPermohonanId}
				/>
			);
		case 'strukturPembiayaan':
			return (
				<StrukturPembiayaan
					debiturId={debiturId}
					formPermohonanId={formPermohonanId}
				/>
			);
		case 'dataPenjual':
			return (
				<DataPenjual
					debiturId={debiturId}
					formPermohonanId={formPermohonanId}
				/>
			);
		default:
			return null;
	}
};

const LazyPlaceholder = ({ route }) => (
	<View flex={1} alignItems='center' justifyContent='center'>
		<ActivityIndicator />
		<Text>Memuat {route.title}…</Text>
	</View>
);

export default function FormPermohonan({ route }) {
	const { debiturId, formPermohonanId } = route.params;
	const layout = useWindowDimensions();

	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{
			key: 'dataPemohon',
			title: 'Data Pemohon',
			debiturId,
			formPermohonanId,
		},
		{
			key: 'dataPasangan',
			title: 'Data Pasangan',
			debiturId,
			formPermohonanId,
		},
		{
			key: 'dataPenjamin',
			title: 'Data Penjamin',
			debiturId,
			formPermohonanId,
		},
		{
			key: 'dataKerabat',
			title: 'Data Kerabat',
			debiturId,
			formPermohonanId,
		},
		{
			key: 'dataPekerjaan',
			title: 'Data Pekerjaan',
			debiturId,
			formPermohonanId,
		},
		{
			key: 'informasiKendaraan',
			title: 'Informasi Kendaraan',
			debiturId,
			formPermohonanId,
		},
		{
			key: 'dataPenghasilan',
			title: 'Data Penghasilan',
			debiturId,
			formPermohonanId,
		},
		{
			key: 'dataAsuransi',
			title: 'Data Asuransi',
			debiturId,
			formPermohonanId,
		},
		{
			key: 'strukturPembiayaan',
			title: 'Struktur Pembiayaan',
			debiturId,
			formPermohonanId,
		},
		{
			key: 'dataPenjual',
			title: 'Data Penjual',
			debiturId,
			formPermohonanId,
		},
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
