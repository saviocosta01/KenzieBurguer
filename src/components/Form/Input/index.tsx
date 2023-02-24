import { forwardRef } from 'react';

import { StyledTextField } from '../../../styles/form';

interface InputProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, placeholder, id, type, ...rest }, ref) => (
    <fieldset>
      <StyledTextField
        label={label}
        type={type}
        id={id}
        ref={ref}
        {...rest}
        placeholder={placeholder}
      />
    </fieldset>
  )
);

export default Input;
