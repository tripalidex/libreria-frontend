import { RiBallPenFill, RiBookOpenFill } from "react-icons/ri"
import { Link } from "react-router-dom"
import logoUsil from '../../../../../assets/logo-usil.png'
import { IoPricetags } from "react-icons/io5"
import { BsArrowLeftShort } from "react-icons/bs"
import { useState } from "react"
import { FaUsers } from "react-icons/fa"
import useAuth from "../../../../../hooks/useAuth"
import { TbLogout2 } from "react-icons/tb"
import { HiMiniShoppingBag } from "react-icons/hi2"

const Sidebar = () => {
  const { auth } = useAuth();

  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Ventas", icon: <HiMiniShoppingBag />, to: "sales" },
    { title: "Libros", icon: <RiBookOpenFill />, to: "books" }, 
    { title: "Autores", icon: <RiBallPenFill />, to: "authors" }, 
    { title: "Editoriales", icon: <IoPricetags />, to: "editoriales" }, 
    { title: "Empleados", icon: <FaUsers />, to: "employees", role: 'ADMIN' }
  ];

  const filteredMenus = Menus.filter((menu) => {
    // Si el menú tiene un rol permitido y el usuario no tiene ese rol, no lo muestra
    return !menu.role || (auth && auth.rol === menu.role);
  });

  return (
    <>
      <div className={`bg-usil-color h-screen p-5 pt-5
        ${open ? "w-72" : "w-20"} duration-300 relative`}>
        <BsArrowLeftShort className={`bg-white text-usil-color 
          text-3xl rounded-full absolute -right-3 top-6 border 
          border-usil-color cursor-pointer ${!open && "rotate-180"}`} 
          onClick={() => setOpen(!open)}/>
        {/* LOGO */}
        <div className="flex gap-x-4 items-center">
          <img
            src={ logoUsil}
            className={`border-2 border-white rounded cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            USIL
          </h1>
        </div>
        {/* MODULOS */}
        <ul className="pt-2">
          {filteredMenus.map((menu, index) => (
            <>
              <li>
                <Link to={menu.to} key={index} className="text-white text-sm flex 
                items-center gap-x-4 cursor-pointer p-2
                hover:bg-white hover:text-usil-color rounded-lg mt-2">
                  <span className="text-2xl block float-left">
                    {menu.icon}
                  </span>
                  <span className={`text-base font-medium flex-1 
                    duration-200 ${!open && "hidden"}`}>
                    {menu.title}
                  </span>
                </Link>
              </li>
            </>
          ))}
        </ul>
        <Link to="/login" className="text-white text-sm flex 
                items-center gap-x-4 cursor-pointer p-2
                hover:bg-white hover:text-usil-color rounded-lg mt-2">
                  <span className="text-2xl block float-left">
                    <TbLogout2 />
                  </span>
                  <span className={`text-base font-medium flex-1 
                    duration-200 ${!open && "hidden"}`}>
                    Cerrar sesión
                  </span>
        </Link>
      </div>
    </>
    
  )
}

export default Sidebar