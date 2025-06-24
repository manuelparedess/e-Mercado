export const getRandomProducts = async () => {
	const url = 'http://localhost:5000/api/products/random';

	const params = {
		method: 'GET',
	};

	const response = await fetch(url, params);
	const result = await response.json();

	if (response.status !== 200) throw result;

	return result;
};
