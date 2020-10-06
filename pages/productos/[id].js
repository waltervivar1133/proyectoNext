import React ,{useEffect, useState, useContext}from 'react';
import {useRouter}  from 'next/router';
import {FirebaseContext} from '../../firebase';
import Error404 from '../../components/layouts/404';
import Layout from '../../components/layouts/Layout';
import {css} from '@emotion/core';
import styled from '@emotion/styled';
import Loader from '../../components/ui/Loader'


const Producto = () => {
  // state del componente 

  const [producto , guardarProducto] = useState({});
  const [error, guardarError] =useState(false);

  // para obtener el id de userouter
  const router = useRouter();

  const {query : {id} } = router;
  // console.log(id);

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    if(id){
        const ObtenerProducto = async () => {
          const productoQuery = await firebase.db.collection('productos').doc(id);
          const producto = await productoQuery.get();
          if(producto.exists){
            guardarProducto(producto.data());
          }else {
            guardarError(true);
          }
        }
        ObtenerProducto()
    }
  }, [id])

  if(Object.keys(producto).length === 0) return <Loader/>
  
  const { nombre } = producto;
  return ( 
      <Layout>
        <>
        { error && <Error404/>}

        <div className="contenedor">
            <h1 css={css`
              text-align:center;
              margin-top:5rem;
            `}>
              {nombre}
            </h1>
        </div>
        </>
       
      </Layout>
        
   );
}
 
export default Producto;