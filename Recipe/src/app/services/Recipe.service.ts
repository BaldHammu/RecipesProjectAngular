import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Recipe } from "../recipes/recipe.model";
import { ingrediente } from "../shared/ingredientes.model";

@Injectable({providedIn:'root'})

export class RecipeService{
    receitasMudaram = new Subject<Recipe[]>();
   private recipes: Recipe[]=[
        new Recipe(
            'Hamburger',
            'Continuação dos testes',
            'https://th.bing.com/th/id/OIP.XHRVZdv7k6lnFcxdA5cGtwHaHa?pid=ImgDet&rs=1',
            [
                new ingrediente('Pão',2),
                new ingrediente('Picles',5),
                new ingrediente('Secret Sauce',1),
                new ingrediente('Bacon',5),
                new ingrediente('Queijo',2),
                new ingrediente('Ovo',1),
            ]),
      ];
      getRecipes(){
          return this.recipes.slice()
      }
      selectReceita(nome:string){
          const receita = this.recipes.find((r)=>{return r.nome === nome});
          return receita;
      }
      adicionaReceita(something:Recipe){
          this.recipes.push(something);
          this.receitasMudaram.next(this.recipes.slice());
          console.log(this.recipes)
      }
      removerIngrediente(i){
          this.recipes[0].ingredientes.splice(i,1);
          console.log(this.recipes);
      }
      editaReceita(receitaOriginal:Recipe,novaReceita:Recipe){
        const indice = this.recipes.indexOf(receitaOriginal);
        this.recipes[indice] = novaReceita;
        this.receitasMudaram.next(this.recipes.slice());
      }
      deletarReceita(receita:Recipe){
          const indice = this.recipes.indexOf(receita);
          this.recipes.splice(indice,1);
          this.receitasMudaram.next(this.recipes.slice());
      }

}