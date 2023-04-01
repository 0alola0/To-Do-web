import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Route, Routes, Link, Navigate } from 'react-router-dom'
import './App.css'
import Landing from './components/Landing'
import Login from './components/Login'
import Navigation from './components/Navigation'
import BackgroundComponent from './components/BackgroundComponent'


function App() {
  const [count, setCount] = useState(0)
  const [darkMode, setDarkMode] = useState(false)
  
  const toggleDarkMode = () =>{
    setDarkMode(!darkMode)
  }

  return (
    <div className={darkMode? "app dark-mode" : "app"}>      
      <BackgroundComponent/>  
      <div className="app-background"></div>
      <Navigation toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App
