/** Componente del Header, elementos HTML del carrito y del buscador **/

import { useState } from "react"
import { Producto } from "../types/index-types"

type HeaderProps = {
    datosProductos: Producto[],
    agregarAlCarrito: (articulo : Producto) => void,
    carrito: Producto[],
    eliminarDelCarrito: (id: Producto["id"]) => void,
    vaciarCarrito: () => void,
    carritoVacio: boolean,
    carritoTotal: number,
    incrementarCantidad: (id: Producto["id"]) => void,
    disminuirCantidad: (id: Producto["id"]) => void
}


export default function Header({datosProductos, carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito, incrementarCantidad, disminuirCantidad, carritoVacio, carritoTotal} : HeaderProps) {

    const [carritoVisible, setCarritoVisible] = useState(false)
    const [articulosBuscados, setArticulosBuscados] = useState<Producto[]>([])
    const [textoInput, setTextoInput] = useState("")

    // Activar visibilidad del carrito
    const cambiarVisibilidad = () => {
        setCarritoVisible(estadoPrevio => !estadoPrevio);
    }

    // Buscar productos en input
    const buscadorProductos = (e : React.ChangeEvent<HTMLInputElement>) => {
        const texto = e.target.value
        setTextoInput(texto)

        if(texto.trim() === "") {
            setArticulosBuscados([])
        } else {
            const resultadosBusqueda = datosProductos.filter(producto => 
                producto.name.toLowerCase().includes(textoInput.toLowerCase())
            )
            setArticulosBuscados(resultadosBusqueda)
        }
    }

  return (
    <>
        <header>
            <div className=" grid grid-cols-[3fr_1fr] md:grid-cols-3 py-3 px-5 bg-[#f8b500] items-center place-items-center">
                <div className=" md:flex hidden">
                    <h1 className="font-medium text-3xl">
                        Super<span className="font-bold">Max</span>
                    </h1>
                    <img className=" w-10" src="/mall-bag-svgrepo-com.svg" alt="SuperMax" />
                </div>

                <div className="flex w-full max-w-3xl justify-center">
                    <form className="w-full">
                    <div className="relative flex w-full">
                        <input
                            className="p-3 pr-10 rounded-lg bg-[#f7f7f7] w-full"
                            type="text"
                            name="buscador"
                            placeholder="Busca tus artículos aquí"
                            onChange={buscadorProductos}
                            value={textoInput}
                        />
                        <img className="absolute w-5 right-3 top-1/2 transform -translate-y-1/2" src="/search-svgrepo-com.svg" alt="Buscador" />
                    </div>
                    </form>
                </div>


                <div className=" flex items-center">
                    <button
                        onClick={cambiarVisibilidad}
                        className=" relative"
                    >
                        <img className="w-10" src="/cart-shopping-svgrepo-com.svg" alt="" />
                        <div className=" bg-[#393e46] rounded-full w-7 h-7 text-white flex items-center justify-center absolute bottom-0 top-5 left-5 right-0">
                            {carrito.length}
                        </div>
                    </button>
                </div>
            </div>

            {/* Visibilidad del carrito de compras */}
            {carritoVisible ? (
                <div id="carritoContenido" className=" bg-[#f7f7f7] md:w-2/3 w-5/6 lg:1/2 mx-auto border-2 shadow-md my-5 py-10">
                    <div className=" flex">
                        <div className=" flex justify-around items-center text-center py-2 w-full mx-3">

                            {carritoVacio ? (
                                <h2 className=" font-bold text-xl">Tu carrito de compras está vacío</h2>
                            ) : (
                                    <>
                                        <h2 className=" font-bold text-xl">Tu carrito de compras</h2>
                                        <button
                                            className=" p-3 bg-slate-700 text-white rounded-full"
                                            onClick={vaciarCarrito}    
                                        >
                                        Vaciar Carrito
                                        </button>
                                    </>
                            )}
                        </div>
                    </div>

                    {/* Mostrar productos en el carrito de compras */}
                    {carrito.map(producto => (
                        <>
                            <div key={producto.id}>
                                <div className="grid grid-cols-2 lg:grid-cols-[1fr_2fr_2fr_1fr] px-10 my-10 lg:space-x-5">
                                    <img src={producto.img} alt={producto.name} className="w-28 md:w-32 col-span-1 mx-auto row-span-2" />

                                    <div className=" my-auto md:col-span-1 text-center lg:text-left mx-0">
                                        <p className=" font-bold text-xl">{producto.name}</p>
                                        <p className=" hidden lg:contents">{producto.description}</p>
                                    </div>

                                    <div className="flex justify-center items-center gap-4 col-start-2 lg:col-start-3 w-full">
                                        <button 
                                            className="bg-[#f8b500] text-white w-12 h-12 flex items-center justify-center rounded-full text-lg font-bold"
                                            onClick={() => incrementarCantidad(producto.id)}
                                        >
                                        +
                                        </button>
                                        <p>{producto.amount}</p>
                                        <button 
                                            className="bg-[#f8b500] text-white w-12 h-12 flex items-center justify-center rounded-full text-lg font-bold"
                                            onClick={() => disminuirCantidad(producto.id)}
                                        >
                                        - 
                                        </button>
                                    </div>

                                    <div className="my-auto col-start-2 lg:col-start-4 text-center">
                                        <p className=" font-bold text-2xl">${producto.price}</p>
                                        <button 
                                            className="text-red-500 hover:text-red-700 font-bold"
                                            onClick={() =>eliminarDelCarrito(producto.id)}
                                        >
                                        Eliminar
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </>
                    ))}

                    {/* Mostrar contenido si el carrito de compras está vacío */}
                    {carritoVacio ? (
                        <div className=" flex justify-center my-10">
                            <div className=" relative">
                                <img className=" w-60 mx-auto" src="/cart-shopping-svgrepo-com.svg" alt="Carrito" />
                                {/* <img className=" w-20 absolute top-40 bottom-0 right-0 left-48" src="/cancel-svgrepo-com.svg" alt="No hay articulos"/> */}
                                <p className=" text-center">Agrega productos a tu carrito y los verás aquí</p>
                            </div>
                        </div>
                    ) : (
                        
                    <div className=" mx-10">
                        <p className=" text-lg">Total a pagar: <span className=" font-bold">${carritoTotal}</span></p>
                    </div>
                    )}
                </div> 
            ) : null}
      </header>

        {/* Mostrar resultados de la búsqueda */}
        {textoInput && (
            <div className="flex justify-center items-start w-full my-10 px-5">
                <div className="w-full max-w-[30rem] grid gap-10">
                    <h1 className="text-center text-3xl font-bold">Resultados de Búsqueda</h1>

                        {articulosBuscados.length > 0 ? (
                            articulosBuscados.map(producto => (
                            <div key={producto.id} className="flex flex-col items-center">
                                <div className="grid grid-cols-3 items-center text-center">
                                    <img src={producto.img} alt={producto.name} className="mx-auto" />
                                    <p>{producto.name}</p>
                                    <div className=" space-y-3">
                                        <p className="font-bold">${producto.price}</p>
                                        <button
                                            className=" sm:p-3 md:p-4 p-2 rounded-lg bg-[#f8b500] text-[#f7f7f7]"
                                            onClick={() => agregarAlCarrito({ ...producto, amount: 1 })}
                                        >
                                            Añadir al carrito
                                        </button>
                                    </div>
                                </div>
                            </div>
                            ))
                        ) : (
                                <p>No se encuentran resultados</p>
                        )}
                </div>
            </div>
        )}
    </>
  )
}
