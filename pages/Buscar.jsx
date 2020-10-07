import React , {useEffect , useState} from 'react';
import Layout from '../components/layouts/Layout';
import {useRouter} from 'next/router';
import DetallesProducto from '../components/layouts/DetalleProducto';
import  useProductos from '../hooks/useProductos';


const Buscar = () => {

  const router =  useRouter();
  const {query: { q } }  = router;

  const {productos} = useProductos('creado');
  const [resultado , guardarResultado] = useState([]);

  useEffect(() => {
    const busqueda = q.toLowerCase();
    const filtro = productos.filter( producto => {
      return (
        producto.nombre.toLowerCase().includes(busqueda) || producto.descripcion.toLowerCase().includes(busqueda)
      )
    });
    guardarResultado(filtro)

  },[q,productos])
  return ( 
    <Layout>
          {Object.keys(resultado).length === 0 ? `no hay ese producto!`          :
            (<div className="listado-productos">
            <div className="contenedor">
              <ul className="bg-white">
                  {resultado.map(producto =>(
                    <DetallesProducto
                      key = {producto.id}
                      producto = {producto}
                    />
                  ))}
              </ul>
            </div>
        </div>)}
      </Layout>
   );
}
 
export default Buscar;