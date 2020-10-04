import React, {useState,useEffect} from 'react';


const useValidacion = (stateInicial, validar, fn) => {

  const [valores, guardarValores] = useState(stateInicial);
  const [errores, guardarErrores] = useState({});
  const [submitForm, guardarSubmitForm] = useState(false);

  useEffect(() => {
    if(submitForm){
      const noErrores = Object.keys(errores).length === 0;
      if(noErrores){
        fn(); // Fn = funcion que se ejecuta en el componente
      }
      guardarSubmitForm(false);
    }
  },[errores]);

  // funcion que se ejecuta conforme el usuario escribe algo
  const handleChange = e =>{
    guardarValores({
      ...valores,
      [e.target.name] : e.target.value
    })
  }

  // funcion que se ejecuta cuando el usuario hace submit 

  const handleSubmit = e =>{
    e.preventDefault();

    const erroresValidacion = validar(valores);
    guardarErrores(erroresValidacion);
    guardarSubmitForm(true);
  }
  // cuando se realiza el event de blur  permite validar en tiempo real cuando sales del input
  const handleBur = () => {
    const erroresValidacion = validar(valores);
    guardarErrores(erroresValidacion);
  }



  return {
    valores,
    errores,
    submitForm,
    handleChange,
    handleSubmit,
    handleBur
  }
}
 
export default useValidacion;