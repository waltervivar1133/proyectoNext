export default function ValidarCrearProducto(valores){

  let errores = {};

  if(!valores.nombre){
    errores.nombre = "El nombre es Obligatorio"
  }

  if(!valores.empresa){
    errores.empresa = "El campo empresa es obligatorio"
  }

  if(!valores.url){
    errores.url = "El campo url es obligatorio"
  }else if (
    !/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)){
      errores.url = "Url no valida"
  }

  //validar descripcion

  if(!valores.descripcion){
    errores.descripcion = "agrega una descripcion para tus productos"
  }


  return errores;

}