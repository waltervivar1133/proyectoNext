

import Layout from '../components/layouts/Layout'
import React ,{useEffect , useState, useContext}from 'react';
import {FirebaseContext} from '../firebase';
//components
import DetallesProducto from '../components/layouts/DetalleProducto'
import Loader from '../components/ui/Loader';



const Home= () => {

const [productos , guardarProductos] = useState([]);

const { firebase } = useContext(FirebaseContext);

useEffect(() => {
  const obtenerProductos = () => {
      firebase.db.collection('productos').orderBy('creado', 'desc').onSnapshot(manejarSnapshot)
  }
  obtenerProductos()
}, [])

function manejarSnapshot(snapshot){
  const productos = snapshot.docs.map(doc =>{
    return {
      id: doc.id,
      ...doc.data()
    }
  });

  guardarProductos(productos)
}

  return (
    <div>
      <Layout>
          {Object.keys(productos).length === 0 ? <Loader/>
          :
            (<div className="listado-productos">
            <div className="contenedor">
              <ul className="bg-white">
                  {productos.map(producto =>(
                    <DetallesProducto
                      key = {producto.id}
                      producto = {producto}
                    />
                  ))}
              </ul>
            </div>
        </div>)}
      </Layout>
     
     
    </div>
  )
}

export default Home;
