// classe que comunica Player com a DB e login
// "?" significa opcional

export class User{
    uid?: string; // login
    did?: string; // player/dados lógicos
    nome: string;
    email: string;
    senha: string;

    // dados lógicos:
    cartasInventario: number[];
    cartasEquipadas: number[];
    moedasAcumuladas: number;
    moedasTotais: number;
}

export interface UserResponse{
    result?: {
        email?: string;
        uid?: string;
    };

    error?: {
        code?: string;
        message?: string;
    };
}