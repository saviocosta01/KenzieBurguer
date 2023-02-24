import { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { UserContext, Products } from './UserContext';

interface typeChildren {
  children: React.ReactNode;
}

interface TypeContext {
  isOppen: boolean;
  setIsOppen: React.Dispatch<React.SetStateAction<boolean>>;
  addCard: (product: Products) => void;
  cart: Products[];
  RemoveCart: (deletedProduct: Products) => void;
  RemoveAllProducts: () => void;
  SomaTotal: number;
}

export const CartContext = createContext<TypeContext>({} as TypeContext);

export const CartProvider = ({ children }: typeChildren) => {
  const CartLS = localStorage.getItem('@CartItens');
  const [isOppen, setIsOppen] = useState(false);
  const [cart, setCart] = useState<Products[]>(
    CartLS ? JSON.parse(CartLS) : ([] as Products[])
  );
  const { SearchProducts } = useContext(UserContext);

  const addCard = (product: Products) => {
    const findProduct = SearchProducts.find(
      (element) => element.id === product.id
    );

    if (findProduct) {
      const filterCart = cart.filter(
        (element) => findProduct.id === element.id
      );

      if (filterCart.length < 1) {
        setCart([...cart, product]);
        toast.success('Produto Adicionado ao carrinho');
      } else {
        toast.error('produto ja adicionado');
      }
    }
  };

  const RemoveCart = (deletedProduct: Products) => {
    const RemoveItem = cart.filter(
      (product) => product.id !== deletedProduct.id
    );
    setCart(RemoveItem);
    toast.error('Produto removido');
  };

  const RemoveAllProducts = () => {
    setCart([]);
    toast.error('Você removeu todos os produtos');
  };

  const SomaTotal = cart.reduce(
    (accumulador, CurrentValue) => accumulador + CurrentValue.price,
    0
  );

  useEffect(() => {
    localStorage.setItem('@CartItens', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        isOppen,
        setIsOppen,
        addCard,
        cart,
        RemoveCart,
        RemoveAllProducts,
        SomaTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
