import { useContext } from 'react';
import ProductCard from './ProductCard';
import { StyledProductList, DivSeach } from './style';
import { UserContext } from '../../providers/UserContext';

const ProductList = () => {
  const { search, SearchClear } = useContext(UserContext);
  return (
    <>
      {search && (
        <DivSeach>
          <h2>
            Resultado para: <span>{search}</span>
          </h2>
          <button type='button' onClick={SearchClear}>
            Limpar busca
          </button>
        </DivSeach>
      )}
      <StyledProductList>
        <ProductCard />
      </StyledProductList>
    </>
  );
};

export default ProductList;
