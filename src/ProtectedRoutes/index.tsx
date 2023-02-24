import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { CartProvider } from '../providers/CartContext';

export const ProtectedRoutes = () => {
  const tokenLs = localStorage.getItem('@TOKEN');
  const navigate = useNavigate();

  useEffect(() => {
    if (!tokenLs) {
      navigate('/');
    }
  }, []);

  return <CartProvider>{tokenLs ? <Outlet /> : null}</CartProvider>;
};
