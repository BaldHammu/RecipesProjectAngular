import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingComponent } from "./shopping/shopping.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { ShoppingListEditComponent } from "./shopping/shopping-list-edit/shopping-list-edit.component";
import { NodetailsComponent } from "./recipes/nodetails/nodetails.component";
import { receitaResolver } from "./services/recipe-resolver.service";

const routes:Routes=[
    {
        path:'', redirectTo: '/receitas', pathMatch: 'full'
    },
    {
        path: 'receitas', component: RecipesComponent, children:[
            {
                path: '', component: NodetailsComponent,
            },
            {
                path: 'nova', component: RecipeEditComponent, 
            },
            {
                path: 'detalhes/:nome', component: RecipeDetailComponent, resolve:{receita:receitaResolver},
            },  
            {
                path: 'detalhes/:nome/editar', component: RecipeEditComponent, resolve:{receita:receitaResolver},
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
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{
    
}