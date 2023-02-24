import { MdSearch } from 'react-icons/md';
import { useContext, useState } from 'react';
import { StyledSearchForm } from './style';
import { StyledButton } from '../../../styles/button';

import { UserContext } from '../../../providers/UserContext';

const SearchForm = () => {
  const { setSearch } = useContext(UserContext);

  const [searchValue, setSearchvalue] = useState<string>('');

  const onSubmit = (event: any) => {
    event.preventDefault();
    setSearch(searchValue);
  };

  return (
    <StyledSearchForm onSubmit={onSubmit}>
      <input
        type='text'
        placeholder='Digitar pesquisa'
        onChange={(event) => setSearchvalue(event.target.value)}
      />
      <StyledButton type='submit' $buttonSize='medium' $buttonStyle='green'>
        <MdSearch />
      </StyledButton>
    </StyledSearchForm>
  );
};

export default SearchForm;
