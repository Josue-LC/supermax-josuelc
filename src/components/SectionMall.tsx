/** Componente de las secciones **/

import { Section } from "../types/index-types"

type SectionProps = {
  seccion: Section
  setTipoProducto: React.Dispatch<React.SetStateAction<string>>
}

export default function SectionMall({seccion, setTipoProducto} : SectionProps) {

  const {nombre, img, id} = seccion

  return (
    <>
        <div key={id} className=' flex items-center justify-center border-2 p-3 shadow-xl hover:text-[#f8b500]'>
          <button
          onClick={() => {
          setTipoProducto(nombre);
        }}
          >
              <img className=" w-40" src={img} alt={nombre} />
              <p className=' text-center my-3 '>{nombre}</p>
          </button>
        </div>
    </>
  )
}
