export const getRandomProducts = async () => {
	const url = 'https://e-mercado.onrender.com/api/products/random';

	const params = {
		method: 'GET',
	};

	const response = await fetch(url, params);
	const result = await response.json();

	if (response.status !== 200) throw result;

	return result;
};
