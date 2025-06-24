export const updateProduct = async (id, data) => {
	const url = `https://e-mercado.onrender.com/api/products/update/${id}`;

    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('category', data.category);
    formData.append('stock', data.stock);
    if(data.images.length !== 0) {
        data.images.forEach((image) => {
            formData.append('image', image.file); 
        });
    }

    const token = localStorage.getItem('token');

	const params = {
		method: 'PUT',
        headers: {
            'Authorization': token,
        },
		body: formData,
	};

	const response = await fetch(url, params);
	const result = await response.json();

	if (response.status !== 201) throw result;

	return result;
};