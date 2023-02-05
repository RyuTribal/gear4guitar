import axios from "axios";

export async function login(email, password){
    let data = await axios({
        method: "post",
        url: `http://localhost:8080/api/users/login`,
        data: {
            email: email,
            password: password,
        },
    });

    return data;
}

export async function register(email, password, first_name, last_name){
    let data = await axios({
        method: "post",
        url: `http://localhost:8080/api/users/register`,
        data: {
            email: email,
            password: password,
            first_name: first_name,
            last_name: last_name,
        },
    });

    return data;
}