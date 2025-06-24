export const getProductById = async ({ params }) => {
    const response = await fetch(`https://e-mercado.onrender.com/api/products/id/${params.id}`, {
		method: 'GET',
	});
    const data = await  response.json();

    if(response.status != 200) throw { product: data };

    return { product: data };

}

export const getProductById2 = async (id) => {
    const response = await fetch(`https://e-mercado.onrender.com/api/products/id/${id}`, {
		method: 'GET',
	});
    const data = await  response.json();

    if(response.status != 200) throw { product: data };

    return { product: data };

}