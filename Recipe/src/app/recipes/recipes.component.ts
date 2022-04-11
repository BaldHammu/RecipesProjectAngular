import { Component, OnInit, } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  receitaSelecionada:Recipe;
  constructor(private data:DataStorageService) { }

  ngOnInit(): void {
    this.data.buscaRecipes().subscribe();
  }
}
