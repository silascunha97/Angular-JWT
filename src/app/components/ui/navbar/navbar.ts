import { Component, OnInit } from '@angular/core';
import { AuthServices } from '../../services/auth-services';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements OnInit {
   
  isLoggedIn = false;
  userName: string | null = "Teste User";
  dropdownOpen = false;

  constructor(private authServices: AuthServices) {}

  ngOnInit(): void {
    this.authServices.currentUser.subscribe(user => {
      this.isLoggedIn = !!user;
      this.userName = user ? user.name : null;
    });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    this.authServices.logout();
    this.dropdownOpen = false;
  }

  // verifica se o usuario está logado
  login() {
    // A lógica de login é tratada na página de login, não aqui.
    // Este método pode ser removido ou redirecionar para a página de login.
  }
}
