import resource from '../api';
import useAuth from './useAuth';
import useRefreshToken from './useRefreshToken';
import { useEffect } from 'react';
import { ToastAndroid } from 'react-native';

const useAxiosPrivate = () => {
	const refresh = useRefreshToken();
	const { auth, setAuth } = useAuth();

	useEffect(() => {
		let didCancel = false;

		const requestIntercept = resource.interceptors.request.use(
			(config) => {
				if (!config.headers['Authorization']) {
					config.headers['Authorization'] = `Bearer ${auth?.token}`;
				}
				return config;
			},
			(error) => Promise.reject(error)
		);

		const responseIntercept = resource.interceptors.response.use(
			(response) => response,
			async (error) => {
				const prevRequest = error?.config;
				if (error?.response?.status === 403 && !prevRequest?.sent) {
					prevRequest.sent = true;
					const newAccessToken = await refresh();
					prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
					if (!didCancel) {
						return resource(prevRequest);
					}
				} else if (error?.response?.status === 401 && !didCancel) {
					setAuth({});
					ToastAndroid.show(
						'Sesi sudah berakhir, harap lakukan login kembali.'
					);
				}
				return Promise.reject(error);
			}
		);

		return () => {
			didCancel = true;
			resource.interceptors.request.eject(requestIntercept);
			resource.interceptors.response.eject(responseIntercept);
		};
	}, [auth, refresh]);

	return resource;
};

export default useAxiosPrivate;
