import React from 'react';
import UserForm from './UserForm';
import { useState } from 'react';
import axios from 'axios'

const Registration = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [permission, setPermission] = useState(true)

    
    const handleSubmit = async (event) =>{
        event.preventDefault()
        try{
            const res = await axios.post("http://localhost:3000/auth/register", {
                username,
                password
            })
            if(res.data.message=="user already exists"){
                alert("user already exists")
            }else{
                alert("successfull registration! now log in")
                setPermission(false)
                setTimeout(() => setPermission(true), 15000)
            }
            
        }catch(err){
            console.log(err, "this err")
        }
    }

  return (
    <div>
        <UserForm permissionLabel={"you have registrated, now log in"} permission={permission}  actionName={"register"} username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleSubmit={handleSubmit}/>
    </div>
  );
}

export default Registration;
