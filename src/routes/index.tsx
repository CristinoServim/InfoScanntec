import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { Configuracoes, Login } from '../shared/components';
import { useAuth } from '../shared/contexts/AuthContext';
import { Cadastro } from '../pages/cadastro/Cadastro';
import { Envios } from '../pages/envios/Envios';
import { Home } from '../pages/home/Home';
import ProtectedRoute from './ProtectedRoute';

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
        {
          icon: 'send',
          path: '/envios',
          label: 'Envios',
        },
      ]);
      openDrawer()
    }
  }, [])

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/envios" element={<ProtectedRoute element={<Envios />} />} />
      <Route path="/configuracao" element={<ProtectedRoute element={<Configuracoes />} />} />
      <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
  );
};