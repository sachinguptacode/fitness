import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from '../Navbar'
import Register from './component/Register'
import Userall from './component/Userall'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import UserUpdate from './component/User-update'
function App() {

  return (
     <div>
            <Register/>
            <Userall/>
            <Routes>
              <Route path='/UserUpdate' element = {<UserUpdate/>}/>
            </Routes>
     </div>
  )
}

export default App
