import { useContext } from 'react';
import { StyledProductCard } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph, StyledTitle } from '../../../styles/typography';
import { UserContext } from '../../../providers/UserContext';
import { CartContext } from '../../../providers/CartContext';

const ProductCard = () => {
  const { SearchProducts } = useContext(UserContext);
  const { addCard } = useContext(CartContext);

  return (
    <>
      {SearchProducts.map((product) => (
        <StyledProductCard key={product.id}>
          <div className='imageBox'>
            <img src={product.img} alt='Hamburguer' />
          </div>
          <div className='content'>
            <StyledTitle tag='h3' $fontSize='three'>
              {product.name}
            </StyledTitle>
            <StyledParagraph className='category'>
              {product.category}
            </StyledParagraph>
            <StyledParagraph className='price'>
              R${product.price},00
            </StyledParagraph>
            <StyledButton
              $buttonSize='medium'
              $buttonStyle='green'
              onClick={() => addCard(product)}
            >
              Adicionar
            </StyledButton>
          </div>
        </StyledProductCard>
      ))}
    </>
  );
};

export default ProductCard;
