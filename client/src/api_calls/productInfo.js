import axios from "axios";

export async function getProductInfo(id) {
  let data = await axios({
    method: "post",
    url: `http://localhost:8080/api/products/product/${id}`,
  });

  return data;
}