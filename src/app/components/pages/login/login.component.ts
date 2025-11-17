import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterRequest } from '../../interfaces/RegisterRequest-interface';
import { AuthService } from '../../services/auth-service.service';
import { LoginRequest } from '../../interfaces/LoginRequest';
import { User } from '../../interfaces/user-interfaces';
import { CommonModule, NgIfContext } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterModule
  ], // Importe ReactiveFormsModule para componentes standalone
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isRegisterMode = false; // false = Login, true = Registrar
loginTpl: TemplateRef<NgIfContext<boolean>> | null | undefined;

  constructor(
    private formBuilder: FormBuilder, 
    private authServices: AuthService,
    
  ) {}

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
    //console.log('Form submitted:', this.loginForm.value);
    // A validação deve verificar se o formulário é INVÁLIDO e parar a execução.
    if (this.loginForm.invalid) {
      // Opcional: Marcar campos como "tocados" para exibir erros na UI
      this.loginForm.markAllAsTouched();
      return;
    }

    if (!this.isRegisterMode) {
      // Modo Login
      const credentials: LoginRequest = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
      
      this.authServices.login(credentials).subscribe({
        next: (user: any) => {
          // A responsabilidade de salvar o usuário já está no AuthService.
          // Não é necessário fazer isso aqui novamente.
          console.log('Login successful:', user);
          // TODO: Redirecionar o usuário para a página principal (dashboard, home, etc.)
        },
        error: (error: any) => {
          console.error('Login failed:', error);
          // TODO: Mostrar uma mensagem de erro para o usuário (ex: "Usuário ou senha inválidos")
        }
      });
    } else {
      // Modo Registro
      const registerCredentials: RegisterRequest = {
        name: this.loginForm.value.name,
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
      this.authServices.register(
        { username: this.loginForm.value.name, password: this.loginForm.value.password },
        { username: this.loginForm.value.name, password: this.loginForm.value.password }
      ).subscribe({
        next: (user: User) => {
          console.log('Registration successful:', user);
          // TODO: Mostrar mensagem de sucesso para o usuário.
          this.toggleMode(); // Switch to login mode after successful registration
          this.loginForm.reset(); // Limpar o formulário
        },
        error: (error: any) => {
          console.error('Registration failed:', error);
          // TODO: Mostrar uma mensagem de erro para o usuário (ex: "Email já cadastrado")
        }
      });
    }
  }
}
