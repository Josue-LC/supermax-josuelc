// Type de secciones de la tienda
export type Section = {
    id: number,
    nombre: string,
    img: string
}

// Type de los productos de la tienda
export type Producto = {
    id: number,
    name: string,
    img: string,
    description: string,
    section: string,
    price: number,
    amount: number
}
