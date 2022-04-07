import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { DataStorageService } from 'src/app/services/data-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth = false;
  userSub:Subscription;
  collapsed=true;
  @Output() menuItem= new EventEmitter<string>();

  constructor( private envia:DataStorageService, private auth:AuthService) { 
  }

  ngOnInit(): void {
    this.userSub=this.auth.user.subscribe( res =>{
      this.isAuth = !!res;
    })
  }
  selecionaMenu(item:string){
    this.menuItem.emit(item);
  }
   enviarReceitas(){
     this.envia.storeRecipes();
   }
   getReceitas(){
     this.envia.buscaRecipes().subscribe();
   }
   onLogout(){
    this.auth.logout();
  }
   ngOnDestroy(): void {
     this.userSub.unsubscribe();
   }
}
