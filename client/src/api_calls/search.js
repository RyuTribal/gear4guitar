import axios from "axios";

export async function getSearchFeed(query) {
  query = query.replace(/ /g, "+");
  console.log("Query: " + query);

  let data = await axios({
    method: "post",
    url: `http://localhost:8080/api/products/search/:query=${query}`,
  });

  return data;
}
