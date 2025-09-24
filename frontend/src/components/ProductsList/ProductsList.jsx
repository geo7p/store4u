import {useState, useEffect } from 'react';

import axios from 'axios'

import './ProductsList.css'
import Card from '../Card/Card.jsx'

import { useNavigate } from 'react-router-dom'

export default function ProductsList({products}) {
    const navigate = useNavigate()

    const handleClick = async (name) => {
        await axios.put(`http://localhost:3000/products/update/${name}`)
        navigate('/product')
    }

    return(
        <>
            <div className = "products-list-frame">
                {products.map(p => <Card key={p.id}
                                            name = {p.name}
                                            price = {p.price}
                                            image = {p.image}
                                            description = {p.description}
                                            manufacturer = {p.manufacturer}
                                            created_at = {p.created_at}
                                            updated_at = {p.updated_at}
                                            clickHandler={() => {handleClick(p.name)}} />)}
            </div>
        </>
    )
}