import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './otherComponents/header/header.component';
import { ShoppingListEditComponent } from './shopping/shopping-list-edit/shopping-list-edit.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { NodetailsComponent } from './recipes/nodetails/nodetails.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthComponent } from './Auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading.component';
import { AuthInterceptorService } from './services/Auth/auth-interceptor.service';
import { SharedAlertComponent } from './shared/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListEditComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipesComponent,
    ShoppingComponent,
    DropdownDirective,
    RecipeEditComponent,
    NodetailsComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    SharedAlertComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass:AuthInterceptorService,
    multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
