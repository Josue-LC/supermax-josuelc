/** Custom Hook para la funcionalidad del Carrito **/

import { useState, useEffect, useMemo } from "react"
import { productosMall } from "../data/products-mall"
import { Producto } from "../types/index-types"


export const useCarrito = () => {

    // Estado inicial del carrito de compras
    const carritoInicial = () : Producto[] => {
        const articuloCarritoStorage = localStorage.getItem('carrito');
        return articuloCarritoStorage ? JSON.parse(articuloCarritoStorage) : [];
    }

    const [datosProductos] = useState(productosMall);
    const [carrito, setCarrito] = useState<Producto[]>(carritoInicial);

    // Enviar a LocalStorage
    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito])

    // Agregar al carrito
    function agregarAlCarrito(articulo: Producto) {
        if(articulo.amount <= 0) {
            return
        }
        const productoExisteIndex = carrito.findIndex((producto) => producto.id === articulo.id);
    
        if (productoExisteIndex >= 0) {
            const carritoActualizado = carrito.map((producto) =>
                producto.id === articulo.id
                    ? { ...producto, amount: producto.amount + articulo.amount }
                    : producto
            );
            setCarrito(carritoActualizado);
        } else {
            const nuevoProductoAlCarrito = { ...articulo };
            setCarrito([...carrito, nuevoProductoAlCarrito])
        }
    }
    
    

    // Eliminar del carrito
    function eliminarDelCarrito(id: Producto['id']) {
        setCarrito(carritoPrevio => carritoPrevio.filter(producto => producto.id !== id))
    }

    // Vaciar carrito
    function vaciarCarrito() {
        setCarrito([])
    }

    // Incrementar cantidad
    function incrementarCantidad(id: Producto['id']) {
        const carritoActualizado = carrito.map(producto => {
            if(producto.id === id){
                return {
                    ...producto,
                    amount: producto.amount + 1
                }
            }
            return producto
        })
        setCarrito(carritoActualizado)
    }

    // Incrementar cantidad
    function disminuirCantidad(id: Producto['id']) {
        const carritoActualizado = carrito.map(producto => {
            if(producto.id === id && producto.amount > 1){
                return {
                    ...producto,
                    amount: producto.amount - 1
                }
            }
                return producto
        })
        setCarrito(carritoActualizado)
    }
    

    // Carrito vacío
    const carritoVacio = useMemo(() => carrito.length === 0, [carrito])

    // Total a pagar
    const carritoTotal = useMemo(() => carrito.reduce((acc, producto) => acc + (producto.amount * producto.price), 0), [carrito])

    return {
        datosProductos,
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        incrementarCantidad,
        disminuirCantidad,
        carritoVacio,
        carritoTotal,
    }
}