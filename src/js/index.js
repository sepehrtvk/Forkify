import axios from "axios";
async function getResults(query) {
  try {
    const res = await axios(
      `https://forkify-api.herokuapp.com/api/search?q=${query}`
    );
    console.log(res.data.recipes[1]);
  } catch (error) {
    alert(error);
  }
}
getResults("chips");
