import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { User } from "../../Auth/user.model";
import { tap } from 'rxjs/operators';
import { Router } from "@angular/router";

export interface AuthResponse {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean,
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject<User>(null);
    token = null;
    private expirationTimer:any;
    constructor(private http: HttpClient, private router:Router) { }
    signup(email: string, senha: string) {
        return this.http
            .post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBLhjAd4qk-FQOsLdldI02ho1_X6M5gZQ8', {
                email: email,
                password: senha,
                returnSecureToken: true,
            }).pipe(tap(res => {
                this.Autenticacao(
                    res.email,
                    res.localId,
                    res.idToken,
                    +res.expiresIn);
            }))
    }
    logout(){
        this.user.next(null);
        this.router.navigate(['/login']);
        localStorage.removeItem('userData');
        if (this.expirationTimer){
            clearTimeout(this.expirationTimer);
        }
        this.expirationTimer = null;
    }
    autoLogout(expiration:number){ 
       this.expirationTimer = setTimeout(()=>{
            this.logout();
        },expiration)

    }
    autoLogin(){
       const userData:{
           email:string,
           id:string,
           _token:string,
           _tokenExpirationDate:string,
       } = JSON.parse(localStorage.getItem('userData'));
       if (!userData){
           return;
       }
       const loadedUser = new User(
           userData.email,
           userData.id,
           userData._token,
           new Date (userData._tokenExpirationDate));
           if (loadedUser.token){
               const timeToExpire = new Date (userData._tokenExpirationDate).getTime() - new Date().getTime();
               this.autoLogout(timeToExpire);
               this.user.next(loadedUser)
           }
    }
    private Autenticacao(email:string, userId:string, token:string, expiresIn:number){
        const expirationDate = new Date(
            new Date().getTime() + expiresIn * 1000);
        const user = new User(
            email,
            userId,
            token,
            expirationDate);
            this.user.next(user);
            this.autoLogout(expiresIn * 1000);
            localStorage.setItem('userData',JSON.stringify(user))
    }
    login(email: string, password: string) {
        return this.http
            .post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBLhjAd4qk-FQOsLdldI02ho1_X6M5gZQ8', {
                email: email,
                password: password,
                returnSecureToken: true,
            }).pipe(tap(res=>{
                this.Autenticacao(
                    res.email,
                    res.localId,
                    res.idToken,
                    +res.expiresIn);
            }))
    }
}