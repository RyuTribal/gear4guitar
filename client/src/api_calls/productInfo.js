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