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

export const useDataPekerjaan = (formPermohonanId) => {
	const [dataPekerjaan, setDataPekerjaan] = useState({});
	const axios = useAxiosPrivate();

	const getDataPekerjaan = async () => {
		try {
			const res = await axios.get(
				'/surveyor/form-permohonan/data-pekerjaan/' + formPermohonanId
			);

			setDataPekerjaan(res.data.data);
		} catch (err) {
			ToastAndroid.show(
				err.response?.data?.message || err.message || err,
				ToastAndroid.SHORT
			);
		}
	};

	const postDataPekerjaan = async (data) => {
		const res = await axios.post(
			'/surveyor/form-permohonan/data-pekerjaan/' + formPermohonanId,
			data
		);

		return res.data;
	};

	useEffect(() => {
		getDataPekerjaan();
	}, []);

	return { dataPekerjaan, postDataPekerjaan };
};

export const useDataAsuransi = (formPermohonanId) => {
	const [dataAsuransi, setDataAsuransi] = useState({});
	const axios = useAxiosPrivate();

	const getDataAsuransi = async () => {
		try {
			const res = await axios.get(
				'/surveyor/form-permohonan/data-asuransi/' + formPermohonanId
			);

			setDataAsuransi(res.data.data);
		} catch (err) {
			ToastAndroid.show(
				err.response?.data?.message || err.message || err,
				ToastAndroid.SHORT
			);
		}
	};

	const postDataAsuransi = async (data) => {
		const res = await axios.post(
			'/surveyor/form-permohonan/data-asuransi/' + formPermohonanId,
			data
		);

		return res.data;
	};

	useEffect(() => {
		getDataAsuransi();
	}, []);

	return { dataAsuransi, postDataAsuransi };
};

export const useDataKendaraan = (formPermohonanId) => {
	const [dataKendaraan, setDataKendaraan] = useState({});
	const axios = useAxiosPrivate();

	const getDataKendaraan = async () => {
		try {
			const res = await axios.get(
				'/surveyor/form-permohonan/data-kendaraan/' + formPermohonanId
			);

			setDataKendaraan(res.data.data);
		} catch (err) {
			ToastAndroid.show(
				err.response?.data?.message || err.message || err,
				ToastAndroid.SHORT
			);
		}
	};

	const postDataKendaraan = async (data) => {
		const res = await axios.post(
			'/surveyor/form-permohonan/data-kendaraan/' + formPermohonanId,
			data
		);

		return res.data;
	};

	useEffect(() => {
		getDataKendaraan();
	}, []);

	return { dataKendaraan, postDataKendaraan };
};

export const useDataPenghasilan = (formPermohonanId) => {
	const [dataPenghasilan, setDataPenghasilan] = useState({});
	const axios = useAxiosPrivate();

	const getDataPenghasilan = async () => {
		try {
			const res = await axios.get(
				'/surveyor/form-permohonan/data-penghasilan/' + formPermohonanId
			);

			setDataPenghasilan(res.data.data);
		} catch (err) {
			ToastAndroid.show(
				err.response?.data?.message || err.message || err,
				ToastAndroid.SHORT
			);
		}
	};

	const postDataPenghasilan = async (data) => {
		const res = await axios.post(
			'/surveyor/form-permohonan/data-penghasilan/' + formPermohonanId,
			data
		);

		return res.data;
	};

	useEffect(() => {
		getDataPenghasilan();
	}, []);

	return { dataPenghasilan, postDataPenghasilan };
};

export const useDataStrukturPembiayaan = (formPermohonanId) => {
	const [dataStrukturPembiayaan, setDataStrukturPembiayaan] = useState({});
	const axios = useAxiosPrivate();

	const getDataStrukturPembiayaan = async () => {
		try {
			const res = await axios.get(
				'/surveyor/form-permohonan/data-struktur-pembiayaan/' + formPermohonanId
			);

			setDataStrukturPembiayaan(res.data.data);
		} catch (err) {
			ToastAndroid.show(
				err.response?.data?.message || err.message || err,
				ToastAndroid.SHORT
			);
		}
	};

	const postDataStrukturPembiayaan = async (data) => {
		const res = await axios.post(
			'/surveyor/form-permohonan/data-struktur-pembiayaan/' + formPermohonanId,
			data
		);

		return res.data;
	};

	useEffect(() => {
		getDataStrukturPembiayaan();
	}, []);

	return { dataStrukturPembiayaan, postDataStrukturPembiayaan };
};

export const useDataPenjual = (formPermohonanId) => {
	const [dataPenjual, setDataPenjual] = useState({});
	const axios = useAxiosPrivate();

	const getDataPenjual = async () => {
		try {
			const res = await axios.get(
				'/surveyor/form-permohonan/data-penjual/' + formPermohonanId
			);

			setDataPenjual(res.data.data);
		} catch (err) {
			ToastAndroid.show(
				err.response?.data?.message || err.message || err,
				ToastAndroid.SHORT
			);
		}
	};

	const postDataPenjual = async (data) => {
		const res = await axios.post(
			'/surveyor/form-permohonan/data-penjual/' + formPermohonanId,
			data
		);

		return res.data;
	};

	useEffect(() => {
		getDataPenjual();
	}, []);

	return { dataPenjual, postDataPenjual };
};
