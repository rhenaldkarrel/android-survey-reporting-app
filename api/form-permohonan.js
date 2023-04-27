import { useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { ToastAndroid } from 'react-native';

export const useGetDataPemohon = (formPermohonanId) => {
	const [dataPemohon, setDataPemohon] = useState({});
	const axios = useAxiosPrivate();

	const getDataPemohon = async () => {
		const res = await axios.get(
			'/surveyor/form-permohonan/data-pemohon/' + formPermohonanId
		);

		setDataPemohon(res.data.data);
	};

	useEffect(() => {
		getDataPemohon();
	}, []);

	return { dataPemohon };
};

export const usePostDataPemohon = (formPermohonanId) => {
	const axios = useAxiosPrivate();

	const postDataPemohon = async (data) => {
		const res = await axios.post(
			'/surveyor/form-permohonan/data-pemohon/' + formPermohonanId,
			data
		);

		return res.data;
	};

	return postDataPemohon;
};

export const useDataPasangan = (formPermohonanId) => {
	const [dataPasangan, setDataPasangan] = useState({});
	const axios = useAxiosPrivate();

	const getDataPasangan = async () => {
		try {
			const res = await axios.get(
				'/surveyor/form-permohonan/data-pasangan/' + formPermohonanId
			);

			setDataPasangan(res.data.data);
		} catch (err) {
			ToastAndroid.show(
				err.response?.data?.message || err.message || err,
				ToastAndroid.SHORT
			);
		}
	};

	const postDataPasangan = async (data) => {
		const res = await axios.post(
			'/surveyor/form-permohonan/data-pasangan/' + formPermohonanId,
			data
		);

		return res.data;
	};

	useEffect(() => {
		getDataPasangan();
	}, []);

	return { dataPasangan, postDataPasangan };
};
