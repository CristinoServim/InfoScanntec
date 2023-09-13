import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useDrawerContext } from '../shared/contexts';
import { Dashboard } from '../pages';
import { Login } from '../shared/components';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

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
      <Route path="/configuracao" element={<Dashboard />} />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};