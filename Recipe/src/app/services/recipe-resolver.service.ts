import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ingrediente } from "../shared/ingredientes.model";
import { RecipeService } from "./Recipe.service";
@Injectable({providedIn:'root'})

export class receitaResolver implements Resolve<receita>{
    constructor(private recipeService:RecipeService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): receita | Observable<receita> | Promise<receita> {
        return this.recipeService.selectReceita(route.params['nome']);
    }
}
interface receita{
     nome: string;
     descricao:string;
     imagePath:string;
     ingredientes : ingrediente[];
}