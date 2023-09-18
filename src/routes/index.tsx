import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext, useLoginContext } from '../shared/contexts';
import { FerramentasDeConfiguracao, Login } from '../shared/components';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();
  const { setLoginOptions } = useLoginContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/pagina-inicial',
        label: 'Página inicial',
      },
      {
        icon: 'settings',
        path: '/configuracao',
        label: 'Configuração',
      },
    ]);

  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Login />} />
      <Route path="/configuracao" element={<FerramentasDeConfiguracao />} />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};