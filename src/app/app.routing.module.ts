import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const ROUTES: Routes = [
    {
        path: 'interactive-login',
        loadChildren: () => import('./interactive-login/interactive-login.module').then(m => m.InteractiveLoginModule)
    }, 
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'interactive-login'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule {}