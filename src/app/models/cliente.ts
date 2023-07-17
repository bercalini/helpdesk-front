export interface Cliente {
    id?: any,
    cpf: string;
    nome: string;
    email: string;
    senha: string;
    perfis: string[];
    dataCriacao: string;
}