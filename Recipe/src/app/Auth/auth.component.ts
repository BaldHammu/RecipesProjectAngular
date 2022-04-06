import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService, AuthResponse } from "../services/Auth/auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
    selector: 'app-auth',
    templateUrl:'./auth.component.html',
})
export class AuthComponent implements OnInit{
    authForm: FormGroup 
    erro:string = null;
    modoLogin = true;
    isLoading = false;
    constructor( private auth:AuthService , private router:Router){}
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
            this.isLoading = false;
            })
        this.authForm.reset();
    }
}