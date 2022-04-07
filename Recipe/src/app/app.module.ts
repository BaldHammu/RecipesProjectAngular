import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header/header.component';
import { ShoppingListEditComponent } from './shopping/shopping-list-edit/shopping-list-edit.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NodetailsComponent } from './recipes/nodetails/nodetails.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthComponent } from './Auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading.component';
import { AuthInterceptorService } from './services/Auth/auth-interceptor.service';
import { SharedAlertComponent } from './shared/alert/alert.component';
import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';
import { RecipesModule } from './recipes/recipes.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListEditComponent,
    ShoppingComponent,
    DropdownDirective,
    NodetailsComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    SharedAlertComponent,
    PlaceholderDirective
   
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RecipesModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass:AuthInterceptorService,
    multi:true}],
  bootstrap: [AppComponent],
  entryComponents:[
    SharedAlertComponent,
  ]
})

export class AppModule { }
