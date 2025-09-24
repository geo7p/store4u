import './Filters.css'

import { useState } from 'react'

export default function Filters({setNameToSearch, setManufacturerToSearch, setPriceToSearch, setFIsClicked}) {
    const [name, setName] = useState("")
    const [manufacturer, setManufacturer] = useState("")
    const [price, setPrice] = useState("")
    const [c, setC] = useState(false)

    const handleFilterClick = () => {
        name === "" ? setNameToSearch("all") : setNameToSearch(name)
        manufacturer === "" ? setManufacturerToSearch("all") : setManufacturerToSearch(manufacturer)
        price === "" ? setPriceToSearch("all") : setPriceToSearch(price)
        setC(!c)
        setFIsClicked(c)
    }

    return (
        <>
            <div className = "filters-frame">
                <div className = "filters-title">Filters</div>
                <br></br>
                <label for = "name">By name:</label>
                <input type = "text" id = "name" value = {name} onChange = {(e) => {setName(e.target.value)}}></input>
                <br></br>
                <label for = "manufacturer">By manufacturer:</label>
                <input type = "text" id = "manufacturer" value = {manufacturer} onChange = {(e) => {setManufacturer(e.target.value)}}></input>
                <br></br>
                <label for = "name">By price:</label>
                <input type = "text" id = "name" value = {price} onChange = {(e) => {setPrice(e.target.value)}}></input>
                <br></br>
                <button className = "filter-button" onClick = {handleFilterClick}>Search</button>
            </div>
        </>
    )
}