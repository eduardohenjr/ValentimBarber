export interface Cliente {
    id: number;
    nome: string;
    email: string;
    telefone: string;
}

export interface ClienteRequest {
    nome: string;
    email: string;
    telefone: string;
}