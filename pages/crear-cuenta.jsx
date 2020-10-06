
import React , {useState} from 'react';
import {css} from '@emotion/core';
import Router from 'next/router'
import styled from '@emotion/styled';
import Layout from '../components/layouts/Layout';
import {Formulario, Campo , InputSubmit , Error} from '../components/ui/Formulario';
import firebase from '../firebase';

//validaciones

import useValidacion from '../hooks/useValidacion';
import ValidarCrearCuenta from '../validacion/ValidarCrearCuenta';


const CentradoTotal = styled.div`
display : flex;
width: 100vw;
height: 50vh;
align-items: center;
justify-content:center;

`; 
const STATE_INICIAL =  {
  nombre : '',
  email : '',
  password : ''
}

const CrearCuenta = () => {

  const [error , guardarError ] = useState(false);

  const { valores, errores, handleChange,handleSubmit, handleBur
  } = useValidacion(STATE_INICIAL,ValidarCrearCuenta, crearCuenta);

  const { nombre , email, password } = valores;

  async function crearCuenta (){
    try {
      await firebase.registrar(nombre,  email, password);
      Router.push('/login')
    } catch (error) {
      console.error('Hubo un error',error.message);
      guardarError(error.message);
    }
 
  }
  return ( 
    <Layout>
      
        <h1 css={css`
          display:flex;
          justify-content:center;
          margin-top: 5rem;
        `}>Crear Cuenta</h1>
<CentradoTotal>
        <Formulario onSubmit={handleSubmit} noValidate>
          <Campo>
              <label htmlFor="nombre">Nombre</label>
              <input type="text"
                      id="nombre"
                      placeholder="Tu nombre"
                      name="nombre"
                      value={nombre}
                      onChange={handleChange}
                      onBlur={handleBur}/>
          </Campo>
  {errores.nombre && <Error>{errores.nombre}</Error>} 
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
                  value="crear cuenta"
                  />
        </Formulario>
        </CentradoTotal>
    </Layout>
   );
}
 
export default CrearCuenta;

