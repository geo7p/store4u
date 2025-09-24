import background from '../../assets/background.jpg'

import './Login.css'

import Form from '../../components/Form/Form.jsx'

import { useState } from 'react'

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    return (
        <>
            <div className = "page">
                <div className = "left">
                    <div className = "title">
                        Store4U
                    </div>
                </div>
                <div className = "right">
                    <Form setUs = {setUsername} setPass = {setPassword} setN = {setName} setSn = {setSurname} setE = {setEmail}/>
                </div>
            </div>
        </>
    )
}