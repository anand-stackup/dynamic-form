import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Form from '../Pages/FormPage/Form'
import CreateForm from '../Pages/CreateForm/CreateForm'
import FormList from '../Pages/FormList/FormList'

const Layout = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<CreateForm />} />
            <Route path='/home/:id' element={<Home />} />
            <Route path='/form/:id' element={<Form />} />
            <Route path='/list' element={<FormList />} />
        </Routes>
    </div>
  )
}

export default Layout