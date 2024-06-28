import { TiShoppingCart } from "react-icons/ti"
import { Link } from "react-router-dom"

function HeaderSales() {
    return (
        <div className="flex justify-between items-center mb-5">
            <Link to="/home/sales" className="text-xl font-semibold">Catálogo de libros</Link>
            <div className="w-10 h-10 bg-gray-100 rounded-full
                flex justify-center items-center relative">
                <span className="text-2xl block">
                    <TiShoppingCart />
                </span>
                <span className="absolute top-2/3 right-1/2 bg-red-500 text-white text-sm
                    w-5 h-5 rounded-full flex justify-center items-center">
                    0
                </span>
            </div>
        </div>
    )
}

export default HeaderSales