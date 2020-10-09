import '../styles/globals.css';
import App from 'next/app';
import useAutenticacion from '../hooks/useAutenticacion';

import firebase , {FirebaseContext} from '../firebaseDatos'

const MyApp = props => {
  const usuario = useAutenticacion();
  const {Component, pageProps } = props;

  return(

    <>
    <FirebaseContext.Provider
      value={{
        firebase,
        usuario
      }}
    >
      <Component {...pageProps} />
    </FirebaseContext.Provider>
    </>
  )
}


export default MyApp
