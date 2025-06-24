export const getProductByName = async ({ request }) => {

    const url = new URL(request.url);
    const q = url.searchParams.get('q');
	const page = url.searchParams.get('page') || '1';

	const params = {
		method: 'GET',
	};

	const response = await fetch(`https://e-mercado.onrender.com/api/products/name/${q}?page=${page}`, params);
	const result = await response.json();

	if (response.status !== 200) throw result;

	return result;
};