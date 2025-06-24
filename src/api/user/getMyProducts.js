export const getMyProducts = async ({ request }) => {

    const url = new URL(request.url);
	const page = url.searchParams.get('page') || '1';
    const token = localStorage.getItem('token');

	const params = {
		method: 'GET',
		headers: {
			Authorization: token,
		}
	};

	const response = await fetch(`https://e-mercado.onrender.com/api/products/me?page=${page}`, params);
	const result = await response.json();

	if (response.status !== 200) throw result;

	return result;
};
