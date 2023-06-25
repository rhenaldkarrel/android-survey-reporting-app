import resource from '.';

export function login({ email, password }) {
	return resource.post('/users/login', { email, password });
}

export function updateProfile(id, { name, email, password }) {
	const data = {
		name,
		email,
		password: password === '' ? undefined : password,
	};

	return resource.patch(`/users/${id}`, data);
}
