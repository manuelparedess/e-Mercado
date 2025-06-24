export const addReview = async (id, newRating, newText) => {
	const url = `http://localhost:5000/api/products/review/${id}`;
    const data = {
		rating: newRating,
		text: newText
	}
    const token = localStorage.getItem('token');

	const params = {
		method: 'POST',
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