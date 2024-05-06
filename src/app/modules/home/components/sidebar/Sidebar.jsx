import { RiBallPenFill, RiBookOpenFill } from "react-icons/ri"
import { Link } from "react-router-dom"
import logousil from '../../../../../assets/logo-usil.jpg'
import { IoPricetags } from "react-icons/io5"

function Sidebar() {
  return (
    <div className='bg-[#1C2674] col-span-1 p-8'>
      {/*Logo*/}
      <div className="text-center mb-8">
        <img src={logousil} />
      </div>
      {/*Nav*/}
      <nav>
        <ul>
          <li>
            <Link 
              to='books' className='flex items-center gap-4 hover:bg-white p-4 text-white hover:text-[#1C2674] rounded-lg 
              transition-colors font-semibold'>
              <RiBookOpenFill />
              Libros          
            </Link>
            <Link 
              to='authors' className='flex items-center gap-4 hover:bg-white p-4 text-white hover:text-[#1C2674] rounded-lg 
              transition-colors font-semibold'>
              <RiBallPenFill />
              Autores
            </Link>
            <Link 
              to='categories' className='flex items-center gap-4 hover:bg-white p-4 text-white hover:text-[#1C2674] rounded-lg 
              transition-colors font-semibold'>
              <IoPricetags />
              Categorías
            </Link>
          </li>
        </ul>
      </nav>   
      
    </div>    
  )
}

export default Sidebar