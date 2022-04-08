import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "./Recipe.service";
import { map, tap } from 'rxjs/operators';
import { AuthService } from "./Auth/auth.service";


@Injectable({ providedIn: 'root' })

export class DataStorageService {
    receitas: Recipe[];
    constructor(private http: HttpClient, private recipesService: RecipeService, private auth: AuthService) { }
    storeRecipes() {
        this.receitas = this.recipesService.getRecipes();
        this.http
            .put('https://ng-recipes-backend-75ba3-default-rtdb.firebaseio.com/receitas.json', this.receitas)
            .subscribe((res) => {
                console.log(res);
            });
    }
    buscaRecipes() {
        return this.http
            .get<Recipe[]>('https://ng-recipes-backend-75ba3-default-rtdb.firebaseio.com/receitas.json').pipe(
                map(res => {
                    return res.map(res => {
                        return { ...res, ingredientes: res.ingredientes ? res.ingredientes : [] }
                    });
                }), tap(res => {
                    this.recipesService.insereReceitas(res);
                }));
    }
    editaRecipes(OGRecipe,receita:Recipe) {
        this.http
            .get<Recipe[]>('https://ng-recipes-backend-75ba3-default-rtdb.firebaseio.com/receitas.json').pipe(
                map(res => {
                    return res.findIndex(res=>{
                        return res.nome=== OGRecipe[0].nome }
                    );
                }), tap(res => {
                    this.http.put<Recipe>('https://ng-recipes-backend-75ba3-default-rtdb.firebaseio.com/receitas/'+res+'.json',receita).subscribe()
                    this.recipesService.editaReceita(res,receita);
                })).subscribe(res =>{
                });
    }
}