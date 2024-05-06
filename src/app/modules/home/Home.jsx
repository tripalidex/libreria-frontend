import Sidebar from './components/sidebar/Sidebar'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { Outlet } from 'react-router-dom'

function Home() {
  return (
    <div className='flex min-h-screen grid grid-cols-6'>
      <Sidebar/>
      <div className='col-span-5'>
        <div className='h-screen w-full flex flex-col'>
          <Header />
          <div className='flex-grow'>
            <Outlet />
          </div>
          <Footer />
        </div>        
      </div>
    </div>
  )
}

export default Home