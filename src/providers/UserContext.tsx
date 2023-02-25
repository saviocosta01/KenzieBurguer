import { useNavigate } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';

interface TypeChildren {
  children: React.ReactNode;
}

interface LoginUser {
  email: string;
  password: string;
  id?: number;
}

interface RegisterUser {
  email: string;
  password: string;
  name: string;
}

export interface Products {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

interface TypeContext {
  user: LoginUser[];
  RegiterResponse: (data: RegisterUser) => void;
  LoginResponse: (data: LoginUser) => void;
  listProducts: Products[];
  Logout: () => void;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  SearchProducts: Products[];
  search: string;
  SearchClear: () => void;
}

export const UserContext = createContext<TypeContext>({} as TypeContext);

export const UserProvider = ({ children }: TypeChildren) => {
  const [user, setUser] = useState<LoginUser[]>([] as LoginUser[]);
  const [listProducts, setListProducts] = useState<Products[]>(
    [] as Products[]
  );
  const [search, setSearch] = useState<string>('');

  const navigate = useNavigate();

  const SearchProducts = listProducts.filter((product) =>
    search === ''
      ? true
      : product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase())
  );

  const RegiterResponse = async (data: RegisterUser) => {
    try {
      const response = await api.post('/users', data);

      navigate('/');
      toast.success('conta crianda com sucesso');
    } catch (error) {
      toast.error('Ops! algo deu errado');
    }
  };

  const autoLogin = async () => {
    const token = localStorage.getItem('@TOKEN');

    if (token) {
      try {
        const response = await api.get('/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setListProducts(response.data);
        navigate('/shop');
      } catch (error) {
        toast.error('Ops! algo deu errado');
      }
    }
  };

  const LoginResponse = async (data: LoginUser) => {
    try {
      const response = await api.post('/login', data);
      setUser(response.data.user);
      localStorage.setItem('@TOKEN', response.data.accessToken);
      localStorage.setItem('@USER', JSON.stringify(response.data.user));
      autoLogin();
      toast.success('Login feito com sucesso');
      navigate('/shop');
    } catch (error) {
      toast.error('Email ou senha incorretos');
    }
  };

  useEffect(() => {
    const Token = localStorage.getItem('@TOKEN');
    if (Token) {
      autoLogin();
    }
  }, []);

  const Logout = () => {
    navigate('/');
    localStorage.clear();
  };

  const SearchClear = () => {
    setSearch('');
  };

  return (
    <UserContext.Provider
      value={{
        user,
        RegiterResponse,
        LoginResponse,
        listProducts,
        Logout,
        setSearch,
        SearchProducts,
        search,
        SearchClear,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
