export type password = {
    password: string;
}
export type username = {
    username: string;
}
export type token = {
    token: string;
}
export type email = {
    email: string;
}
export type usuersTypes = password & username & token & email;