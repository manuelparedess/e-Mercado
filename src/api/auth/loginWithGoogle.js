export const loginWithGoogle = async (credential) => {
	const url = 'https://e-mercado.onrender.com/api/auth/google';

	const params = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({credential}),
	};

	const response = await fetch(url, params);
	const result = await response.json();

	if (response.status !== 200) throw result;

	return result;
};