import React from 'react';
import UserForm from './UserForm';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import {useCookies} from 'react-cookie'

const Logging = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [permission, setPermission] = useState(true)
    const [cookies, setCookies] = useCookies(["access_token"])
    const navigate = useNavigate()
    let attempts = 0


    const handleSubmit = async (event) =>{
        event.preventDefault()
        try{
            const res = await axios.post("http://localhost:3000/auth/login", {
                username,
                password
            })
            if(res.data.message == "no such user found" || res.data.message == "incorrect password"){
                alert("wrong username, or password, try again")
                if(attempts>4){
                    setPermission(false)
                    setTimeout(() => setPermission(true), 15000)
                }
                attempts++
                console.log(attempts, permission)
            }else{
                setCookies("access_token", res.data.token)
                window.localStorage.setItem("userID", res.data.userID)
                console.log(res)
                console.log(cookies.access_token)
                navigate("/")
            }
        }catch(err){
            console.log(err)
        }
    }


  return (
    <div>
        <UserForm permissionLabel={"too many attempts, try again later"} permission={permission} actionName={"log-in"} username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleSubmit={handleSubmit}/>
    </div>
  );
}

export default Logging;
