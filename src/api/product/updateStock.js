export const updateStock = async (id, stock) => {
	const url = `http://localhost:5000/api/products/stock/${id}`;
    const data = {
        stock
    }

	const params = {
		method: 'PUT',
        headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	};

	const response = await fetch(url, params);
	const result = await response.json();

	if (response.status !== 200) throw result;

	return result;
};