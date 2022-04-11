import { NgContentAst } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingService } from '../services/Shopping-List.service';
import { ingrediente } from '../shared/ingredientes.model';
@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit, OnDestroy {
  ingredientes:ingrediente[];
  subscription:Subscription;
  hakuna = false;
  constructor(private shoppingService:ShoppingService, private router:Router) {
    this.ingredientes=this.shoppingService.getIngredients();
   }

  ngOnInit(): void {
    this.subscription = this.shoppingService.adicionaIngredientes
    .subscribe((ingredientes:ingrediente[]) =>{
      this.ingredientes = ingredientes;
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onEditItem(index:number){
    this.router.navigate(['./compras','editar']);
    setTimeout(()=>{
      this.shoppingService.startedEditing.next(index);
    },125)
  }
  editando(){
    this.hakuna = !this.hakuna;
  }
  impressao(){
    window.print();
  }
}