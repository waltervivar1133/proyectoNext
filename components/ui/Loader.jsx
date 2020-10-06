import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';


const CentradoTotal = styled.div`
display : flex;
width: 100%;
height: 100vh;
align-items: center;
justify-content:center;

`; 
const RippleContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  color: orange;
 
`;

const animation = keyframes`
 
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }`;

const RippleChildren = styled.div`
  position: absolute;
  border: 4px solid orange;
  opacity: 1;
  border-radius: 80%;
  animation: ${animation} 0.9s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  &:nth-of-type(2) {
  animation-delay: -0.5s;
  }
`;


const Loader = () => {
  return (

    <CentradoTotal>
      <RippleContainer >
        <RippleChildren>
        </RippleChildren>
        <RippleChildren>
        </RippleChildren>
      </RippleContainer>
    </CentradoTotal>
    );
}
 
export default Loader;