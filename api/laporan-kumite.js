import { useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { ToastAndroid } from 'react-native';

export const useLaporanKumite = (laporanKumiteId) => {
	const axios = useAxiosPrivate();
	const [dataLaporanKumite, setDataLaporanKumite] = useState({});

	const getLaporanKumite = async () => {
		try {
			const res = await axios.get(
				'/surveyor/laporan-kumite/' + laporanKumiteId
			);

			setDataLaporanKumite(res.data.data);
		} catch (err) {
			ToastAndroid.show(
				err.response?.data?.message || err.message || err,
				ToastAndroid.SHORT
			);
		}
	};

	useEffect(() => {
		getLaporanKumite();
	}, []);

	return { dataLaporanKumite };
};
