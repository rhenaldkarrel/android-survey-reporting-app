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

	const postLaporanKumite = async (data) => {
		try {
			const res = await axios.post(
				'/surveyor/laporan-kumite/' + laporanKumiteId,
				data
			);

			return res.data;
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

	return { dataLaporanKumite, postLaporanKumite };
};
