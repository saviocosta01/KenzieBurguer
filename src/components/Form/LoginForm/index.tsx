import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import Input from '../Input';
import { UserContext } from '../../../providers/UserContext';
import { StyledParagraph } from '../../../styles/typography';

interface FormDataLogin {
  email: string;
  password: string;
  errors?: string;
}

const LoginForm = () => {
  const LoginFormSchema = yup.object().shape({
    email: yup.string().required('email Obrigatorio'),
    password: yup.string().required('senha Obrigatoria'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataLogin>({
    resolver: yupResolver(LoginFormSchema),
  });

  const { LoginResponse } = useContext(UserContext);

  return (
    <StyledForm onSubmit={handleSubmit(LoginResponse)}>
      <Input
        label='Email'
        placeholder='Digite seu email'
        type='email'
        id='name'
        {...register('email')}
      />
      <StyledParagraph fontColor='red'>{errors.email?.message}</StyledParagraph>
      <Input
        label='senha'
        placeholder='Digite sua senha'
        type='password'
        id='password'
        {...register('password')}
      />
      <StyledParagraph fontColor='red'>{errors.email?.message}</StyledParagraph>
      <StyledButton $buttonSize='default' $buttonStyle='green'>
        Entrar
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
