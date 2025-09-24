import { useAnimateMini } from 'framer-motion'
import './Form.css'

import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import axios from 'axios';

export default function Form({ setUs, setPass, setN, setSn, setE }) {
    const [isForm, setIsForm] = useState(true)

    const [nameInput, setNameInput] = useState("")
    const [surnameInput, setSurnameInput] = useState("")
    const [mailInput, setMailInput] = useState("")
    const [usernameInput, setUsernameInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")

    const [error, setError] = useState("")

    const [data, setData] = useState([])

    const navigate = useNavigate()

    const handleError = () => {
        setError("Error")
        setTimeout(() => {
            setError("")
        }, 2000)
    }

    const setLoginParams = async () => {
        try {
            let k = 0
            const existingUsers = await fetch('http://localhost:3000/users/getAll')
            .then(res => res.json())

            for(const user of existingUsers) {
                if(user.username === usernameInput || user.password === passwordInput) {
                    k = k + 1;
                }
            }
            if(k === 0) {
                setError("Username doesn't exist.")
                setTimeout(() => {
                    setError("")
                }, 2000)
            }
            else { 
                const updateUser = await axios.put('http://localhost:3000/users/update', {
                    username: usernameInput,
                    password: passwordInput
                })
                const setLP = () => {
                    setUs(usernameInput)
                    setPass(passwordInput)
                }
                navigate('/home')
            }
        } catch (err) {
            console.log("Error: ", err)
        }
    }

    const setSignupParams = async () => {
        try {
            let k = 0;
            const existingUsers = await fetch('http://localhost:3000/users/getAll')
            .then(res => res.json())

            for(const user of existingUsers) {
                if(user.name === nameInput || user.surname === surnameInput || user.username === usernameInput || user.email === mailInput || user.password === passwordInput) {
                    k = k + 1;
                }
            }
            if(k !== 0) {
                setError("Username already exists.")
                setTimeout(() => {
                    setError("")
                }, 2000)
            }
            else {
                const updateUser = await axios.post('http://localhost:3000/users/add', {
                    name: nameInput,
                    surname: surnameInput,
                    email: mailInput,
                    username: usernameInput,
                    password: passwordInput
                })
                navigate('/home')
            }
        }
        catch(err) {
            console.log("Error found: ", err)
        }
    }

    const transition = () => {
        setUsernameInput("")
        setSurnameInput("")
        setNameInput("")
        setMailInput("")
        setPasswordInput("")
        setIsForm(!isForm)
    }

    return (
        (isForm === true)
        ?
        <>
            <div className = "form-body">
                <div className = "form-title">
                    Login
                </div>
                <div className = "form-content">
                    <input type = "text" placeholder = "Username..." value = {usernameInput} onChange = {(e) => {setUsernameInput(e.target.value)}}></input>
                    <br></br>
                    <br></br>
                    <input type = "text" placeholder = "Password..." value = {passwordInput} onChange = {(e) => {setPasswordInput(e.target.value)}}></input>
                    <br></br>
                    <br></br>
                    <div className = "button-div">
                        <button onClick = {() => {(usernameInput !== "" && passwordInput !== "") ? setLoginParams() : handleError()}}>Login</button>
                    </div>
                    <div className = "info">{error}</div>
                    <div className = "sign-up">
                        <div className = "sign-up-text">Do not have an account?</div>
                        <button className = "button-sign-up" onClick = {transition}>Sign up!</button>
                    </div>
                </div>
            </div>
        </>
        :
        <>
            <div className = "form-body">
                <div className = "signup-form-title">
                    SignUp
                </div>
                <div className = "signup-form-content">
                    <div className = "name-surname">
                        <input type = "text" className = "name-input" placeholder = "Name..." value = {nameInput} onChange = {(e) => {setNameInput(e.target.value)}}></input>
                        <input type = "text" className = "surname-input" placeholder = "Surname..." value = {surnameInput} onChange = {(e) => {setSurnameInput(e.target.value)}}></input>
                    </div>
                    <br></br>
                    <br></br>
                    <input type = "text" placeholder = "Email..." value = {mailInput} onChange = {(e) => {setMailInput(e.target.value)}}></input>
                    <br></br>
                    <br></br>
                    <input type = "text" placeholder = "Username..." value = {usernameInput} onChange = {(e) => {setUsernameInput(e.target.value)}}></input>
                    <br></br>
                    <br></br>
                    <input type = "text" placeholder = "Password..." value = {passwordInput} onChange = {(e) => {setPasswordInput(e.target.value)}}></input>
                    <br></br>
                    <br></br>
                    <div className = "button-div">
                        <button onClick = {() => {(nameInput !== "" && surnameInput !== "" && usernameInput !== "" && mailInput !== "" && passwordInput !== "") ? setSignupParams() : () => {setError("Error. Parameters missing")}}}>Sign Up</button>
                    </div>
                    <div className = "info">{error}</div>
                    <div className = "log-in">
                        <div className = "sign-up-text">Already have an account?</div>
                        <button className = "button-sign-up" onClick = {transition}>Log in!</button>
                    </div>
                </div>
            </div>
        </>
    )
}