import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService, AuthResponse } from "../services/Auth/auth.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { SharedAlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
    selector: 'app-auth',
    templateUrl:'./auth.component.html',
})
export class AuthComponent implements OnInit,OnDestroy{
    authForm: FormGroup 
    erro:string = null;
    modoLogin = true;
    isLoading = false;
    private newSub:Subscription;
    @ViewChild(PlaceholderDirective,{static:false}) alertHost:PlaceholderDirective;
    constructor( private auth:AuthService , private router:Router, private ComponentFactoryResolver:ComponentFactoryResolver){}
    mudaModo(){
        this.modoLogin = !this.modoLogin   
    }
    ngOnInit(): void {
        
    this.authForm = new FormGroup({
        'email': new FormControl(null,[Validators.required, Validators.email]),
        'senha': new FormControl(null,[Validators.required,Validators.minLength(6)]),
    })
    }
    fechaErro(){
        this.erro = null;
        console.log(this.erro);
    }
    fullSend(){
        let obs:Observable<AuthResponse>;
        if (!this.authForm.valid) return;
            this.isLoading = true;
        if(this.modoLogin){
          obs = this.auth.login(this.authForm.value.email,this.authForm.value.senha);
        }else{
         obs = this.auth.signup(this.authForm.value.email,this.authForm.value.senha);
        }   
        obs.subscribe(res =>{
           console.log(res);
            this.isLoading = false;
            this.router.navigate(['/receitas'])
            }, error=>{
            this.erro = error.error.error.message;
            this.showErrorAlert(error.error.error.message);
            this.isLoading = false;
            })
        this.authForm.reset();
    }
    private showErrorAlert(something:string){
        const hostViewContainerRef =  this.alertHost.viewContainerRef;
        hostViewContainerRef.clear()
        const compRef = hostViewContainerRef.createComponent(SharedAlertComponent);
        compRef.instance.mensagem = something;
        this.newSub = compRef.instance.fechar.subscribe(()=>{
            hostViewContainerRef.clear();
        })
    }
    ngOnDestroy(): void {
        this.newSub.unsubscribe();
    }   
}