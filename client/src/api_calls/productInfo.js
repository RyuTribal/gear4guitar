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
        headers: {
            'X-Auth-Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjc1NTUzMTI1LCJleHAiOjE2NzU2Mzk1MjV9.LMpyS3MKB-yWAateg9vfZi8JJNLdXjaodqDQQb1T6Mo'
        },
        data: {
            comment: comment,
        }
    });

    return data;
}

export async function editComments(id, comment) {
    let data = await axios({
        method: "post",
        url: `http://localhost:8080/api/comments/add_comment_secure/${id}`,
        headers: {
            'X-Auth-Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjc1NTUzMTI1LCJleHAiOjE2NzU2Mzk1MjV9.LMpyS3MKB-yWAateg9vfZi8JJNLdXjaodqDQQb1T6Mo'
        },
        data: {
            comment: comment,
        }
    });

    return data;
}

export async function deleteComments(id) {
    let data = await axios({
        method: "post",
        url: `http://localhost:8080/api/products/comment/${id}`,
    });

    return data;
}