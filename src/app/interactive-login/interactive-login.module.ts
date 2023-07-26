import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InteractiveLoginRoutingModule } from "./interactive-login.routing.module";
import { InteractiveLoginComponent } from "./interactive-login.component";
import { MainComponent } from "./components/main/main.component";
import { FormComponent } from "./components/form/form.component";
import { CommentBoxComponent } from "./components/comment-box/comment-box.component";

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
        MainComponent,
        FormComponent,
        CommentBoxComponent
    ],
    providers: []
})
export class InteractiveLoginModule {}