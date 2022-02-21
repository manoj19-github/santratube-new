import {authTypes} from "../../types"
import {provider,auth} from "../../../utils/firebase"
import { signInWithPopup,signOut} from 'firebase/auth'

export const loginWithGoogle=()=>async dispatch=>{
  try{
    dispatch({type:authTypes.LOGIN_REQUEST})
    provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl")
    const {user,_tokenResponse}=await signInWithPopup(auth,provider)
    dispatch({type:authTypes.LOGIN_SUCCESS,payload:_tokenResponse.oauthAccessToken})
    dispatch({
      type:authTypes.LOAD_PROFILE,
      payload:{
        imgURL:user.photoURL,
        userName:user.displayName
      }})
    sessionStorage.setItem("santratube-auth-credential",
    JSON.stringify({
      accessToken:_tokenResponse.oauthAccessToken,
      userData:{
        imgURL:user.photoURL,
        userName:user.displayName
      }
    })
  )

  }catch(err){
    console.log(err)
    dispatch({
      type:authTypes.LOGIN_FAIL,
      payload:err.message})
  }
}
export const logoutAction=()=>async dispatch=>{
  try{
    await signOut(auth)
    dispatch({type:authTypes.LOG_OUT})
    sessionStorage.removeItem("santratube-auth-credential")
  }catch(err){
    console.log(err)
  }
}
