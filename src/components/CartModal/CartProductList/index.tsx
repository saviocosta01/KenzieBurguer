import { useContext } from 'react';
import CartProductCard from './CartProductCard';

import { StyledCartProductList } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph } from '../../../styles/typography';
import { CartContext } from '../../../providers/CartContext';

const CartProductList = () => {
  const { RemoveAllProducts, SomaTotal, cart } = useContext(CartContext);
  return (
    <StyledCartProductList>
      <ul>
        <CartProductCard />
      </ul>
      {cart.length > 0 && (
        <>
          <div className='totalBox'>
            <StyledParagraph>
              <strong>Total</strong>
            </StyledParagraph>
            <StyledParagraph className='total'>
              R$ {SomaTotal.toFixed(2)}
            </StyledParagraph>
          </div>
          <StyledButton
            $buttonSize='default'
            $buttonStyle='gray'
            onClick={RemoveAllProducts}
          >
            Remover todos
          </StyledButton>
        </>
      )}
    </StyledCartProductList>
  );
};

export default CartProductList;
