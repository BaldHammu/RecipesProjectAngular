import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "./Recipe.service";
import { map,tap,take, exhaustMap } from 'rxjs/operators';
import { AuthService } from "./Auth/auth.service";


@Injectable({providedIn:'root'})

export class DataStorageService {
    receitas:Recipe[];
    constructor( private http:HttpClient, private recipesService:RecipeService, private auth:AuthService){}
    storeRecipes(){
        this.receitas = this.recipesService.getRecipes();
        this.http
        .put('https://ng-recipes-backend-75ba3-default-rtdb.firebaseio.com/receitas.json',this.receitas)
        .subscribe((res)=>{
            console.log(res);
        });
    }
    buscaRecipes(){
            return this.http
            .get<Recipe[]>('https://ng-recipes-backend-75ba3-default-rtdb.firebaseio.com/receitas.json').pipe(
            map(res =>{
            return res.map(res =>{
                return {...res, ingredientes: res.ingredientes ? res.ingredientes : [] }
            });
        }), tap(res=>{
            this.recipesService.insereReceitas(res);
        }));
    }
}
