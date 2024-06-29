import Home from './modules/home/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import Authors from './modules/home/components/main-content/authors/Authors'
import Editoriales from './modules/home/components/main-content/editoriales/Editoriales'
import Employees from './modules/home/components/main-content/employees/Employees'
import Login from './modules/auth/Login'
import ForgetPassword from './modules/auth/ForgetPassword'
import Unauthorized from './modules/auth/components/Unauthorized'
import RequiredAuth from './modules/auth/components/RequiredAuth'
import Sales from './modules/home/components/main-content/sales/Sales'
import LayoutBooks from './modules/home/components/main-content/books/LayoutBooks'
import Books from './modules/home/components/main-content/books/components/Books'
import Copies from './modules/home/components/main-content/books/components/Copies'

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
                    <Route index element={<Navigate to="sales" />} />
                    <Route path='sales' element={<Sales />}/>
                    <Route path='inventory' element={<LayoutBooks />}>
                        <Route index element={<Navigate to="books" />} />
                        <Route path='books' element={<Books />}/>
                        <Route path='copies' element={<Copies />}/>
                    </Route>
                    <Route path='authors' element={<Authors />}/>
                    <Route path='editoriales' element={<Editoriales />}/>
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
