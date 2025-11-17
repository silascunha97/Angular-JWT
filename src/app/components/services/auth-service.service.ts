import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user-interfaces';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { api } from '../env/api';
import { map, Observable, tap } from 'rxjs';
import { LoginRequest } from '../interfaces/LoginRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Define a classe de serviço que será exportada para uso em outros módulos.
  // É um Serviço Angular, geralmente injetável (`@Injectable`), embora a anotação não esteja aqui.

  private currentUserSubject = new BehaviorSubject< User>({} as User);
  
// Declara uma propriedade privada chamada `currentUserSubject`.
// Ela é um `BehaviorSubject` do RxJS, que armazena o estado atual do usuário (`User`).
// Um `BehaviorSubject` é um tipo especial de `Observable` que **mantém o último valor** emitido.
// Ele é inicializado com um objeto `User` vazio (`{} as User`).
// O uso de `Subject` permite que outros componentes se inscrevam para receber notificações quando o estado do usuário mudar.

  constructor(private httpClient: HttpClient) { 

    // O construtor é chamado quando o serviço é instanciado.
    // Ele injeta o `HttpClient` do Angular, usado para fazer requisições HTTP (como login e registro).

    const userJson = sessionStorage.getItem('currentUser');

    // Tenta obter o JSON do usuário que pode ter sido salvo na `sessionStorage` (armazenamento de sessão do navegador)
    // na chave 'currentUser' durante uma sessão anterior.

    if (userJson) {

    // Verifica se o valor foi encontrado (ou seja, se o usuário estava logado na sessão anterior).

      this.currentUserSubject.next(JSON.parse(userJson));
    // Se encontrado, converte a string JSON de volta para um objeto JavaScript (`User`)
    // e emite esse objeto para o `BehaviorSubject`, restaurando o estado de login do usuário.

    }
  }

  login(credentials: LoginRequest, ): Observable<User> {
    
    // Método para realizar o login do usuário, recebendo um objeto `credentials` com nome de usuário e senha.
    // Retorna um `Observable<User>`, pois é uma operação assíncrona que resultará no objeto de usuário.
    
    return this.httpClient.post(api.Url + 'login', {

      // Faz uma requisição HTTP POST para a URL de login (`api.Url + 'login'`).
      // O corpo da requisição envia o `email` (mapeado de `credentials.username`) e a `password`.

      email: credentials.email,
      password: credentials.password
    }).pipe(

      // Usa o operador `pipe` do RxJS para encadear operadores no `Observable` retornado pelo POST.

      tap((credentials: any) => {

        // O operador `tap` permite executar efeitos colaterais (como salvar o usuário) sem modificar os valores do Observable.
        // Ele é executado se a chamada POST for bem-sucedida.
        
        const user: User = {
          // Cria um novo objeto `User` a partir da resposta da API (assumindo que a resposta contenha `username`, `password` e `token`).
          // **Nota Pertinente:** O nome da variável de entrada `credentials: any` aqui é um pouco confuso, pois parece ser a *resposta* da API.
          username: credentials.username,
          password: credentials.password,
          token: credentials.token
        };
        this.currentUserSubject.next(user);
        // Emite o novo objeto de usuário para todos os inscritos no `currentUserSubject`, atualizando o estado de login.
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        return console.log('User logged in and saved to sessionStorage:', user, "\n " + credentials.token);
      })
    );    
  }

  register(data: { username: string; password: string; }, p0: { username: any; password: any; }): Observable<User>   {

    // Método para registrar um novo usuário, recebendo nome de usuário e senha.
    // Retorna um `Observable<User>`.

    return this.httpClient.post<User>(api.Url + 'register', {

      // Faz uma requisição HTTP POST para a URL de registro (`api.Url + 'register'`).
      // O `<User>` é o tipo esperado para a resposta.

      username: data.username,
      password: data.password

      // Envia o nome de usuário e senha no corpo da requisição.
    });
    // **Nota Pertinente:** Diferente do `login`, este método não atualiza o `currentUserSubject` ou salva o usuário na `sessionStorage`.
// É comum que o registro seja seguido por um login explícito ou que a API de registro retorne tokens de login.
  }

  isAutenticated(): Observable<boolean> {
    //return !!this.currentUserSubject.value.token;

    // Método que retorna um `Observable<boolean>` indicando se o usuário está autenticado.
    //return !!this.currentUserSubject.value.token;
    // Linha comentada: Retorna instantaneamente se o token existe no valor atual do Subject.
    // **Nota Pertinente:** O uso do `Observable` na linha a seguir é preferível, pois permite que componentes se inscrevam e sejam notificados **automaticamente** sobre mudanças no estado de autenticação (ex: após logout).

    return this.currentUserSubject.asObservable()

    // Obtém a versão `Observable` do `BehaviorSubject` para que outros componentes possam se inscrever.

      .pipe(map(user => !!user.token)

    // Usa o operador `map` para transformar o objeto `User` em um booleano:
    // `!!user.token` retorna `true` se o objeto `user` tiver uma propriedade `token` que é *truthy* (não `null`, não `undefined`, não string vazia) e `false` caso contrário.

    );
  }

  logout(): void {
    // Método para realizar o logout do usuário.
    this.currentUserSubject.next({} as User);
    // Emite um objeto `User` vazio para o `BehaviorSubject`, efetivamente limpando o estado do usuário logado.
    sessionStorage.removeItem('currentUser');
    // Remove o item 'currentUser' da `sessionStorage`, garantindo que o estado de login não persista após o logout.
  }

  get currentUserValue(): Observable<User> {
    // Um **getter** (propriedade acessada como `service.currentUserValue`) que retorna um `Observable<User>`.
    return this.currentUserSubject.asObservable();
    // Retorna o `Observable` do `BehaviorSubject`.
    // Este é o mecanismo padrão para permitir que componentes **leiam** o estado atual do usuário e sejam notificados sobre futuras alterações, sem dar a eles acesso direto para *modificar* o `Subject`.
  }
}
  