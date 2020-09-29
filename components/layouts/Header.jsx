import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import {css} from '@emotion/core';

import Buscar from '../ui/Buscar';
import Nav from './Nav';
import Boton from '../ui/Boton';



const ContenedorHeader = styled.div`
    max-width : 1200px;
    width: 95%;
    margin: 0 auto;
    @media (min-width:768px){
        display:flex;
        justify-content:space-between;
    }
`;

const Logo = styled.p`
    color: var(--naranja);
    font-size: 4rem;
    line-height: 0;
    font-family: 'Roboto Slab', serif;
    font-weight:700;
    margin-right: 2rem;
`;


const Header = () => {

    const usuario = false;
    
  return ( 

    <header
    css={css`
        border-bottom : 2px solid var(--gris3);
        padding: 1rem 0;
    `}
    >
        <ContenedorHeader>
            <div css={css`
                display:flex;
                align-items:center;
                justify-content:center;
            `}>
                <Link href="/">
                    <Logo>P</Logo>
                </Link>
               

               <Buscar/>
               <Nav/>

            </div>
            <div css={css`
            
                display:flex;
             
                align-items: center;
                justify-content:center;
            `}
            >
              { usuario ? (
                  <>

                     <p
                     css={css`
                         margin-right:1rem;
                     `}
                    >Hola: Walter</p>
                    <Boton bgColor="true"
                    >Cerrar Sesion</Boton>
                 </> 
              ):    
              <>
                <Link href="/login">
                <Boton
                    bgColor="true"
                >Login</Boton>
                  </Link>
                <Link href="/crear-cuenta">
                    <Boton>Crear Cuenta</Boton>
                </Link>  
              </>
            }
            
            </div>
        </ContenedorHeader>
    </header>
   );
}
 
export default Header;