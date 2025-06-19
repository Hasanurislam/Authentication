import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { handlEerror, handleSuccess } from '../util';
import {ToastContainer} from 'react-toastify'

function Home() {
  const [LoggedInUser,setLoggedInUser]=useState('');
  const [products,setproducts]=useState([]);
  const navigate=useNavigate();
  useEffect(()=>{
    setLoggedInUser(localStorage.getItem('logedINUser'));
  })
  const handleLogin=(e)=>{
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('logedINUser');
    handleSuccess('Log out successfully')
    setTimeout(() => {
      navigate('/login')
    }, 1000);

  }

 const fetchProduct= async()=>{
  try{
    const url='http://localhost:8080/Products'
    const headers={
      headers:{
        'Authorization':localStorage.getItem('jwtToken')
      }
    }
    const response= await fetch(url,headers);
    const result= await response.json();
    console.log(result)
    setproducts(result)

  }
  catch (error){
      handlEerror(error)
  }
 }


 useEffect(()=>{
  fetchProduct();
 },[])



  return (
    <div>
      <h1>{LoggedInUser}</h1>
      <button onClick={handleLogin}>Log out</button>
      <div>
        { 
        
            products && products?.map((Item,index)=>(
          <ul key={index}>
            <span>{Item.name} : {Item.price}</span>
          </ul>
        ))}
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Home