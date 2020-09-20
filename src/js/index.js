import Search from "./models/Search";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import { elements , renderLoader , clearLoader} from "./views/base";
import Recipe from './models/Recipe';

const state = {};

/******** SEARCH CONTROLLER *********/
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

elements.searchResPages.addEventListener('click',e => {
    const btn = e.target.closest('.btn-inline');

    if(btn){
      const goToPage = parseInt(btn.dataset.goto,10);
      searchView.clearResults();
      searchView.renderResults(state.search.result,goToPage);
    }
});

/******** RECIPE  CONTROLLER *********/

const controlRecipe = async () => {
  const id = window.location.hash.replace('#','');
  if(id){
    recipeView.clearRecipe();
    renderLoader(elements.recipe);
    state.recipe = new Recipe(id);
    await state.recipe.getRecipe();
    state.recipe.parseIngredients();
    state.recipe.calcTime();
    state.recipe.calcServings();
    clearLoader();
    recipeView.renderRecipe(state.recipe);
  }
};
window.addEventListener('hashchange',controlRecipe);
window.addEventListener('load',controlRecipe);