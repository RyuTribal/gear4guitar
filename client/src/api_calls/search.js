import axios from "axios";

export async function getSearchFeed(query) {
  let data = await axios({
    method: "post",
    url: `http://localhost:8080/api/products/search/${query}`,
  });

  return data;
}

export async function getBestSellers() {
  let data = await axios({
    method: "get",
    url: `http://localhost:8080/api/products/best_sellers`,
  });

  return data;
}
