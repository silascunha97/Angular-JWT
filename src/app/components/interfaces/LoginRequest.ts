import { email, password } from "../types/usuers-types";

export interface LoginRequest {
    email: email;
    password: password;
}