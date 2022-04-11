import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Recipe } from "../recipes/recipe.model";
import {tap } from 'rxjs/operators';
import { Subject } from "rxjs";



@Injectable({ providedIn: 'root' })

export class DataStorageService {
    receitasMudaram= new Subject<Recipe[]>();
    receitas: Recipe[];
    check = false;
    constructor(private http: HttpClient) { }
    storeRecipes(receita) {
        this.http.get<Recipe[]>('https://ng-recipes-backend-75ba3-default-rtdb.firebaseio.com/receitas.json')
        .pipe(tap(res=>{
            const DBarray = Object.values(res);
            for (let r in DBarray){
                if(receita.nome === DBarray[r].nome){
                    this.check = true;
                    console.log(this.check);
                    alert('Receita duplicada');
                    return
                };
            }
            if (!this.check){
                this.http
                    .post('https://ng-recipes-backend-75ba3-default-rtdb.firebaseio.com/receitas.json',receita)
                    .subscribe();
                setTimeout(()=>{
                this.http.get<Recipe[]>('https://ng-recipes-backend-75ba3-default-rtdb.firebaseio.com/receitas.json')
                .pipe(tap(res=> this.receitasMudaram.next(res)))
                .subscribe();
                },500)}
            }
        )).subscribe();
    }
    buscaRecipes() {
        return this.http
            .get<Recipe[]>('https://ng-recipes-backend-75ba3-default-rtdb.firebaseio.com/receitas.json');
    }
    editaRecipes(editKey:string,receita:Recipe) {
            this.http.put<Recipe>('https://ng-recipes-backend-75ba3-default-rtdb.firebaseio.com/receitas/'+editKey+'.json',receita).subscribe()
            setTimeout(()=>{
                this.http.get<Recipe[]>('https://ng-recipes-backend-75ba3-default-rtdb.firebaseio.com/receitas.json')
                .pipe(tap(res=> this.receitasMudaram.next(res)))
                .subscribe();
                },500)
    }
    deletarRecipe(editKey:string){
                    this.http.delete<Recipe>('https://ng-recipes-backend-75ba3-default-rtdb.firebaseio.com/receitas/'+editKey+'.json').subscribe();
                    setTimeout(()=>{
                        this.http.get<Recipe[]>('https://ng-recipes-backend-75ba3-default-rtdb.firebaseio.com/receitas.json')
                        .pipe(tap(res=> this.receitasMudaram.next(res)))
                        .subscribe();
                        },500)
                }
}