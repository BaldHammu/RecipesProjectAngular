import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ingrediente } from "../shared/ingredientes.model";
import { RecipeService } from "./Recipe.service";
import { DataStorageService } from "./data-storage.service";
import { Recipe } from "../recipes/recipe.model";

@Injectable({providedIn:'root'})

export class receitaResolver implements Resolve<Recipe[]>{
    constructor(private dados:DataStorageService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        return this.dados.buscaRecipes();
    }
}
interface receita{
     nome: string;
     descricao:string;
     imagePath:string;
     ingredientes : ingrediente[];
}