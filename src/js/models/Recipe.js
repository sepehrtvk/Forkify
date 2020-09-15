import axios from "axios";

export default class Recipe{
    constructor(id){
        this.id = id;
    }

    async getRecipe(){
        try{
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        }catch (e){ 
            console.log(e);
            alert(e);
        }
    }
    calcTime(){
        const num = this.ingredients.length;
        const periods = Math.ceil(num/3);
        this.time = periods * 15;
    }
    calcServings(){
        this.serving=4;
    }
}