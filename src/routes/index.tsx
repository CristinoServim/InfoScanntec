import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { FerramentasDeConfiguracao, Login } from '../shared/components';
import { Home } from '../pages/Home/Home';
import { useAuth } from '../shared/contexts/AuthContext';
import { Cadastro } from '../pages/cadastro/Cadastro';

export const AppRoutes = () => {
  const { setDrawerOptions, openDrawer } = useDrawerContext();
  const { usuarioLogado } = useAuth()

  useEffect(() => {
    if (usuarioLogado) {
      setDrawerOptions([
        {
          icon: 'home',
          path: '/home',
          label: 'Home',
        },
        {
          icon: 'settings',
          path: '/configuracao',
          label: 'Configurações',
        },
      ]);
      openDrawer()
    }
  }, [])
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/configuracao" element={<FerramentasDeConfiguracao />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};