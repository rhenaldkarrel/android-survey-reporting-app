import { useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

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
