import Home from './modules/home/Home'
import { Link, Route, Routes } from 'react-router-dom'
import Books from './modules/home/components/main-content/books/Books'
import Authors from './modules/home/components/main-content/authors/Authors'
import Categories from './modules/home/components/main-content/categories/Categories'

function App() {

  return (
        <Routes>
          <Route path='/' element={<><h1>LOGIN</h1><Link to="home">Ingresar</Link></>}/>
          <Route path='/home' element={<Home />}>
            <Route path='books' element={<Books />}/>
            <Route path='authors' element={<Authors />}/>
            <Route path='categories' element={<Categories />}/>
          </Route>
        </Routes>      
  )
}

export default App
