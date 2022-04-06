import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Recipe } from "../recipes/recipe.model";
import { ingrediente } from "../shared/ingredientes.model";

@Injectable({providedIn:'root'})

export class RecipeService{
    receitasMudaram = new Subject<Recipe[]>();
    duplicado = false;
   private recipes: Recipe[]=[];
   temBolo = false;
      getRecipes(){
          return this.recipes.slice()
      }
      selectReceita(nome:string){
          const receita = this.recipes.find((r)=>{return r.nome === nome});
          return receita;
      }
      adicionaReceita(something:Recipe){
          for (let receitas in this.recipes){
              if(something.nome === this.recipes[receitas].nome){
                  alert('Nome Duplicado!');
                  this.duplicado=true;
              }
          }
          if (this.duplicado===false){
          this.recipes.push(something);
          this.receitasMudaram.next(this.recipes.slice());}
          this.duplicado=false;
      }
      removerIngrediente(i){
          this.recipes[0].ingredientes.splice(i,1);
          console.log(this.recipes);
      }
      editaReceita(receitaOriginal:Recipe,novaReceita:Recipe){
        const indice = this.recipes.findIndex(x=>x.nome===receitaOriginal.nome);
        console.log(this.recipes)
        console.log('https://ng-recipes-backend-75ba3-default-rtdb.firebaseio.com/receitas/'+indice+'.json')
        this.recipes[indice] = novaReceita;
        this.receitasMudaram.next(this.recipes.slice());
      }
      deletarReceita(receita:Recipe){
          const indice = this.recipes.indexOf(receita);
          this.recipes.splice(indice,1);
          this.receitasMudaram.next(this.recipes.slice());
      }
      insereReceitas(receitas:Recipe[]){
          this.temBolo = true;
          this.recipes = receitas;
          this.receitasMudaram.next(this.recipes.slice());
      }

}