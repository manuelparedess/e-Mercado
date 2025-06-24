export const updateUser = async (data) => {
	const url = 'http://localhost:5000/api/user/update';
    const token = localStorage.getItem('token');

	const params = {
		method: 'PUT',
        headers: {
			'Content-Type': 'application/json',
			'Authorization': token,
		},
		body: JSON.stringify(data),
	};

	const response = await fetch(url, params);
	const result = await response.json();

	if (response.status !== 200) throw result;

	return result;
};