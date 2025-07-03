export const getUser = async (token) => {
	const url = 'https://e-mercado.onrender.com/api/user/me';

	//timeout for fetch
	const timeoutPromise = new Promise((_, reject) =>
		setTimeout(() => reject(new Error('Timeout finished')), 10000)
	);

	//fetch for user
	const params = {
		method: 'GET',
		headers: {
			Authorization: token,
		}
	};
	const fetchUser = fetch(url, params);

	const response = await Promise.race([fetchUser, timeoutPromise]);
	const result = await response.json();

	if (response.status !== 200) throw result;

	return result;
};
