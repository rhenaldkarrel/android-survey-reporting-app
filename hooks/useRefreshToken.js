import resource from '../api';
import useAuth from './useAuth';

const useRefreshToken = () => {
	const { auth, setAuth } = useAuth();

	const refresh = async () => {
		try {
			const response = await resource.post(
				'/users/refresh-token',
				{},
				{
					headers: {
						Authorization: `Bearer ${auth.token}`,
					},
				}
			);
			setAuth((prev) => {
				return { ...prev, token: response.data.token };
			});
			return response.data.token;
		} catch (err) {
			console.log('Error ketika refresh token: ', err);
		}
	};

	return refresh;
};

export default useRefreshToken;
