import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";
import { ShoppingComponent } from "./shopping.component";

const routes:Routes = [
    {
        path: '', component: ShoppingComponent, children:[
            {
                path:'editar', component:ShoppingListEditComponent,
            },
        ],
    },
    
]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShoppingRouter{}