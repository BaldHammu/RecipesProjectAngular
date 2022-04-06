import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingComponent } from "./shopping/shopping.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { ShoppingListEditComponent } from "./shopping/shopping-list-edit/shopping-list-edit.component";
import { NodetailsComponent } from "./recipes/nodetails/nodetails.component";
import { receitaResolver } from "./services/recipe-resolver.service";
import { AuthComponent } from "./Auth/auth.component";
import { AuthGuard } from "./services/Auth/auth.guard";

const routes:Routes=[
    {
        path:'', redirectTo: '/login', pathMatch: 'full'
    },
    {
        path: 'receitas',canActivate:[AuthGuard], component: RecipesComponent, children:[
            {
                path: '', component: NodetailsComponent,
            },
            {
                path: 'nova', component: RecipeEditComponent, 
            },
            {
                path: ':nome', component: RecipeDetailComponent, resolve:[receitaResolver],
            },  
            {
                path: ':nome/editar', component: RecipeEditComponent, resolve:[receitaResolver],
            },
            {
                path:'editar', component: RecipeEditComponent,
            },
        ],
    },
    {
        path: 'compras', component: ShoppingComponent, children:[
            {
                path:'editar', component:ShoppingListEditComponent,
            },
        ],
    },
    {
        path: 'login', component:AuthComponent,
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{
    
}