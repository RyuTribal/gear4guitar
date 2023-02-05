import axios from "axios";

export async function getProductInfo(id) {
    let data = await axios({
        method: "post",
        url: `http://localhost:8080/api/products/product/${id}`,
    });

    return data;
}

export async function getComments(id) {
    let data = await axios({
        method: "post",
        url: `http://localhost:8080/api/products/comment/${id}`,
    });

    return data;
}

export async function addComments(id, comment) {
    let data = await axios({
        method: "post",
        url: `http://localhost:8080/api/comments/add_comment_secure/${id}`,
        data: {
            comment: comment,
        }
    });

    return data;
}

export async function getUser() {
    let data = await axios({
        method: "get",
        url: `http://localhost:8080/api/users/get_user/`,
    });

    return data;
}

export async function editComments(id, comment) {
    let data = await axios({
        method: "post",
        url: `http://localhost:8080/api/comments/edit_comment_secure/${id}`,
        data: {
            comment: comment,
        }
    });

    return data;
}

export async function deleteComments(id) {
    let data = await axios({
        method: "post",
        url: `http://localhost:8080/api/comments/delete_comment_secure/${id}`,
    });

    return data;
}

export async function addProduct(title, price) {
    let data = await axios({
        method: "post",
        url: `http://localhost:8080/api/comments/add_comment_secure/`,
        data: {
            title: title,
            price: price,
        }
    });

    return data;
}