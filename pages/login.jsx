
import React , {useState} from 'react';
import {css} from '@emotion/core';
import Router from 'next/router'
import styled from '@emotion/styled';
import Layout from '../components/layouts/Layout';
import {Formulario, Campo , InputSubmit , Error} from '../components/ui/Formulario';
import firebase from '../firebaseDatos';

//validaciones

import useValidacion from '../hooks/useValidacion';
import ValidarCrearCuenta from '../validacion/ValidarIniciarSesion';

const CentradoTotal = styled.div`
display : flex;
width: 100%;
height: 50vh;
align-items: center;
justify-content:center;

`; 

const STATE_INICIAL =  {

  email : '',
  password : ''
}


const Login = () => {

  const [error , guardarError ] = useState(false);

  const { valores, errores, handleChange,handleSubmit, handleBur
  } = useValidacion(STATE_INICIAL,ValidarCrearCuenta, iniciarSesion);

  const {  email, password } = valores;

  async function iniciarSesion(){
    try {
     const usuario = await firebase.login(email, password);
      Router.push('/');
      console.log(usuario);
    } catch (error) {
      console.log('Hubo un error en incicar sesion', error.message);
      guardarError(error.message);
    }
  }
  return ( 
    <Layout>
      
        <h1 css={css`
          display:flex;
          justify-content:center;
          margin-top: 5rem;
        `}>Iniciar Sesión</h1>
<CentradoTotal>
        <Formulario onSubmit={handleSubmit} noValidate>
          
          <Campo>
              <label htmlFor="email">Correo Electronico</label>
              <input type="email"
                      id="email"
                      placeholder="Tu correo"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      onBlur={handleBur}/>
          </Campo>
          {errores.email && <Error>{errores.email}</Error>} 
          <Campo>
              <label htmlFor="password">Contraseña</label>
              <input type="password"
                      id="password"
                      placeholder="Tu contraseña"
                      name="password"
                      value={password}
                      onChange={handleChange}
                      onBlur={handleBur}/>
          </Campo>
          {errores.password && <Error>{errores.password}</Error>} 
          {error && <Error>{error}</Error>}
          <InputSubmit type="submit" 
                  value="Iniciar Sesión"
                  />
        </Formulario>
        </CentradoTotal>
    </Layout>
   );
}
 
 
export default Login;