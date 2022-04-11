import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { RecipeService } from 'src/app/services/Recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  receita:Recipe[];
  subscription:Subscription
  constructor(private route:ActivatedRoute, private router:Router, private http:DataStorageService) { }
  editar:boolean = false;
  formReceita : FormGroup;
  certainIndex:number;
  editKey:string;
  ngOnInit(): void {
    this.editar = this.router.url.split('/')[2] != 'nova';
    if (this.editar){
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
        this.editKey=Object.getOwnPropertyNames(data[0])[this.certainIndex];
      }
    );
  }
    this.initForm();
    }
  private initForm(){
    let nomeReceita = '';
    let pathImagem = '';
    let descrip = '';
    let receitaIngredientes = new FormArray([])
    if (this.editar){ 
      nomeReceita = this.receita[0].nome;
      pathImagem = this.receita[0].imagePath;
      descrip = this.receita[0].descricao;
      if(this.receita[0]['ingredientes']){
        for( let ingrediente of this.receita[0].ingredientes){
          receitaIngredientes.push(
            new FormGroup({
              'nome': new FormControl(ingrediente.nome,Validators.required),
              'quantia': new FormControl(ingrediente.quantia,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]),
            })
          );
        }
      }
    }
    this.formReceita = new FormGroup({
      'nome': new FormControl(nomeReceita, Validators.required),
      'imagem': new FormControl(pathImagem, Validators.required),
      'descricao': new FormControl(descrip,Validators.required),
      'ingredientes': receitaIngredientes,

      })
    }
    controles(){
      return (<FormArray>this.formReceita.get('ingredientes')).controls
    }
    ngOnDestroy(): void {
      if (this.editar){
      this.subscription.unsubscribe();
    }
    }
    adicionaReceita(){
      const novaReceita = new Recipe(this.formReceita.value.nome,
        this.formReceita.value.descricao,
        this.formReceita.value.imagem,
        this.formReceita.value.ingredientes);
      if (!this.editar){
        this.http.storeRecipes(novaReceita);
      }
      else{
        this.http.editaRecipes(this.editKey,novaReceita);
      }
      this.formReceita.reset();
      this.router.navigate(['/receitas']);
      
    }
    adicionarIngrediente(){
      (<FormArray>this.formReceita.get('ingredientes')).push(
        new FormGroup({
          'nome': new FormControl(null,Validators.required),
          'quantia': new FormControl(null,[Validators.pattern(/^[1-9]+[0-9]*$/), Validators.required]),
        })
      );
    }
    removerIngrediente(i:number){
      (<FormArray>this.formReceita.get('ingredientes')).removeAt(i);
    }
  }  