import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import {ToastContainer,toast} from 'react-toastify'
import { handlEerror, handleSuccess } from '../util'
function Signup() {

  const [signupinfo,setsignupinfo]=useState({
    name:'',
    email:'',
    password:''
  })
  const navigate=useNavigate();

const handleChange=(e)=>{
  const {name,value}=e.target;
  console.log(name,value)
  const copysignupinfo={...signupinfo};
  copysignupinfo[name]=value;
  setsignupinfo(copysignupinfo);
}
const  handleSignup= async (e)=>{
  e.preventDefault();
  const {name,email,password}=signupinfo;
  if(!name || !email || !password){
    return handlEerror('All Fields are required');
  }
  try{
    const url='http://localhost:8080/auth/signup'
    const response= await fetch(url,{
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(signupinfo)
    });
    const result= await response.json();
    console.log(result)
    const {success,msg,error}=result;
    if(success){
      handleSuccess(msg);
      setTimeout(()=>{
         navigate('/login')
      },1000)
    }
    else if(error){
      const details=error.details[0].message;
      handlEerror(details)
    }
    else if(msg){
      handlEerror(msg)

    }

  }
  catch (error){
    handlEerror(error);

  }
  
}


  return (
    <div className='container'>
        <h1>Signup</h1>
        <form  onSubmit={handleSignup}>
            
            <div className='container1'>
            <label htmlFor='name'>Name</label>
            <input
            onChange={handleChange}
            name='name'
             type='text'
             placeholder='Enter your Name'
             autoFocus
              value={signupinfo.name}
              />
            </div>

            <div className='container1'>
            <label htmlFor='email'>Email</label>
            <input 
            name='email'
            onChange={handleChange}
            type='email'
           placeholder='Enter your Email'
           autoFocus
            value={signupinfo.email}
            />
            </div>

            <div className='container1'>
            <label htmlFor='password'>Password</label>
            <input
            name='password'
            onChange={handleChange}
            type='password' placeholder='Enter your Password'
            value={signupinfo.password}
             />

            </div>
            <button>Signup</button>
            <span>already have an account
                <Link to='/login'>Login</Link>
            </span>
        </form>
                <ToastContainer/>
    </div>
  )
}

export default Signup