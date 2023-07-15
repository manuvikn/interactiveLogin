import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InteractiveLoginRoutingModule } from "./interactive-login.routing.module";
import { InteractiveLoginComponent } from "./interactive-login.component";
import { MainComponent } from "./components/main/main.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        InteractiveLoginRoutingModule
    ],
    exports: [],
    declarations: [
        InteractiveLoginComponent,
        MainComponent
    ],
    providers: []
})
export class InteractiveLoginModule {}