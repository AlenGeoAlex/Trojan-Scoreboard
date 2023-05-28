export interface LoginInput {
    username : string;
    password : string;
}

export interface LoginData {
    jwt : string | undefined
    timestamp : number
}