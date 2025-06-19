import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import {ToastContainer,toast} from 'react-toastify'
import { handlEerror, handleSuccess } from '../util'
function Login() {
  
  const [logininfo,setlogininfo]=useState({
    email:'',
    password:''
  })
  const navigate=useNavigate();

const handleChange=(e)=>{
  const {name,value}=e.target;
  console.log(name,value)
  const copylogininfo={...logininfo};
  copylogininfo[name]=value;
  setlogininfo(copylogininfo);
}
const  handlelogin= async (e)=>{
  e.preventDefault();
  const {email,password}=logininfo;
  if(!email || !password){
    return handlEerror('All Fields are required');
  }
  try{
    const url='http://localhost:8080/auth/login'
    const response= await fetch(url,{
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(logininfo)
    });
    const result= await response.json();
    console.log(result)
    const {success,msg,error,JwtToken,name}=result;
    if(success){
      handleSuccess(msg);
      localStorage.setItem('jwtToken',JwtToken);
      localStorage.setItem('logedINUser',name)

      setTimeout(()=>{
         navigate('/home')
      },1000)
    }
    else if(error){
      const details=error.details[0].message;
      handlEerror(details)
    }
    else if(!success){
      handlEerror(msg);
    }

  }
  catch (error){
    handlEerror(error);

  }
  
}

  return (
    <div className='container'>
        <h1>Login</h1>
        <form  onSubmit={handlelogin}>

            <div className='container1'>
            <label htmlFor='email'>Email</label>
            <input 
            name='email'
            onChange={handleChange}
            type='email'
           placeholder='Enter your Email'
           autoFocus
            value={logininfo.email}
            />
            </div>

            <div className='container1'>
            <label htmlFor='password'>Password</label>
            <input
            name='password'
            onChange={handleChange}
            type='password' placeholder='Enter your Password'
            value={logininfo.password}
             />

            </div>
            <button>Login</button>
            <span>dont have an account 
              <Link to='/signup' className='signup'>signup</Link>
            </span>
        </form>
                <ToastContainer/>
    </div>
  )
}

export default Login