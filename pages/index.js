

import Layout from '../components/layouts/Layout'
import React from 'react';

//components
import DetallesProducto from '../components/layouts/DetalleProducto'
import Loader from '../components/ui/Loader';
import useProductos from '../hooks/useProductos';


const Home= () => {

 const {productos} = useProductos('creado');

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
