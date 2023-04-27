import { useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { ToastAndroid } from 'react-native';

export const useDataPemohon = (formPermohonanId) => {
	const [dataPemohon, setDataPemohon] = useState({});
	const axios = useAxiosPrivate();

	const getDataPemohon = async () => {
		const res = await axios.get(
			'/surveyor/form-permohonan/data-pemohon/' + formPermohonanId
		);

		setDataPemohon(res.data.data);
	};

	const postDataPemohon = async (data) => {
		const res = await axios.post(
			'/surveyor/form-permohonan/data-pemohon/' + formPermohonanId,
			data
		);

		return res.data;
	};

	useEffect(() => {
		getDataPemohon();
	}, []);

	return { dataPemohon, postDataPemohon };
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

export const useDataPenjamin = (formPermohonanId) => {
	const [dataPenjamin, setDataPenjamin] = useState({});
	const axios = useAxiosPrivate();

	const getDataPenjamin = async () => {
		try {
			const res = await axios.get(
				'/surveyor/form-permohonan/data-penjamin/' + formPermohonanId
			);

			setDataPenjamin(res.data.data);
		} catch (err) {
			ToastAndroid.show(
				err.response?.data?.message || err.message || err,
				ToastAndroid.SHORT
			);
		}
	};

	const postDataPenjamin = async (data) => {
		const res = await axios.post(
			'/surveyor/form-permohonan/data-penjamin/' + formPermohonanId,
			data
		);

		return res.data;
	};

	useEffect(() => {
		getDataPenjamin();
	}, []);

	return { dataPenjamin, postDataPenjamin };
};

export const useDataKerabat = (formPermohonanId) => {
	const [dataKerabat, setDataKerabat] = useState({});
	const axios = useAxiosPrivate();

	const getDataKerabat = async () => {
		try {
			const res = await axios.get(
				'/surveyor/form-permohonan/data-kerabat/' + formPermohonanId
			);

			setDataKerabat(res.data.data);
		} catch (err) {
			ToastAndroid.show(
				err.response?.data?.message || err.message || err,
				ToastAndroid.SHORT
			);
		}
	};

	const postDataKerabat = async (data) => {
		const res = await axios.post(
			'/surveyor/form-permohonan/data-kerabat/' + formPermohonanId,
			data
		);

		return res.data;
	};

	useEffect(() => {
		getDataKerabat();
	}, []);

	return { dataKerabat, postDataKerabat };
};
