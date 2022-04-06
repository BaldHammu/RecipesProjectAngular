import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { take, exhaustMap} from 'rxjs/operators';
import { AuthService } from "./auth.service";

@Injectable()

export class AuthInterceptorService implements HttpInterceptor{
    constructor(private auth:AuthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.auth.user.pipe(take(1), exhaustMap(res=>{
            if (!res){
                return next.handle(req);
            }
            const modReq = req.clone({params: new HttpParams().set('auth',res.token)})
        return next.handle(modReq);
    }));
}}