import React ,{useEffect, useState, useContext }from 'react';
import {useRouter}  from 'next/router';
import {FirebaseContext} from '../../firebaseDatos';
import Error404 from '../../components/layouts/404';
import Layout from '../../components/layouts/Layout';
import {css} from '@emotion/core';
import styled from '@emotion/styled';
import Loader from '../../components/ui/Loader'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';  // para la hora
import {es } from 'date-fns/locale';
import {Campo , InputSubmit} from '../../components/ui/Formulario';
import Boton from '../../components/ui/Boton';

const ContenedorProducto = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;

const CreadorProducto = styled.p`
  padding: .5rem 2rem;
  background-color : #DA552F;
  color: #fff;
  text-transform : uppercase;
  font-weight : bold;
  display: inline-block;
  text-align:center;
`;

const productos = () => {
  // state del componente 

  const [producto , guardarProducto] = useState({});
  const [error, guardarError] =useState(false);
  const [comentario , guardarComentario]  = useState({});
  const [consultarDB, guardarConsultarDB] = useState(true);
  // para obtener el id de userouter
  const router = useRouter();

  const {query : {id} } = router;
  // console.log(id);

  const { firebase, usuario } = useContext(FirebaseContext);

  

  useEffect(() => {
    if(id && consultarDB){
        const ObtenerProducto = async () => {
          const productoQuery = await firebase.db.collection('productos').doc(id);
          const producto = await productoQuery.get();
          if(producto.exists){
            guardarProducto(producto.data());
            guardarConsultarDB(false)
          }else {
            guardarError(true);
            guardarConsultarDB(false)

          }
        }
        ObtenerProducto()
    }
  }, [id])



  const { comentarios, creado, descripcion , empresa , nombre, url, urlimagen , votos, creador, votado  } = producto

  const votarProducto = () => {
    if(!usuario ) {
      return router.push('/login');
    } 

    // obtener votos y sumar votos
    const nuevoTotal = votos + 1;

    //validar que el usuario actual ha votado
    if(votado.includes(usuario.uid)) return ;

    // guardar el id del usuario que ha votado
    const votados = [ ...votado , usuario.uid];

    // actualizar la bd

    firebase.db.collection('productos').doc(id).update({votos: nuevoTotal , votado : votados});

    // actualizar state
    guardarProducto({
      ...producto,
      votos : nuevoTotal,
      votado: votados
    })

    guardarConsultarDB(true);
  }

  const comentarioChange = e => {
    guardarComentario({
      ...comentario,
      [e.target.name] : e.target.value
    })
  }

  // indentifca si el comentario es del creador del producto
  const esCreador = id => {
    if(creador.id == id){
      return true;
    }
  }


  const agregarComentario = e => {
    e.preventDefault();
    if(!usuario){
      return router.push('/login');
    }

    //comentario extra

    comentario.usuarioId = usuario.uid;
    comentario.usuarioNombre = usuario.displayName;

    // tomar copia de los comentarios y agregarlos

    const nuevosComentarios = [ ...comentarios , comentario]

    //actualizar BD
    firebase.db.collection('productos').doc(id).update({
      comentarios: nuevosComentarios
    })

    // actualizar el state

    guardarProducto({
      ...producto,
      comentarios: nuevosComentarios
    })
    guardarConsultarDB(true);
  }

  const BorrarProducto = () => {
    if(!usuario ){
      return false;
    }
    if(creador.id === usuario.uid){
      return true;
    }

  }
  const eliminarProducto = async() => {

    if(!usuario){
      return router.push('/login');
    }
    if(creador.id !== usuario.uid){
      return router.push('/');
    }

    try {
     await firebase.db.collection('productos').doc(id).delete();
     router.push('/')
    } catch (error) {
      console.log(error);
    }
  }
  return ( 
      <Layout>
        <>
        { error && <Error404/>}

        { Object.keys(producto).length === 0  ? <Loader/> :
        (

          <div className="contenedor">
          <h1 css={css`
            text-align:center;
            margin-top:5rem;
          `}>
            {nombre}
          </h1>
          <ContenedorProducto>
              <div>
              <p>Publicado hace : {formatDistanceToNow (new Date(creado), {locale:es}) }</p>
              <img src={urlimagen}/>
              <p>{descripcion}</p>
              <p>Creado por <span css={css`
                font-weight:700;
                font-style: italic;
              `}>{creador.nombre}</span>  de <span css={css`
                font-weight:700;
                font-style: italic;
              `}>{empresa} </span>  </p>

              
             {usuario  && (
               <>
               <h2>Agrega tu comentario</h2>
               
                <form onSubmit={agregarComentario}>
                 
                <Campo>
                    <input type="text"
                    name ="mensaje"
                    placeholder="Ingresa tu comentario"
                    onChange={comentarioChange}
                    />
                </Campo>
                
                 <InputSubmit 
                 type="submit"
                  value="Agregar comentario"
                />  
              </form>
              </>
             )}
             <h2 css={css`
                margin: 2rem 0;
              `}>Comentarios</h2>
              {comentarios.length === 0 ? "Aun no hay Comentarios" : (
                <ul>
                {comentarios.map((comentario, i)=>(
                  
                      <li
                        key={`${comentario.usuarioId}-${i}`}
                        css={css`
                          border: 1px solid #e1e1e1;
                          padding: 1.5rem;
                        `}
                        >
                        <p>{comentario.mensaje}</p>
                        <p>escrito por: <span css={css`
                        font-weight:bold;`
                      }>{comentario.usuarioNombre}</span></p>
                      { esCreador (comentario.usuarioId) && <CreadorProducto>Es Creador</CreadorProducto>}
                      </li>
                ))}
                </ul>
              )}
              
              </div>
              <aside>
                <Boton
                  target="_blank"
                  bgColor="true"
                  href={url}>
                  Visitar Url
                </Boton>
                <p css={css`
                  text-align:center;
                `}>Votos {votos}</p>

                { usuario && (
                <Boton
                  onClick={votarProducto}
      
                 >
                   Votar
                 </Boton>)}
                
              </aside>
          </ContenedorProducto>
                  {BorrarProducto() && 
                  <Boton
                    onClick={eliminarProducto}
                  >Eliminar Producto</Boton> }
      </div>
        )}
        </>
       
      </Layout>
        
   );
}
 
export default productos;