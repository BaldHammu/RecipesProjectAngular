import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ingrediente } from "../shared/ingredientes.model";
@Injectable({providedIn:'root'})

export class ShoppingService{
    adicionaIngredientes = new Subject<ingrediente[]>()
    startedEditing = new Subject<number>()
    private ingredientes: ingrediente[]= [
        new ingrediente('maçãs',5),
        new ingrediente('Tomates',10),
        new ingrediente ('Yakult',17),
      ];
      
    adicionaIngrediente(ingredienteInput:ingrediente){
    this.ingredientes.push(ingredienteInput);
    this.adicionaIngredientes.next(this.ingredientes.slice())
    
    }
    getIngredients(){
        return this.ingredientes.slice()
}
    adicionaIngredient(Ingredientes:ingrediente[]){
        this.ingredientes.push(...Ingredientes);
        this.adicionaIngredientes.next(this.ingredientes.slice())
    }
    editaIngredientes(ingrediente:ingrediente, index:number){
        this.ingredientes[index] = ingrediente;
        this.adicionaIngredientes.next(this.ingredientes.slice()) 
    }
    deletaIngredientes(index){
        this.ingredientes.splice(index,1);
        this.adicionaIngredientes.next(this.ingredientes.slice())
    }
    itemEditado(index:number){
        return this.ingredientes[index];
    }
}