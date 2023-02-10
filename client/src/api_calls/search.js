import axios from "axios";

export async function getSearchFeed(query, params, offset) {
  let data = await axios({
    method: "post",
    url: `http://localhost:8080/api/products/search/${query}`,
    data: {
      params: params,
      offset: offset,
    },
  });

  return data;
}

export async function getTotalResults(query, params) {
  let data = await axios({
    method: "post",
    url: `http://localhost:8080/api/products/total_results/${query}`,
    data: {
      params: params,
    },
  });

  return data;
}

export async function getCategoryBrandsColors(id){
  let data = await axios({
    method: "post",
    url: `http://localhost:8080/api/products/get_category_brands_colors/${id}`,
  });

  return data;
}

export async function getCategories(parent_id) {
  let data = await axios({
    method: "post",
    url: `http://localhost:8080/api/products/get_categories/${parent_id}`,
  });

  return data;
}

export async function getCategoryPath(id) {
  let data = await axios({
    method: "post",
    url: `http://localhost:8080/api/products/get_category_path/${id}`,
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
