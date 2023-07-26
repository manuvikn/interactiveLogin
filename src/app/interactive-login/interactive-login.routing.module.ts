import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InteractiveLoginComponent } from './interactive-login.component';

const ROUTES: Routes = [
    {
        path: '',
        component: InteractiveLoginComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class InteractiveLoginRoutingModule {}