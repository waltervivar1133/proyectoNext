export default function ValidarCrearCuenta(valores){

  let errores = {};

  if(!valores.nombre){
    errores.nombre = "El nombre es Obligatorio"
  }

  if(!valores.email){
    errores.email = "El Email es Obligatorio"
  }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)){
    errores.email = "Email no valido"
  }
  if(!valores.password){
    errores.password = "El password es Obligatorio"
  }else if( valores.password.length < 6){
    errores.password = "El password debe tener al menos 6 caracteres"

  }
  return errores;

}