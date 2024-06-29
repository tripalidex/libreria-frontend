import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../../../../../hooks/useAxiosPrivate";
import { TfiShoppingCart } from "react-icons/tfi";
import img from "../../../../../../../assets/static/chivofiesta.jpg";

function Catalog() {
    const axiosPrivate = useAxiosPrivate();
    const [libros, setLibros] = useState([]);
    const getLibros = async () => {
        try {
            const response = await axiosPrivate.get('/catalogoLibros');
            setLibros(response.data.map((item) => ({
                id: item.id_libro,
                titulo: item.titulo,
                descripcion: item.descripcion,
                precio_unitario: item.precio_unitario,
                stock: item.stock,
                estado: item.estado ? 'Activo' : 'Inactivo',
                fecha_publicacion: item.fecha_publicacion,
                ruta_img: item.ruta_img,
                categoria: item.categoria,
                autor: item.autor,
                editorial: item.editorial
            })));
            console.log(response.data);
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    };

    useEffect(() => {
        getLibros();
    }, []);

    /*const getBasePath = () => {
        return "../../../../../../../assets/";
    };
    `${getBasePath()}${libro.ruta_img}`
    */

    return (
        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5'>
            {libros.map((libro) => (<>
                <div className='bg-white p-5 rounded-xl shadow-sm'>
                    <img src={img} alt='' className='w-full h-80 object-cover object-top drop-shadow-[0_80px_30px_#0007]' />
                    <h3 className='text-2xl py-3 text-center font-medium'>{libro.titulo}</h3>
                    <div className='flex justify-between items-center'>
                        <p>
                            S/. <span className='text-2xl font-medium'>{libro.precio_unitario}</span>
                        </p>
                        <button className='bg-gray-300 p-2 rounded-md text-sm hover:bg-gray-400 flex gap-2'>
                            <TfiShoppingCart />
                            Agregar al Carro
                        </button>
                    </div>
                </div>
            </>))}
        </div>
    )
}

export default Catalog