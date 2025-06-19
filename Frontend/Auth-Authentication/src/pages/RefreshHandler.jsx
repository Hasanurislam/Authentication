import React, { useEffect } from 'react'
import { replace, useLocation, useNavigate } from 'react-router'

function RefreshHandler({setAuthenticated}) {
    const location=useLocation();
    const navigate=useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('jwtToken')){
            setAuthenticated(true);
            if(location.pathname==='/'||
                location.pathname==='/login'||
                location.pathname==='/signup'   
            ){
                navigate('/home',{replace:false})
            }
        }
    },[location,navigate,setAuthenticated])
  return (
    null
  )
}

export default RefreshHandler