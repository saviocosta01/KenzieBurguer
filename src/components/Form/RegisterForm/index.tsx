import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from 'react';
import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';

import { UserContext } from '../../../providers/UserContext';
import { StyledParagraph } from '../../../styles/typography';

export interface FormData {
  email: string;
  password: string;
  name: string;
}

const RegisterForm = () => {
  const formSchema = yup.object().shape({
    email: yup.string().required('email obrigatorio').email('email invalido'),
    password: yup
      .string()
      .matches(/[a-z]/, 'Deve conter ao menos 1 letra minuscula')
      .matches(/(\d)/, 'Deve conter ao menos 1 numero')
      .matches(/[A-Z]/, 'Deve conter ao menos 1 letra maiúscula')
      .matches(/(\W|_)/, 'Deve conter no minimo 1 caracter especial')
      .matches(/.{8,}/, 'Deve conter no minimo 8 caracters'),
    name: yup.string().required('nome obrigatorio'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
  });

  const { RegiterResponse } = useContext(UserContext);
  return (
    <StyledForm onSubmit={handleSubmit(RegiterResponse)}>
      <Input
        label='nome'
        id='name'
        type='text'
        placeholder='Digite seu nome'
        {...register('name')}
      />
      <StyledParagraph fontColor='red'>{errors.name?.message}</StyledParagraph>
      <Input
        label='email'
        id='email'
        type='email'
        placeholder='Digite seu email'
        {...register('email')}
      />
      <StyledParagraph fontColor='red'>{errors.email?.message}</StyledParagraph>
      <Input
        label='senha'
        id='password'
        type='password'
        placeholder='Digite uma senha'
        {...register('password')}
      />
      <StyledParagraph fontColor='red'>
        {errors.password?.message}
      </StyledParagraph>
      <Input
        label='repita sua senha'
        id='password2'
        type='password'
        placeholder='Digite novamente sua senha'
        {...register('password')}
      />
      <StyledParagraph fontColor='red'>
        {errors.password?.message}
      </StyledParagraph>
      <StyledButton $buttonSize='default' $buttonStyle='gray'>
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
