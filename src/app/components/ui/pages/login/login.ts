import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServices } from '../../../services/auth-services';
import { LoginRequest } from '../../../interfaces/LoginRequest';
import { RegisterRequest } from '../../../interfaces/register-request';
import { L } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  isRegisterMode = false; // false = Login, true = Registrar

  constructor(private formBuilder: FormBuilder, private authServices: AuthServices) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
  }

  onSubmit(): void {
    if (!this.loginForm) {
      console.error('Form not initialized');
      return;
    }

    if (!this.loginForm.valid) {
    if (!this.isRegisterMode) {
      const credentials: LoginRequest = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
      this.authServices.login(credentials).subscribe({
        next: (user) => {
          // The AuthServices handles setting the current user and localStorage
          localStorage.setItem('currentUser', JSON.stringify(user));
          
          console.log('Login successful:', user, localStorage.getItem('currentUser'));
        },
        error: (error) => {
          // Caso de erro no login

          console.error('Login failed:', error);
        }
      });
    } else {
      const registerCredentials: RegisterRequest = {
        name: this.loginForm.value.name,
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
      this.authServices.register(registerCredentials).subscribe({
        next: (user) => {
          console.log('Registration successful:', user);
          this.toggleMode(); // Switch to login mode after successful registration
          this.loginForm.reset(); // Clear the form
        },
        error: (error) => {
          console.error('Registration failed:', error);
        }
      });
    }
    }

    
  }
}
