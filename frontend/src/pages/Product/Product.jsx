import { useState, useEffect } from 'react'

import axios from 'axios'

import Navbar from '../../components/Navbar/Navbar.jsx'

function Product() {
    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: ""
    })

    return (
        <>
            <Navbar />
            <div className = "product"></div>
        </>
    )
}

export default Product