import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  
  isLogged = false;

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin() {
    const token = sessionStorage.getItem('authToken');
    this.isLogged = !!token; // true se existir token
  }

}
