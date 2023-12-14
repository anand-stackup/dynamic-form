import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Form from '../Pages/FormPage/Form'

const Layout = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/form' element={<Form />} />
        </Routes>
    </div>
  )
}

export default Layout