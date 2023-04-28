import { ToastAndroid } from 'react-native';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

export const useBuktiDokumen = () => {
	const axios = useAxiosPrivate();

	const uploadBuktiDokumen = async ({ debiturId, surveyorId, dokumen }) => {
		try {
			const res = await axios.post('/surveyor/bukti-dokumen/upload', dokumen, {
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
      console.log(JSON.stringify(err, null, 2))
			ToastAndroid.show(
				err.response?.data?.message || err.message || err,
				ToastAndroid.SHORT
			);
		}
	};

	return { uploadBuktiDokumen };
};
