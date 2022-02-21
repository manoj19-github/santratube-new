import React,{useEffect} from 'react'
import "./LoginPage.scss"
import {useNavigate} from "react-router-dom"
import {loginWithGoogle}
from "../../redux/actions/authActions/auth.action"
import {useDispatch,useSelector} from "react-redux"

const LoginPage = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const accessToken=useSelector(state=>state.authReducer.accessToken)
  const loginRequest=()=>{
    dispatch(loginWithGoogle())
  }
  useEffect(()=>{
    if(accessToken){
      navigate("/")
    }
  },[accessToken,dispatch])
    return (
        <div className="login">
          <div className="login__container">
            <h1><span>Santra</span>Tube</h1>
            <img src="/assets/logo.jpg" alt="title"/>
            <button onClick={loginRequest}>
              Login with Google
            </button>
            <p>This project is made using Youtube Data API</p>
          <p>Presents By Santra Developers</p>
          </div>
        </div>
    )
}

export default LoginPage
