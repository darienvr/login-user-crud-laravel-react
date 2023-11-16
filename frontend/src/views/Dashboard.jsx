import React, {useState, useEffect} from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from '../axios-client';

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
          <h4>Bienvenido</h4>
          <h2>{user.name}</h2>
        </div>
        <div className='dashboard-section'>
          <h2 className='users-length'>{users.length}</h2>
          <h4>Users</h4>
        </div>
      </div>
    </div>
  )
}

export default Dashboard