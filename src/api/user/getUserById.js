export const getUserById = async ({ params }) => {
    const response = await fetch(`http://localhost:5000/api/user/${params.id}`, {
		method: 'GET',
	});
    const data = await  response.json();

    if(response.status != 200) throw { user: data };

    return { user: data };

}

export const getUserById2 = async (id) => {
    const response = await fetch(`http://localhost:5000/api/user/${id}`, {
		method: 'GET',
	});
    const data = await  response.json();

    if(response.status != 200) throw { user: data };

    return { user: data };

}