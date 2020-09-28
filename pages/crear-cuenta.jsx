
import React from 'react';
import {css} from '@emotion/core';
import Layout from '../components/layouts/Layout';
import {Formulario, Campo , InputSubmit} from '../components/ui/Formulario';

//validaciones

import useValidacion from '../hooks/useValidacion';
import ValidarCrearCuenta from '../validacion/validar';

const STATE_INICIAL =  {
  nombre : '',
  email : '',
  password : ''
}

const CrearCuenta = () => {

  const {
    valores,
    errores,
    submitForm,
    handleChange,
    handleSubmit
  } = useValidacion(STATE_INICIAL,ValidarCrearCuenta, crearCuenta)

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

        <Formulario>
          <Campo>
              <label htmlFor="nombre">Nombre</label>
              <input type="text"
                      id="nombre"
                      placeholder="Tu nombre"
                      name="nombre"/>
          </Campo>
          <Campo>
              <label htmlFor="email">Correo Electronico</label>
              <input type="email"
                      id="email"
                      placeholder="Tu correo"
                      name="email"/>
          </Campo>
          <Campo>
              <label htmlFor="password">Contraseña</label>
              <input type="password"
                      id="password"
                      placeholder="Tu contraseña"
                      name="password"/>
          </Campo>

          <InputSubmit type="submit" 
                  value="crear cuenta"/>
        </Formulario>
    </Layout>
   );
}
 
export default CrearCuenta;

