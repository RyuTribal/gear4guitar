import axios from "axios";

const DOMAIN = process.env.REACT_APP_DOMAIN;

export async function getProductInfo(id) {
  let data = await axios({
    method: "post",
    url: `${DOMAIN}/api/products/product/${id}`,
  });

  return data;
}

export async function getUser() {
  let data = await axios({
    method: "get",
    url: `${DOMAIN}/api/users/get_user/`,
  });

  return data;
}

export async function getProductVariations(id) {
  let data = await axios({
    method: "post",
    url: `${DOMAIN}/api/products/get_variants/${id}`,
  });

  return data;
}

export async function getComments(id, offset) {
  let data = await axios({
    method: "post",
    url: `${DOMAIN}/api/products/comment/${id}`,
    data: {
      offset: offset,
    },
  });

  return data;
}

export async function addComments(id, comment) {
  let data = await axios({
    method: "post",
    url: `${DOMAIN}/api/comments/add_comment_secure/${id}`,
    data: {
      comment: comment,
    },
  });

  return data;
}

export async function deleteComments(id) {
  let data = await axios({
    method: "post",
    url: `${DOMAIN}/api/comments/delete_comment_secure/${id}`,
  });

  return data;
}

export async function editComments(id, comment) {
  let data = await axios({
    method: "post",
    url: `${DOMAIN}/api/comments/edit_comment_secure/${id}`,
    data: {
      comment: comment,
    },
  });

  return data;
}

export async function addProducts(product) {
  let data = await axios({
    method: "post",
    url: `${DOMAIN}/api/products/add_product/`,
    data: {
      product: product,
    },
  });

  return data;
}

export async function deleteProducts(id) {
  let data = await axios({
    method: "post",
    url: `${DOMAIN}/api/products/delete_product/`,
    data: {
      id: id,
    },
  });

  return data;
}

export async function editProduct(product) {
  let data = await axios({
    method: "post",
    url: `${DOMAIN}/api/products/edit_product/`,
    data: {
      product,
    },
  });

  return data;
}

export async function addRatings(rating, id) {
  let data = await axios({
    method: "post",
    url: `${DOMAIN}/api/products/add_rating/${id}`,
    data: {
      rating: rating,
    },
  });

  return data;
}

export async function getGrades(id) {
  let data = await axios({
    method: "post",
    url: `${DOMAIN}/api/products/get_grades/${id}`,
  });

  return data;
}
