import {authTypes} from "../types"
const initState={
  accessToken:JSON.parse(sessionStorage.getItem("santratube-auth-credential"))?
  JSON.parse(sessionStorage.getItem("santratube-auth-credential")).accessToken:null,
  user:JSON.parse(sessionStorage.getItem("santratube-auth-credential"))?
  JSON.parse(sessionStorage.getItem("santratube-auth-credential")).userData:null,
  loading:false,
  error:null
}
export const authReducer=(state=initState,action)=>{
  const{type,payload}=action
  switch(type){
    case authTypes.LOGIN_REQUEST:
      return{
        ...state,
        loading:true
      }
    case authTypes.LOGIN_SUCCESS:
      return{
        ...state,
        accessToken:payload,
        loading:false
      }
    case authTypes.LOGIN_FAIL:
      return{
        ...state,
        accessToken:null,
        user:null,
        loading:false,
        error:payload
      }
    case authTypes.LOG_OUT:
      return {
        ...state,
        user:null,
        loading:false,
        accessToken:null
      }
    case authTypes.LOAD_PROFILE:
      return {
        ...state,
        user:payload
      }
    default:return state

  }
}
