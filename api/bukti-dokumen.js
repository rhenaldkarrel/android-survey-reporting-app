import { ToastAndroid } from 'react-native';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';

export const useBuktiDokumen = (buktiDokumenId) => {
	const axios = useAxiosPrivate();
	const [dataBuktiDokumen, setDataBuktiDokumen] = useState({});

	const getBuktiDokumen = async () => {
		try {
			const res = await axios.get('/surveyor/bukti-dokumen/' + buktiDokumenId);

			setDataBuktiDokumen(res.data.data);
		} catch (err) {
			ToastAndroid.show(
				err.response?.data?.message || err.message || err,
				ToastAndroid.SHORT
			);
		}
	};

	const uploadBuktiDokumen = async ({ debiturId, surveyorId, dokumen }) => {
		try {
			const res = await axios.post('/surveyor/bukti-dokumen/upload/' + buktiDokumenId, dokumen, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				data: {
					debiturId,
					surveyorId,
				},
			});

			return res.data;
		} catch (err) {
			ToastAndroid.show(
				err.response?.data?.message || err.message || err,
				ToastAndroid.SHORT
			);
		}
	};

	useEffect(() => {
		getBuktiDokumen();
	}, []);

	return { dataBuktiDokumen, uploadBuktiDokumen };
};
