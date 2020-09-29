import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';


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
  return (  
    <Navegacion>
      <Link href="/">Inicio</Link>
      <Link href="/populares">Populares</Link>
      <Link href="/nuevo-producto">Nuevo Producto</Link>
    </Navegacion>
    
  );
}
 
export default Nav;