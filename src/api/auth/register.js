export const register = async (data) => {
	const url = 'https://e-mercado.onrender.com/api/auth/register';

	const params = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	};

	const response = await fetch(url, params);
	const result = await response.json();

	if (response.status !== 201) throw result;

	return result;
};