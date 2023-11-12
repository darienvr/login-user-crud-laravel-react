import React, { useRef, useState } from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';
import '../index.css'

const Login = () => {

  const emailRef = useRef();
  const passwordRef = useRef();
  const {setUser, setToken} = useStateContext()
  const [errors, setErrors] = useState(null);
  const [message, setMessage] = useState(null)

  const onSubmit = (e) => {
    e.preventDefault()
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    axiosClient.post('/login', payload)
      .then(({data})=> {
        setUser(data.user)
        setToken(data.token)
      })
      .catch(err=>{
        const response = err.response;
        if(response && response.status === 422){
            setErrors(response.data.errors)
            setMessage(response.data.message)
        }
      })
  }

  return (
    <div>
        <h1 className='title-login'>Bienvenido</h1>
        <h5 className='subtitle-login'>Ingrese su cuenta</h5>
        <form onSubmit={onSubmit} className='formulario'>
          {message && !errors && (<p className='alerta'>{message}</p>)}
          <label className='form-label'><b>Email</b></label> <br/>
          <input ref={emailRef} className='form-control-login' type='email'></input>
          {errors && errors.email && (<p className='alerta'>{errors.email}</p>)} <br/>
          <label className='form-label'><b>Contraseña</b></label> <br/>
          <input ref={passwordRef} className='form-control-login' type='password'></input> 
          {errors && errors.password && (<p className='alerta'>{errors.password}</p>)} <br/>
          <button className='btn-login' type='submit'>Iniciar Sesion</button> <br/>
          <div className='contenedor-registrarse'>
            <p>¿No tiene una cuenta?</p>
            <a className='btn-link' href='/signup'>Registrarse</a>
          </div>
        </form>
    </div>
  )
}

export default Login