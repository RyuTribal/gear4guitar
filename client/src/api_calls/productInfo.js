import axios from "axios";

export async function getProductInfo(id) {
  let data = await axios({
    method: "post",
    url: `http://localhost:8080/api/products/product/${id}`,
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

export async function getProductVariations(id) {
  let data = await axios({
    method: "post",
    url: `http://localhost:8080/api/products/get_variants/${id}`,
  });

  return data;
}

export async function getComments(id, offset) {
  let data = await axios({
    method: "post",
    url: `http://localhost:8080/api/products/comment/${id}`,
    data: {
      offset: offset,
    },
  });

  return data;
}

export async function addComments(id, comment) {
  let data = await axios({
    method: "post",
    url: `http://localhost:8080/api/comments/add_comment_secure/${id}`,
    data: {
      comment: comment,
    },
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

export async function editComments(id, comment) {
  let data = await axios({
    method: "post",
    url: `http://localhost:8080/api/comments/edit_comment_secure/${id}`,
    data: {
      comment: comment,
    },
  });

  return data;
}

export async function addProducts(
  title,
  price,
  description,
  in_stock,
  color,
  images,
  brand
) {
  console.log(title, price, description, in_stock, color, images, brand);
  let data = await axios({
    method: "post",
    url: `http://localhost:8080/api/products/add_product/`,
    data: {
      title: title,
      price: price,
      description: description,
      in_stock: in_stock,
      color: color,
      images: images,
      brand: brand,
    },
  });

  return data;
}

export async function deleteProducts(id) {
  let data = await axios({
    method: "post",
    url: `http://localhost:8080/api/products/delete_product/`,
    data: {
      id: id,
    },
  });

  return data;
}

export async function editProducts(
  id,
  title,
  price,
  description,
  in_stock,
  color,
  images,
  brand
) {
  let data = await axios({
    method: "post",
    url: `http://localhost:8080/api/products/edit_product/`,
    data: {
      id: id,
      title: title,
      price: price,
      description: description,
      in_stock: in_stock,
      color: color,
      images: images,
      brand: brand,
    },
  });

  return data;
}
