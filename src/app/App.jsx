import Home from './modules/home/Home'
import { Route, Routes } from 'react-router-dom'
import Books from './modules/home/components/main-content/books/Books'
import Authors from './modules/home/components/main-content/authors/Authors'
import Editoriales from './modules/home/components/main-content/editoriales/Editoriales'
import Employees from './modules/home/components/main-content/employees/Employees'
import Login from './modules/auth/Login'
import ForgetPassword from './modules/auth/ForgetPassword'
import Unauthorized from './modules/auth/components/Unauthorized'
import RequiredAuth from './modules/auth/components/RequiredAuth'
import LayoutSales from './modules/home/components/main-content/sales/components/LayoutSales'
import Catalog from './modules/home/components/main-content/sales/pages/Catalog'
import Detail from './modules/home/components/main-content/sales/pages/Detail'

function App() {
    return (
        <Routes>
            {/* public routes */}
            <Route path='/' element={<Login />}/>
            <Route path='forget-password' element={<ForgetPassword />}/>
            <Route path='unauthorized' element={<Unauthorized />}/>

            {/* protected routes */}
            <Route element={<RequiredAuth allowedRoles={['ADMIN', 'USER']}/>}>
              <Route path='/home' element={<Home />}>
                  <Route path='books' element={<Books />}/>
                  <Route path='authors' element={<Authors />}/>
                  <Route path='editoriales' element={<Editoriales />}/>
                  <Route path='sales' element={<LayoutSales />}>
                        <Route index element={<Catalog />} />
                        <Route path=':slug' element={<Detail />}/>
                  </Route>
              </Route>
            </Route>
            <Route element={<RequiredAuth allowedRoles={['ADMIN']}/>}>
              <Route path='/home' element={<Home />}>
                  <Route path='employees' element={<Employees />}/>
              </Route>
            </Route>
            
            {/* catch all */}
            <Route path="*" element={<Login />}/>
        </Routes>
    )
}

export default App
