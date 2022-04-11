import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute, Data, Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { ShoppingService } from 'src/app/services/Shopping-List.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit, OnDestroy{
  receita:Recipe[];
  subscription:Subscription;
  certainIndex:number;
  deletionKey:string;
  constructor(
    public shoppingService:ShoppingService,
    public route:ActivatedRoute,
    public router:Router,
    public data:DataStorageService) {}

  ngOnInit(): void {
    this.subscription = this.route.data
    .subscribe(
      (data:Data)=>{
        const tratamentoInicial: Recipe[]= Object.values(data[0]);
        this.receita = tratamentoInicial.filter(res=>{
          return res.nome===decodeURI(this.router.url.split('/')[2]);
        });
        this.certainIndex = tratamentoInicial.findIndex(res=>{
          return res.nome === decodeURI(this.router.url.split('/')[2]);
        });
        this.deletionKey=Object.getOwnPropertyNames(data[0])[this.certainIndex];
      }
    )
    if (this.receita.length === 0 ) this.router.navigate(['/receitas']);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  deletarReceita(){
    this.data.deletarRecipe(this.deletionKey);
    this.router.navigate(['./receitas']);
  }
}