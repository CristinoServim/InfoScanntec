import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { Configuracoes, Login } from '../shared/components';
import { Home } from '../pages/home/Home';
import { useAuth } from '../shared/contexts/AuthContext';
import { Cadastro } from '../pages/cadastro/Cadastro';
import { Envios } from '../pages/envios/Envios';

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
      <Route path="/envios" element={<Envios />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/configuracao" element={<Configuracoes />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};