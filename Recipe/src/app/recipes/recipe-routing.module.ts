import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../services/Auth/auth.guard";
import { receitaResolver } from "../services/recipe-resolver.service";
import { NodetailsComponent } from "./nodetails/nodetails.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipesComponent } from "./recipes.component";
const routes: Routes= [
    {
        path: '',canActivate:[AuthGuard], component: RecipesComponent, children:[
            {
                path: '',
                component: NodetailsComponent,
            },
            {
                path: 'nova',
                component: RecipeEditComponent, 
            },
            {
                path: ':nome',
                component: RecipeDetailComponent,
                resolve:[receitaResolver],
            },  
            {
                path: ':nome/editar',
                component: RecipeEditComponent,
                resolve:[receitaResolver],
            },
            {
                path:'editar',
                component: RecipeEditComponent,
            },
        ],
    }

]
@NgModule({
    declarations: [],
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule],
})

export class RecipeRouter {}