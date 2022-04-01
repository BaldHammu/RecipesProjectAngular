import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeService } from 'src/app/services/Recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  subscribe: Subscription;
  recipes: Recipe[];
  constructor(private recipeService:RecipeService) { }


  ngOnInit(): void {
  this.recipes = this.recipeService.getRecipes();
  this.subscribe = this.recipeService.receitasMudaram
  .subscribe((receitas:Recipe[])=>{
    this.recipes = receitas;
  })
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
}
