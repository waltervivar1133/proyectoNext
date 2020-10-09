import React , {useContext} from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import {FirebaseContext} from '../../firebaseDatos'




const Navegacion = styled.nav`
  padding-left: 2rem;

    a{
      font-size: 1.8rem;
      margin-left: 2rem;
      color: var(--gris2);
      font-family: 'PT Sans', san serif;
        &:last-of-type{
          margin-right:0;
        }
    }

    @media (max-width: 525px){
      display: none;
      
    }

`
const Nav = () => {

  const { usuario} = useContext(FirebaseContext);

  return (  
    <Navegacion>
      <Link href="/">Inicio</Link>
      <Link href="/populares">Populares</Link>
      { usuario && (      

      <Link href="/nuevo-producto">Nuevo Producto</Link>
      
      )}
 
    </Navegacion>
    
  );
}
 
export default Nav;