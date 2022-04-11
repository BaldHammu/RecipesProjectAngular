import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { RecipeService } from 'src/app/services/Recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  subscribe: Subscription;
  recipes: Recipe[];
  constructor (private dados:DataStorageService) { }
  ngOnInit(): void {
  this.dados.buscaRecipes().subscribe( res =>{

    this.recipes = res;
  });
  this.subscribe = this.dados.receitasMudaram
  .subscribe(res=>{
    this.recipes = res;
  })
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
}
