import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { DropdownDirective } from "../directives/dropdown.directive";
import { SharedAlertComponent } from "../shared/alert/alert.component";
import { LoadingSpinnerComponent } from "../shared/loading-spinner/loading.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";

@NgModule({
    declarations:[
        SharedAlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective,
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule
    ],
    exports:[
        SharedAlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective,
        CommonModule,
        ReactiveFormsModule,
    ],
    entryComponents:[
        SharedAlertComponent,
    ],
})

export class SharedModule{}