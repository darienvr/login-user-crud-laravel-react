import React, {useState, useEffect} from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from '../axios-client';
import { FaUser } from "react-icons/fa";
import { BiSolidMessage } from "react-icons/bi";
import { TbMessages } from "react-icons/tb";
import { IoEyeSharp } from "react-icons/io5";
import graficaLineas from '../assets/grafica-lineas.png'
import graficaBarras from '../assets/grafica-barras.png'

const Dashboard = () => {

  const {user} = useStateContext()
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    getUsers();
  },[])

  const getUsers = () => {
    axiosClient.get('/users')
      .then(({data})=>{
        setUsers(data.data)
      })
      .catch(()=>{
      })
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <div className='dashboard-container'>
        <div className='dashboard-section'>
          <FaUser />
          <h2>{users.length}</h2>
          <h4>Users</h4>
        </div>
        <div className='dashboard-section'>
          <BiSolidMessage />
          <h2>1500</h2>
          <h4>Messages</h4>
        </div>
        <div className='dashboard-section'>
          <TbMessages fill='white'/>
          <h2>322</h2>
          <h4>conversations</h4>
        </div>
        <div className='dashboard-section'>
          <IoEyeSharp />
          <h2>2410</h2>
          <h4>Total Views</h4>
        </div>
      </div>
      <div className='dashboard-graph'>
        <img src={graficaBarras} alt="Grafica de barras del dashboard" />
        <img src={graficaLineas} alt="Grafica de barras del dashboard" />
      </div>
    </div>
  )
}

export default Dashboard