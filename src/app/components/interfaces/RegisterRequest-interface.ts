import { password, username, email } from "../types/usuers-types";

export interface RegisterRequest {
    name: username;
    email: email; // Corrigido de 'mail' para 'email' para consistência
    password: password;
}