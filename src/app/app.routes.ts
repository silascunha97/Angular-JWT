import { Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./components/pages/login/login.component').then(m => m.LoginComponent),
        title: 'Login'
    },
    
];
