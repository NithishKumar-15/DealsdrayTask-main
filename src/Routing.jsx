import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import HomePage from './Components/HomePage'


function Routing() {
  
  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Login></Login>}></Route>
      <Route path='/Home' element={<HomePage></HomePage>}></Route>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default Routing
