import type { ReactNode } from "react";
import { createContext, useEffect, useState } from "react";

// Define el tipo del usuario (ajústalo según tu modelo real)
export interface Usuario {
    id: number;
    nombre: string;
    email: string;
    // otros campos opcionales
    [key: string]: any;
}

// Define el tipo del contexto
interface AuthContextType {
    usuario: Usuario | null;
    loading: boolean;
    login: (userData: Usuario) => void;
    logout: () => void;
}

// Crea el contexto con un valor inicial tipo `undefined`
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Tipado de las props del provider
interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const usuarioGuardado = localStorage.getItem("usuario");
        if (usuarioGuardado) {
            setUsuario(JSON.parse(usuarioGuardado));
        }
        setLoading(false);
    }, []);

    const login = (userData: Usuario) => {
        setUsuario(userData);
        localStorage.setItem("usuario", JSON.stringify(userData));
    };

    const logout = () => {
        setUsuario(null);
        localStorage.removeItem("usuario");
    };

    return (
        <AuthContext.Provider value={{ usuario, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
