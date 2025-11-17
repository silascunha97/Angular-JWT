import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterRequest } from '../../interfaces/RegisterRequest-interface';
import { AuthService } from '../../services/auth-service.service';
import { LoginRequest } from '../../interfaces/LoginRequest';
import { User } from '../../interfaces/user-interfaces';
import { CommonModule, NgIfContext } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

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
message: any;
senha: any;
email: any;

  constructor(
    private formBuilder: FormBuilder, 
    private authServices: AuthService,
    private router: Router
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
    this.message = null; // Limpa qualquer mensagem anterior
    
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      // Opcional: Mostrar uma mensagem de erro de validação local
      this.message = { type: 'error', content: 'Por favor, preencha todos os campos corretamente.' };
      return;
    }

    if (!this.isRegisterMode) {
      // Modo Login
      // ... (código de credenciais)

      this.authServices.login({ email: this.loginForm.value.email, password: this.loginForm.value.password }).subscribe({
        next: (user: any) => {
          console.log('Login successful:', user);
          this.router.navigate(['/home']); // Exemplo de redirecionamento
          // 👈 ATRIBUIÇÃO DA MENSAGEM DE SUCESSO
          this.message = { type: 'success', content: 'Login realizado com sucesso!' };
          
          // TODO: Redirecionar o usuário
        },
        error: (error: any) => {
          console.error('Login failed:', error);
          
          // 👈 ATRIBUIÇÃO DA MENSAGEM DE ERRO
          const errorMessage = error.error?.message || 'Erro ao tentar fazer login. Verifique suas credenciais.';
          this.message = { type: 'error', content: errorMessage };
        }
      });
    } else {
      // Modo Registro
      // ... (código de registro)
      
      this.authServices.register(
        { username: this.loginForm.value.name, password: this.loginForm.value.password },
      ).subscribe({
        next: (user: User) => {
          console.log('Registration successful:', user);
          
          // 👈 ATRIBUIÇÃO DA MENSAGEM DE SUCESSO
          this.message = { type: 'success', content: 'Registro efetuado com sucesso! Agora, faça seu login.' };

          this.toggleMode(); // Switch to login mode
          this.loginForm.reset(); 
        },
        error: (error: any) => {
          console.error('Registration failed:', error);
          
          // 👈 ATRIBUIÇÃO DA MENSAGEM DE ERRO
          const errorMessage = error.error?.message || 'Erro ao registrar. Tente outro email.';
          this.message = { type: 'error', content: errorMessage };
        }
      });
    }
  }
}
