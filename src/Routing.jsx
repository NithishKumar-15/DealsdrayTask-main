import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import HomePage from './Components/HomePage'
import { Provider } from 'react-redux'
import reduxStore from './ReduxStore/reduxStore'


function Routing() {
  
  return (
    <>
    <Provider store={reduxStore}>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Login></Login>}></Route>
      <Route path='/Home' element={<HomePage></HomePage>}></Route>
     </Routes>
     </BrowserRouter>
     </Provider>
    </>
  )
}

export default Routing
