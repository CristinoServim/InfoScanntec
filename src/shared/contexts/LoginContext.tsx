
import { createContext, useCallback, useContext, useState } from 'react';

interface IloginOption {
  icon: string;
  path: string;
  label: string;
}

interface IloginOptionData {
  isLoginOpen: boolean;
  toggleloginOpen: () => void;
  loginOptions: IloginOption[];
  setLoginOptions: (newLoginOptions: IloginOption[]) => void;
}

const LoginContext = createContext({} as IloginOptionData);

export const useLoginContext = () => {
  return useContext(LoginContext);
};

interface IloginOptionProps {
  children: React.ReactNode
}
export const LoginProvider: React.FC<IloginOptionProps> = ({ children }) => {
  const [loginOptions, setloginOptions] = useState<IloginOption[]>([]);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const toggleloginOpen = useCallback(() => {
    setIsLoginOpen(oldLoginOpen => !oldLoginOpen);
  }, []);

  const handleSetLoginOptions = useCallback((newLoginOptions: IloginOption[]) => {
    setloginOptions(newLoginOptions);
  }, []);

  return (
    <LoginContext.Provider value={{ isLoginOpen, loginOptions, toggleloginOpen, setLoginOptions: handleSetLoginOptions }}>
      {children}
    </LoginContext.Provider>
  );
};