import './Home.css'
import Navbar from '../../components/Navbar/Navbar.jsx'
import ProductsList from '../../components/ProductsList/ProductsList.jsx'
import Filters from '../../components/Filters/Filters.jsx'

import shoppingBag from '../../assets/shopping-bag.png'
import userImg from '../../assets/user.png'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

function Home() {
  const [products, setProducts] = useState([])

  const [nameToFilter, setNameToFilter] = useState("all")
  const [manufacturerToFilter, setManufacturerToFilter] = useState("all")
  const [priceToFilter, setPriceToFilter] = useState("all")

  const [fIsClicked, setFIsClicked] = useState(0)

  const [user, setUser] = useState({
      name: "",
      surname: "",
      email: "",
      username: "",
      password: ""
  })

  useEffect(() => {
      axios.get('http://localhost:3000/products/get', {
        params: {
          fName: nameToFilter,
          fManufacturer: manufacturerToFilter,
          fPrice: priceToFilter
        }
      })
      .then(p => setProducts(p.data))

      fetch('http://localhost:3000/users/getLoggedIn')
          .then(res => res.json())
          .then(p => setUser(p))
  }, [])

  useEffect(() => {
    axios.get('http://localhost:3000/products/getAll', {
        params: {
          fName: nameToFilter,
          fManufacturer: manufacturerToFilter,
          fPrice: priceToFilter
        }
      })
      .then(p => setProducts(p.data))
  }, [fIsClicked]);

  return (
    <>
        <Navbar className = "navbar"/>
        <div className = "welcome">Welcome, {user.username}!</div>
        <div className = "frame">
            <Filters setNameToSearch={setNameToFilter} setManufacturerToSearch={setManufacturerToFilter} setPriceToSearch={setPriceToFilter} setFIsClicked={setFIsClicked}/>
            <ProductsList products = {products}/>
        </div>
    </>
  )
}

export default Home;