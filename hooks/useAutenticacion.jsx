import React, {useEffect, useState} from 'react'
import firebase from '../firebase';


function useAutenticacion(){

  const [usuarioAutenticado , guardarUsarioAutenticado] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged(usuario => {
      if(usuario){
        guardarUsarioAutenticado(usuario);
      }else{
        guardarUsarioAutenticado(null);
      }
    });

    return () => unsubscribe();
    
    
  }, []);

  return usuarioAutenticado;
}

export default useAutenticacion;