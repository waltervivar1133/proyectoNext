
import React from 'react';
import {css} from '@emotion/core';
import styled from '@emotion/styled';
import Layout from '../components/layouts/Layout';
import {Formulario, Campo , InputSubmit , Error} from '../components/ui/Formulario';

//validaciones

import useValidacion from '../hooks/useValidacion';
import ValidarCrearCuenta from '../validacion/validar';


const CentradoTotal = styled.div`
display : flex;
witdh: 100vw;
heigth: 100vh;
align-items: center;
justify-content:center;

`; 
const STATE_INICIAL =  {
  nombre : '',
  email : '',
  password : ''
}

const CrearCuenta = () => {

  const { valores, errores, handleChange,handleSubmit, handleBur
  } = useValidacion(STATE_INICIAL,ValidarCrearCuenta, crearCuenta);

  const { nombre , email, password } = valores;

  function crearCuenta (){
    console.log('creando cuenta')
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
          <InputSubmit type="submit" 
                  value="crear cuenta"
                  />
        </Formulario>
        </CentradoTotal>
    </Layout>
   );
}
 
export default CrearCuenta;

