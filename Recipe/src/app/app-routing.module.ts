import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";


const routes:Routes=[
    {
        path:'', redirectTo: '/login', pathMatch: 'full'
    },
    {
        path:'receitas', loadChildren: ()=> import('./recipes/recipes.module').then(m=>m.RecipesModule),
    },
    {
        path:'login', loadChildren: ()=> import('./Auth/auth.module').then(m=>m.AuthModule),
    },
    {
        path:'compras', loadChildren: ()=> import('./shopping/shopping.module').then(m=>m.ShoppingModule),
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule{
    
}