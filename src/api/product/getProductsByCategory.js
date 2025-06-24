export const getProductsByCategory = async ({ request }) => {

    const url = new URL(request.url);
    const category = url.searchParams.get('q');
	const page = url.searchParams.get('page') || '1';

	const params = {
		method: 'GET',
	};

	const response = await fetch(`http://localhost:5000/api/products/category/${category}?page=${page}`, params);
	const result = await response.json();

	if (response.status !== 200) throw result;

	return result;
};