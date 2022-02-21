import React,{useEffect} from 'react'
import "./styles/_app.scss";
import RouteContainer from "./utils/RouteContainer"
import {useSelector,useDispatch}  from "react-redux"
import {useNavigate} from "react-router-dom"
const App = () => {
  const {accessToken,loading}=useSelector(state=>state.authReducer)
  const navigate=useNavigate()
  useEffect(()=>{
      if(!loading && !accessToken){
        navigate("/auth")
      }
  },[accessToken,loading,navigate])


    return (
      <RouteContainer/>
    )
}

export default App
