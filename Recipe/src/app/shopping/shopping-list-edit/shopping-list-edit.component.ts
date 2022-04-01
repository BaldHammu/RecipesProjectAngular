import { 
  Component,
  OnDestroy,
  OnInit, 
  ViewChild, } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SubscribeOnObservable } from 'rxjs/internal-compatibility';
import { ShoppingService } from 'src/app/services/Shopping-List.service';
import { ingrediente } from 'src/app/shared/ingredientes.model';
@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  form : FormGroup;
  adiciona: ingrediente;
  subscription: Subscription;
  modoEdicao = false;
  itemEdicao : number;
  constructor(private shoppingService:ShoppingService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'nome': new FormControl(null),
      'quantia':new FormControl(null)
    });
    this.subscription = this.shoppingService.startedEditing
    .subscribe((data:number)=>{
      this.modoEdicao = true;
      this.itemEdicao = data;
      this.form.setValue({
        'nome': this.shoppingService.itemEditado(data).nome,
        'quantia': this.shoppingService.itemEditado(data).quantia,
      })
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onAddIngrediente(form : NgForm){
    this.adiciona= new ingrediente(form.value.nome, form.value.quantia);
    if(!this.modoEdicao) this.shoppingService.adicionaIngrediente(this.adiciona)  
    else this.shoppingService.editaIngredientes(this.adiciona,this.itemEdicao);
    this.modoEdicao = false;
    form.reset();
 
  }
  limpaIngredientes(){
    this.form.reset();
    this.modoEdicao = false;
  }
  itemDeleta(){
    this.shoppingService.deletaIngredientes(this.itemEdicao);
    this.form.reset();
  }
}
