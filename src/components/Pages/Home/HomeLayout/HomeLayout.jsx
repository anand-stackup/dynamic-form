import React from 'react'
import './HomeLayout.css'
import Sidebar from './Sidebar'
import FormLayout from './FormLayout/FormLayout'

const HomeLayout = () => {
  return (
    <div className='layout'>
        <Sidebar />
        <FormLayout />
    </div>
  )
}

export default HomeLayout