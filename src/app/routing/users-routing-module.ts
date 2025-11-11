import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../components/guards/auth/auth-guard';
import { LoginGuard } from '../components/guards/login/login-guards-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    // Alterado de loadComponent para loadChildren para carregar um NgModule.
    // Isso assume que você tem um LoginModule que declara e exporta o componente Login.
    loadChildren: () => import('../components/ui/pages/login/login').then(m => m.Login),
    canActivate: [LoginGuard] // Protege a rota de login
  },
  {
    path: 'home',
    // Ajustando para carregar um HomeModule, que é a prática padrão para lazy loading com NgModules.
    loadChildren: () => import('../components/ui/pages/home/home').then(m => m.Home),
    canActivate: [AuthGuard] // Protege a rota home
  },
  // Adicione outras rotas protegidas aqui, como 'profile', 'settings', etc.
  // Ex: { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class UsersRoutingModule { }
