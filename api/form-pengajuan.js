import { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';
import { ToastAndroid } from 'react-native';

export const useDataPengajuan = () => {
	const { auth } = useAuth();
	const [dataPengajuan, setDataPengajuan] = useState({});
	const axios = useAxiosPrivate();

	const getAssignedDataPengajuan = async (status = '') => {
		try {
			const res = await axios.get(
				`/debitur/form-pengajuan/has-surveyor/${auth.userId}`,
        {
          params: {
            status,
          }
        }
			);

			setDataPengajuan(res.data.data);
		} catch (err) {
			ToastAndroid.show(err);
		}
	};

  useEffect(() => {
		getAssignedDataPengajuan();
	}, []);

	return { dataPengajuan, getAssignedDataPengajuan };
}
