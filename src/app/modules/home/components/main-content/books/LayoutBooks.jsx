import { ImBooks } from "react-icons/im";
import { RiBookOpenFill } from "react-icons/ri";
import { Link, Outlet, useLocation } from "react-router-dom"

function LayoutBooks() {
    //Mis libros
    const location = useLocation();
    const Menus = [
        { title: "Libros", icon: <ImBooks />, to: "books" },
        { title: "Ejemplares", icon: <RiBookOpenFill />, to: "copies" }
    ];

    return (<>
        <div className="flex justify-between px-4 items-center py-6">
            <div className="flex items-center gap-8">
                <section className="flex items-center gap-4">
                    {Menus.map((menu, index) => (
                        <>
                            <Link to={menu.to} key={index} className={`text-sm flex items-center gap-x-2 cursor-pointer p-2 rounded-lg ${
                                    location.pathname.includes(menu.to) ? "bg-usil-color text-white" : "bg-white text-usil-color"
                                }`}>
                                <span className="text-2xl block float-left">
                                    {menu.icon}
                                </span>
                                <span className="text-base font-medium flex-1">
                                    {menu.title}
                                </span>
                            </Link>
                        </>
                    ))}
                </section>
            </div>
                
        </div>    
            
            <Outlet />  
    </>)
}

export default LayoutBooks