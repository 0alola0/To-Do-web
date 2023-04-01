import React from 'react';
import { Link } from 'react-router-dom';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import {useCookies} from 'react-cookie'
import { useNavigate } from 'react-router-dom';


const Navigation = ({toggleDarkMode, darkMode}) => {
    const [cookies , setCookies] = useCookies(["access_token"])
    const navigate = useNavigate()
    const logOut = () => {
        setCookies("access_token","")
        window.localStorage.clear()
        navigate("/login")
    }
  return (
    <div className="nav-wrapper">
        <h1 className="logo">TODO</h1>
        {darkMode? <SunIcon className="theme-image" onClick={toggleDarkMode}/> : <MoonIcon className="theme-image" onClick={toggleDarkMode}/>} 
        {cookies.access_token?   <button className="login-btn" onClick={logOut}>log out</button>   : (<Link to="/login"><button className="login-btn">Log-in/Register</button></Link>)}
    </div>
  );
}

export default Navigation;
