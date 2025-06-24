export const deleteFavorite = async (id) => {
	const url = `https://e-mercado.onrender.com/api/user/favorites/${id}`;
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