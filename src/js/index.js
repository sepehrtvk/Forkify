import Search from "./models/Search";
import * as searchView from "./views/searchView";
import { elements , renderLoader , clearLoader} from "./views/base";

const state = {};

const controlSearch = async () => {
  const query = searchView.getInput();

  if (query) {
    state.search = new Search(query);
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.serchRes);
    await state.search.getResults();
    clearLoader();
    searchView.renderResults(state.search.result);
  }
};

elements.searchFrom.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});
