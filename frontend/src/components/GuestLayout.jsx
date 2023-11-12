import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import loginImg from '../assets/login.jpg'


const GuestLayout = () => {

    const {token} = useStateContext()
    if(token){
        return <Navigate to="/" />
    }


  return (
    <div id='guestLayout'>
        <div className='contenedor-form'>
            <div className='contenedor-img'>
                <img className='img-login' src={loginImg}></img>
            </div>
            <div className='contenedor-formulario animated fadeInDown'>
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default GuestLayout