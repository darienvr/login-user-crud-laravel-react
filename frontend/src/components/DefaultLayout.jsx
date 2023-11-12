import React, { useEffect } from 'react'
import { Link, Outlet, Navigate } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from '../axios-client'
import dashboardImg from '../assets/dashboard-logo.png'
import userImg from '../assets/user-logo.png'
import { HiOutlineLogout } from 'react-icons/hi';

const DefaultLayout = () => {

    const {user, token, setUser, setToken, notification} = useStateContext()

    if(!token){
        return <Navigate to="/login" />
    }

    const onLogout = (e) => {
        e.preventDefault()
        axiosClient.post('/logout')
            .then(()=>{
                setUser({})
                setToken(null)
            })
    }

    useEffect(()=>{
        axiosClient.get('/user')
            .then(({data})=>{
                setUser(data)
            })
    },[])

  return (
    <div id='defaultLayout'>
        <aside>
            <img className='img-logo' src={dashboardImg} />
            <Link to='/dashboard'>Dashboard</Link>
            <Link to='/users'>Users</Link>
        </aside>
        <div className='content'>
            <header>
                <div className='user-info-container'>
                    <img className='img-user' src={userImg} alt="Logo de usuario" />
                    {user.name}
                </div>
                <div>
                    <a onClick={onLogout} className='btn-logout' href="#">Logout <HiOutlineLogout className='logo-logout' color='red'/> </a>
                </div>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
        {notification && 
            <div className='notification'>
                {notification}
            </div>
        }
    </div>
  )
}

export default DefaultLayout