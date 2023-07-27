import { useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { ToastAndroid } from 'react-native';

export const useStatistics = () => {
	const [data, setData] = useState({});
	const axios = useAxiosPrivate();

  const getStatistik = async (date = '') => {
    try {
      let params = {};

			if (date) {
				params = {
					startDate: date,
				};
			}

      const res = await axios.get('/surveyor/statistik', {
        params,
      });

      setData(res.data.data);
    } catch (err) {
      ToastAndroid.show(
        err.response?.data?.message || err.message || err,
        ToastAndroid.SHORT
      );
    }
  };

	useEffect(() => {
		getStatistik();
	}, []);

	const getKinerjaSurveyor = async (surveyorId, date = '') => {
		try {
			let params = {};

			if (date) {
				params = {
					startDate: date,
				};
			}

			const res = await axios.get('/surveyor/kinerja-surveyor/' + surveyorId, {
				params,
			});

			return res.data.data;
		} catch (err) {
			ToastAndroid.show(
				err.response?.data?.message || err.message || err,
				ToastAndroid.SHORT
			);
		}
	};

	return { data, getKinerjaSurveyor, getStatistik };
};
