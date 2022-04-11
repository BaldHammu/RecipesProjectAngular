import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { Subject } from 'rxjs/Subject';



@Injectable({providedIn:'root'})

export class RecipeService{
    receitasAtualizaram= new Subject<Recipe[]>()
    private receitas: Recipe[];
    constructor(){
    }
    recebeReceitas(res:Recipe[]){
        this.receitas = res;
    }
    enviaReceitas(){
        return this.receitas;
    }
}