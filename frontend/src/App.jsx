import './App.css'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home/Home.jsx'
import Login from './pages/Login/Login.jsx'
import Product from './pages/Product/Product.jsx'

function App() {
  return (
    <>
        <Routes>
            <Route path = "/" element = {<Login />} />
            <Route path = "/home" element = {<Home />} />
            <Route path = "/product" element = {<Product />} />
        </Routes>
    </>
  )
}

export default App
