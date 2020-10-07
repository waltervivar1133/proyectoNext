import styled from '@emotion/styled';

export const Formulario = styled.form`

  width: 50%;
  height:auto;
  @media(max-width:1200px){
    width: 70%;
  }
  @media (max-width: 900px){
    width:90%;
  }
  fieldset {
    border-radius : 10px;
    border: 1px solid #e1e1e1;
    font-size: 2rem;
  }
`;

export const Campo = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
 
  
    label{
       flex:0 0 150px;
       font-size: 1.8rem;
       font-weight: 700;
    }
    input, textarea, select{
      flex: 1;
      padding:1rem;
    }

    textarea{
      height: 200px;
    }
`;

export const InputSubmit = styled.input`
    background-color: var(--naranja);
    width: 100%;
    padding: 1.5rem;
    text-align: center;
    color: white;
    font-size:1.8rem;
    text-transform: uppercase;
    border: none;
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;
    border-radius:0.5rem;
    &:hover {
      cursor: pointer;
    }
`;

export const Error = styled.p`
    background : red;
    padding: 1rem;
    font-family:'PT Sans', sans-serif;
    font-weight: 700;
    color : white;
    font-size: 1.4rem;
    text-transform: uppercase;
    margin: 1rem 0;
    border-radius: 0.5rem;
`;
