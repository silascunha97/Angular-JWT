
import { NgModule } from '@angular/core';

import { App } from './app';
import { AuthServices } from './components/services/auth-services';
import { Login } from './components/ui/pages/login/login';

// Angular Material Modules

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

//angular material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/ui/navbar/navbar';
import { UsersRoutingModule } from './routing/users-routing-module';
import { Home } from './components/ui/pages/home/home';
import { UsersModule } from './modules/Users-module';



@NgModule({
  declarations: [
    App,
    Login,
    Navbar,
    Home
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    RouterOutlet,
    // Angular Material Modules
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    UsersModule
  ],
  providers: [
    AuthServices
  ],
  bootstrap: [App]
})
export class AppModule { }
