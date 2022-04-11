import { Component, OnInit, Input,} from '@angular/core';
import { RecipeService } from 'src/app/services/Recipe.service';
import { Recipe } from '../../recipe.model';
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  trataRecipes: any;
  constructor(public RecipeService:RecipeService) { }

  ngOnInit(): void {
    this.trataRecipes = Object.values(this.recipe)[1];
  }


}
