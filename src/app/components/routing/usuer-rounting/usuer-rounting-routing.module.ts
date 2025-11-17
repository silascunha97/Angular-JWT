import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../pages/login/login.component';
export const routes: Routes = [
   {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full',
        title: 'login'
    },
   {
        path: '',
        loadComponent: () => import('../../pages/home/home.component').then(m => m.HomeComponent),
        title: 'home'
    },

   {
        path: '',
        loadComponent: () => import('../../pages/login/login.component').then(m => m.LoginComponent),
        title: 'login'

    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuerRountingRoutingModule { }
