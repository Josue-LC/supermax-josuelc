/** Componente de articulos que se muestran al seleccionar una sección **/

import { useState, useEffect } from "react";
import { Producto } from "../types/index-types"

type ProductoProps = {
    producto: Producto,
    agregarAlCarrito: (articulo : Producto) => void
}

export default function ArticuloCarrito({producto, agregarAlCarrito} : ProductoProps) {

const {id, name, img, description, price} = producto;

const [amountState, setAmountState] = useState(0)
const [cargandoImagen, setCargandoImagen] = useState(true)

useEffect(() => {
    const imagen = new Image()
    imagen.src = img
    imagen.onload = () => setCargandoImagen(false)
}, [img])

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorInputCantidad = e.target.value === "" ? 0 : parseInt(e.target.value, 10)
    setAmountState(valorInputCantidad);
}


  return (
    <>
        <div key={id} className=" flex justify-center items-center ">
            <div className=" text-center border-2 p-3 shadow-xl space-y-4 w-80">

                {cargandoImagen ? (
                    <SkeletonProducto />
                ) : (
                    <>
                        <img className=" w-64 mx-auto" src={img} alt={name} loading="lazy" />
                        <p className=" font-bold text-xl">{name}</p>
                        <p>{description}</p>
                        <p className=" font-bold text-2xl">${price}</p>
                        <input
                            className=" p-3 rounded-lg bg-[#f7f7f7] border-2" 
                            placeholder="Cantidad:"
                            value={amountState === 0 ? "" : amountState}
                            onChange={handleChange}
                            type="number" />
                        <button
                            className=" p-4 rounded-lg bg-[#f8b500] text-[#f7f7f7]"
                            onClick={() => agregarAlCarrito({ ...producto, amount: amountState })}
                        >
                            Añadir al carrito
                        </button>
                    </>
                )}
            </div>
        </div>
    </>

  )
}

function SkeletonProducto() {
    return (
        <div className="animate-pulse flex flex-col items-center">
            <div className="w-64 h-40 bg-gray-300 rounded-md"></div>
            <div className="w-32 h-6 bg-gray-300 rounded mt-3"></div>
            <div className="w-52 h-4 bg-gray-300 rounded mt-2"></div>
            <div className="w-16 h-6 bg-gray-300 rounded mt-3"></div>
            <div className="w-24 h-10 bg-gray-300 rounded mt-3"></div>
            <div className="w-32 h-12 bg-gray-300 rounded mt-4"></div>
        </div>
    );
}