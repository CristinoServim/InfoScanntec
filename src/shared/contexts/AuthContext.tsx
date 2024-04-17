import { createContext, useContext, useState, useEffect } from 'react';
import { extrairHora } from '../../functions/ExtrairHora';

export type Usuario = {
    iap_codempresaapi: number;
    iap_local: number;
    loj_cnpj: string;
    usu_codigo: string;
    usu_apelido: string,
    iap_usuario: string,
    iap_senha: string;
    iap_intervalosinc: number;
    iap_horafechamento: string;
    iap_urlbase: string;
    iap_urlpromocao: string;
    iap_urlenvio: string;
    token: string
};

type AuthContextType = {
    usuarioLogado: Usuario | null;
    gravarUsuario: (userData: Usuario) => void;
    limparUsuario: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [usuarioLogado, setUsuarioLogado] = useState<Usuario | null>(() => {
        // Tente recuperar as informações do usuário do sessionStorage ao inicializar
        const usuarioSalvo = sessionStorage.getItem('usuarioLogado');
        return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
    });

    const gravarUsuario = (userData: Usuario) => {
        userData.iap_horafechamento = extrairHora(userData.iap_horafechamento)
        setUsuarioLogado(userData);
        sessionStorage.setItem('usuarioLogado', JSON.stringify(userData));
    };

    const limparUsuario = () => {
        setUsuarioLogado(null);
        sessionStorage.removeItem('usuarioLogado');
    };

    useEffect(() => {
        if (usuarioLogado) {
            sessionStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
        } else {
            sessionStorage.removeItem('usuarioLogado');
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
