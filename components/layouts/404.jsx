import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

const Title = styled.h1`
  display: flex;
  font-weight: 700;
  justify-content: center;
  align-items: center;
`;
const CentradoTotal = styled.div`

display : flex;
width: 100%;
height: 80vh;
align-items: center;
justify-content:center;

`; 
const ButtonReturn = styled.button`
  width : 100%;
  height: auto;
  border: none;
  border-radius: 1rem;
  color : white;
  background: var(--naranja);
  display: flex;
  font-weight: 700;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
`
const Error404 = () => {
  return ( 
 
    <CentradoTotal>
      <div>
      <Title> Producto no existente!</Title>
      <Link href="/">
        <ButtonReturn>
            Regresar a home
        </ButtonReturn>
        
      </Link>
      </div>
  
    </CentradoTotal>
  
  );
}
 
export default Error404;