import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextProvider'

const UserForm = () => {

  const {setNotification} = useStateContext()

  const { id } = useParams()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  if(id){
    useEffect(()=>{
      setLoading(true)
      axiosClient.get(`/users/${id}`)
        .then(({data})=>{
          setLoading(false)
          setUser(data)
        })
        .catch(()=>{
          setLoading(false)
        })
    },[])
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if(user.id){
      axiosClient.put(`/users/${user.id}`, user)
        .then(()=>{
          setNotification("User was successfully updated")
          navigate('/users')
        })
        .catch(err=>{
          console.log('error xd')
          const response = err.response;
          if(response && response.status === 422){
            setErrors(response.data.errors)
          }
        })
    }else{
        axiosClient.post(`/users`, user)
          .then(()=>{ 
            setNotification("User was successfully created")
            navigate('/users')
          })
          .catch(err=>{
            const response = err.response;
            if(response && response.status === 422){
              setErrors(response.data.errors)
            }
          })
    }
  }

  return (
    <>
      {user.id && <h1>Update User: {user.name}</h1>}
      {!user.id && <h1>New User</h1>}
      <div className='card animated fadeInDown'>
        {loading && (
          <div className='text-center'>Loading...</div>
        )}
        {!loading && 
          <form onSubmit={onSubmit}>
            {errors && errors.name && (<p className='alerta'>{errors.name}</p>)}
            <input values={user.name} onChange={e=>setUser({...user, name: e.target.value})} placeholder='Name' type="text" />
            {errors && errors.email && (<p className='alerta'>{errors.email}</p>)}
            <input values={user.email} onChange={e=>setUser({...user, email: e.target.value})} placeholder='Email' type="email" />
            {errors && errors.password && (<p className='alerta'>{errors.password}</p>)}
            <input onChange={e=>setUser({...user, password: e.target.value})} placeholder='Password' type="password"  />
            <input onChange={e=>setUser({...user, password_confirmation: e.target.value})} placeholder='Password Confirmation' type="password" />
            <button className='btn'>Save</button>
          </form>
        }
      </div>
    </>
  )
}

export default UserForm