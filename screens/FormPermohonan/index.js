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
import DataSPK from './scenes/DataSPK';

const renderScene = ({ route }) => {
	const { formPermohonanId, formSpkId } = route;

	switch (route.key) {
		case 'dataPemohon':
			return <DataPemohon formPermohonanId={formPermohonanId} />;
		case 'dataPasangan':
			return <DataPasangan formPermohonanId={formPermohonanId} />;
		case 'dataPenjamin':
			return <DataPenjamin formPermohonanId={formPermohonanId} />;
		case 'dataKerabat':
			return <DataKerabat formPermohonanId={formPermohonanId} />;
		case 'dataPekerjaan':
			return <DataPekerjaan formPermohonanId={formPermohonanId} />;
		case 'informasiKendaraan':
			return <InformasiKendaraan formPermohonanId={formPermohonanId} />;
		case 'dataPenghasilan':
			return <DataPenghasilan formPermohonanId={formPermohonanId} />;
		case 'dataAsuransi':
			return <DataAsuransi formPermohonanId={formPermohonanId} />;
		case 'strukturPembiayaan':
			return <StrukturPembiayaan formPermohonanId={formPermohonanId} />;
		case 'dataPenjual':
			return <DataPenjual formPermohonanId={formPermohonanId} />;
		case 'dataSPK':
			return <DataSPK formSpkId={formSpkId} />;
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
	const { formPermohonanId, formSpkId } = route.params;
	const layout = useWindowDimensions();

	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{
			key: 'dataPemohon',
			title: 'Data Pemohon',
			formPermohonanId,
		},
		{
			key: 'dataPasangan',
			title: 'Data Pasangan',
			formPermohonanId,
		},
		{
			key: 'dataPenjamin',
			title: 'Data Penjamin',
			formPermohonanId,
		},
		{
			key: 'dataKerabat',
			title: 'Data Kerabat',
			formPermohonanId,
		},
		{
			key: 'dataPekerjaan',
			title: 'Data Pekerjaan',
			formPermohonanId,
		},
		{
			key: 'informasiKendaraan',
			title: 'Informasi Kendaraan',
			formPermohonanId,
		},
		{
			key: 'dataPenghasilan',
			title: 'Data Penghasilan',
			formPermohonanId,
		},
		{
			key: 'dataAsuransi',
			title: 'Data Asuransi',
			formPermohonanId,
		},
		{
			key: 'strukturPembiayaan',
			title: 'Struktur Pembiayaan',
			formPermohonanId,
		},
		{
			key: 'dataPenjual',
			title: 'Data Penjual',
			formPermohonanId,
		},
		{
			key: 'dataSPK',
			title: 'Data Penilaian',
			formSpkId,
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
