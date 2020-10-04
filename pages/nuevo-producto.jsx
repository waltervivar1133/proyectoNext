
import React , {useState, useContext }  from 'react';
import {css} from '@emotion/core';
import Router, {useRouter} from 'next/router'
import styled from '@emotion/styled';
import Layout from '../components/layouts/Layout';
import {Formulario, Campo , InputSubmit , Error} from '../components/ui/Formulario';
import {FirebaseContext} from '../firebase';

//validaciones

import useValidacion from '../hooks/useValidacion';
import ValidarCrearProducto from '../validacion/ValidarCrearProducto';


const CentradoTotal = styled.div`
display : flex;
witdh: 100vw;
heigth: 100vh;
align-items: center;
justify-content:center;

`; 
const STATE_INICIAL =  {
  nombre : '',
  empresa : '',
  // imagen : '',
  url : '',
  descripcion : '',
}


const NuevoProducto = () => {

  const [error , guardarError ] = useState(false);

  const { valores, errores, handleChange,handleSubmit, handleBur
  } = useValidacion(STATE_INICIAL,ValidarCrearProducto, crearProducto);

  const { nombre ,  empresa , url, descripcion } = valores;

  // hook de routing para direccionar

  const router = useRouter();

  // context con la operaciones crud de fireabase de

    const {usuario , firebase} = useContext(FirebaseContext)

  async function crearProducto (){
    
    // si el usuario no esta autenticado llevar al login

    if(!usuario){
      return router.push('/login');
    }
    const producto = {

      nombre ,
      empresa,
      url,
      descripcion,
      votos: 0,
      comentarios:[],
      creado : Date.now()
    }


    //insertar base de datos

      firebase.db.collection('productos').add(producto);

  }
  return ( 
    <Layout>
      
        <h1 css={css`
          display:flex;
          justify-content:center;
          margin-top: 5rem;
        `}>Nuevo Producto</h1>
<CentradoTotal>
        <Formulario onSubmit={handleSubmit} noValidate>
          <fieldset>
            <legend>
              Informacion General
            </legend>
       
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
              <label htmlFor="empresa">Empresa</label>
              <input type="text"
                      id="empresa"
                      placeholder="Empresa o compañia"
                      name="empresa"
                      value={empresa}
                      onChange={handleChange}
                      onBlur={handleBur}/>
          </Campo>
  {errores.empresa && <Error>{errores.empresa}</Error>} 
           {/* <Campo>
              <label htmlFor="imagen">Imagen</label>
              <input type="file"
                      id="imagen"
                      name="imagen"
                      value={imagen}
                      onChange={handleChange}
                      onBlur={handleBur}/>
          </Campo>
  {errores.imagen && <Error>{errores.imagen}</Error>}  */}
          <Campo>
              <label htmlFor="url">URL</label>
              <input type="url"
                      id="url"
                      placeholder="Coloca tu URL"
                      name="url"
                      value={url}
                      onChange={handleChange}
                      onBlur={handleBur}/>
          </Campo>
  {errores.url && <Error>{errores.url}</Error>} 

  </fieldset>

  <fieldset>
    <legend>Sobre tu producto</legend>
    <Campo>
              <label htmlFor="descripcion">Descripcion</label>
              <textarea 
                      id="descripcion"
                      name="descripcion"
                      value={descripcion}
                      onChange={handleChange}
                      onBlur={handleBur}/>
          </Campo>
  {errores.descripcion && <Error>{errores.descripcion}</Error>} 
  </fieldset>
          
          
          {error && <Error>{error}</Error>}
          <InputSubmit type="submit" 
                  value="crear producto"
                  />
        </Formulario>
        </CentradoTotal>
    </Layout>
   );
}
 
export default NuevoProducto;