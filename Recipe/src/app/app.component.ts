import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/Auth/auth.service';
import { DataStorageService } from './services/data-storage.service';
import { RecipeService } from './services/Recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private auth:AuthService, private data:DataStorageService, private RecipeService:RecipeService){}
  ngOnInit(): void {
    this.auth.autoLogin();
    this.data.buscaRecipes().subscribe( res =>{
      this.RecipeService.recebeReceitas(res);
      this.RecipeService.receitasAtualizaram.next(res);
    });
  this.data.receitasMudaram.subscribe(res=>{
      this.RecipeService.receitasAtualizaram.next(res);
      this.RecipeService.recebeReceitas(res);
  })
  }
} 