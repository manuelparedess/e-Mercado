export const deleteReview= async (id) => {
	const url = `https://e-mercado.onrender.com/api/products/review/${id}`;
    const token = localStorage.getItem('token');

	const params = {
		method: 'DELETE',
        headers: {
            'Authorization': token,
		},
	};

	const response = await fetch(url, params);
	const result = await response.json();

	if (response.status !== 200) throw result;

	return result;
};