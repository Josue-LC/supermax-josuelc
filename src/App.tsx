import Header from './components/Header';
import SectionMall from './components/SectionMall';
import Footer from './components/Footer';
import ArticuloCarrito from './components/ArticuloCarrito';
import { useState } from 'react';
import { productosMall } from './data/products-mall';
import { sectionMallItems } from './data/sections-mall';
import { useCarrito } from './hooks/useCarrito';



function App() {

  const [tipoProducto, setTipoProducto] = useState("")
  const {carrito, agregarAlCarrito, eliminarDelCarrito, incrementarCantidad, disminuirCantidad, vaciarCarrito, carritoVacio, carritoTotal, datosProductos} = useCarrito()

  return (
    <> 
      <Header
        datosProductos={datosProductos}
        carrito={carrito}
        agregarAlCarrito={agregarAlCarrito}
        eliminarDelCarrito={eliminarDelCarrito}
        vaciarCarrito={vaciarCarrito}
        carritoVacio={carritoVacio}
        carritoTotal={carritoTotal}
        incrementarCantidad={incrementarCantidad}
        disminuirCantidad={disminuirCantidad}
        
      />
      
      <div className=' max-w-7xl m-auto'>
        <img src="/public/frosty-friends-new-1.png" alt="Banner" />
      </div>

      <section className=' max-w-7xl m-auto my-10'>
        <div className=' grid grid-cols-3 md:grid-cols-6 gap-5'>
          {sectionMallItems.map((seccion) => (
            <SectionMall
              key={seccion.id}
              seccion={seccion}
              setTipoProducto = {setTipoProducto}
            />
          ))}
        </div>
      </section>

      {tipoProducto ? (
        <div className=' mb-5 text-center'>
          <h2 className=' text-3xl font-bold capitalize'>{tipoProducto}</h2>
        </div>
      ) : null}


      <section className=' max-w-7xl my-10 m-auto'>
        <div className=' grid grid-cols-1 md:grid-cols-3 gap-5'>
          {productosMall.filter((producto) => producto.section === tipoProducto)
          .map((producto) => (
            <ArticuloCarrito 
              key={producto.id}
              producto={producto}
              agregarAlCarrito={agregarAlCarrito}
            />
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}

export default App
