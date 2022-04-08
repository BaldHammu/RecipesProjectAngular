
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "../app-routing.module";
import { SharedModule } from "../shared/shared.module";
import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";
import { ShoppingRouter } from "./shopping-routing.module";
import { ShoppingComponent } from "./shopping.component";

@NgModule({
    declarations:[
        ShoppingListEditComponent,
        ShoppingComponent,
    ],
    imports:[
        SharedModule,
        ShoppingRouter,
    ],    
})
export class ShoppingModule {}