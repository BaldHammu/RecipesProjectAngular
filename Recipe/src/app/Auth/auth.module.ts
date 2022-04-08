import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { AuthRouterModule } from "./auth-router.module";
import { AuthComponent } from "./auth.component";

@NgModule({
    declarations:[AuthComponent],
    imports:[
        SharedModule,
        AuthRouterModule,
    ],
    exports:[],
})

export class AuthModule{}