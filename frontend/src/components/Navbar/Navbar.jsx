import shoppingBag from '../../assets/shopping-bag.png'
import userImg from '../../assets/user.png'

import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from "react";

import UserOptions from '../../components/UserOptions/UserOptions.jsx'

function Navbar() {
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState()
    const [user, setUser] = useState({
        name: "",
        surname: "",
        email: "",
        username: "",
        password: ""
    })
    const [userOption, setUserOption] = useState(false)

    useEffect(() => {
        fetch('http://localhost:3000/users/getLoggedIn')
            .then(res => res.json())
        .then(d => {setUser(d)})
    }, [])

    const handleLogout = async(user) => {
        await axios.put('http://localhost:3000/logOut', {
            name: user.name,
            surname: user.surname,
            email: user.email,
            username: user.username,
            password: user.password
        })
        navigate('/')
    }

    const goHome = () => {
        navigate("/home")
    }
    return (
        <>
            <div class = "navbar-frame">
            <div className = "app-header">
                <div className = "app-header-logo" onClick = {() => {goHome()}}>
                    <img src = {shoppingBag}></img>
                </div>
                <div className = "app-header-title">
                    Store4U
                </div>
                <div className = "app-search-bar">
                    <input type = "text" className = "app-search-text" placeholder = "Type..." value = {searchText} onChange = {(e) => {setSearchText(e.target.value)}}></input>
                    <button className = "app-search-button">Search</button>
                </div>
                <div className = "app-user-button"
                    onMouseOver = {() => {
                        setUserOption(true)
                    }}
                    onMouseOut = {() => {
                        setUserOption(false)
                    }}>
                    <img src = {userImg}></img>
                </div>
                <div className = "logout-button">
                    <button className = "logout-button" onClick = {() => handleLogout(user)}>Log out</button>
                </div>
            </div>
            {userOption ? <UserOptions />: <></>}
            </div>
        </>
    )
}

export default Navbar;