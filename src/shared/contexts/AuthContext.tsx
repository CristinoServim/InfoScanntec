// AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';

// Defina o tipo para o usuário
type User = {
    empresa: number;
    local: number;
    usuario: string;
    senha: string;
    intervaloSincronizacao: number;
    horaFechamento: string;
    urlBase: string;
    urlRecebimento: string;
    urlEnvio: string;
    lojasAtivas: any
};

type AuthContextType = {
    usuarioLogado: User | null;
    gravarUsuario: (userData: User) => void;
    limparUsuario: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [usuarioLogado, setUsuarioLogado] = useState<User | null>(() => {
        // Tente recuperar as informações do usuário do localStorage ao inicializar
        const usuarioSalvo = localStorage.getItem('usuarioLogado');
        return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
    });

    const gravarUsuario = (userData: User) => {
        // Atualize o estado
        setUsuarioLogado(userData);

        // Armazene as informações no localStorage como JSON
        localStorage.setItem('usuarioLogado', JSON.stringify(userData));
    };

    const limparUsuario = () => {
        // Limpe o estado
        setUsuarioLogado(null);

        // Remova as informações do localStorage
        localStorage.removeItem('usuarioLogado');
    };

    // Use useEffect para atualizar o localStorage sempre que o usuário mudar
    useEffect(() => {
        if (usuarioLogado) {
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
        } else {
            localStorage.removeItem('usuarioLogado');
        }
    }, [usuarioLogado]);

    return (
        <AuthContext.Provider value={{ usuarioLogado, gravarUsuario, limparUsuario }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};
