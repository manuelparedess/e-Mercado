export const login = async (data) => {
	const url = 'https://e-mercado.onrender.com/api/auth/login';

	const params = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	};

	const response = await fetch(url, params);
	const result = await response.json();

	if (response.status !== 200) throw result;

	return result;
};