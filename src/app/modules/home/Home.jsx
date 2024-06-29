import Sidebar from './components/sidebar/Sidebar'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { Outlet } from 'react-router-dom'

function Home() {
    return (
        <div className='flex'>
            <Sidebar/>
            <div className='h-screen w-full flex-2'>
                <Header />
                <Outlet />
                <Footer />
            </div>        
          
        </div>
    )
}

export default Home