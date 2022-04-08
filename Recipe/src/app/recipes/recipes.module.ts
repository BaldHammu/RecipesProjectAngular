import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeRouter } from "./recipe-routing.module";
import { RecipesComponent } from "./recipes.component";

@NgModule({
    declarations:[
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipesComponent,
        RecipeEditComponent,
    ],
    imports:[
        RouterModule,
        SharedModule,
        RecipeRouter,
    ],
})
export class RecipesModule {}