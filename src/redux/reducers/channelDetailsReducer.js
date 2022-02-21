import {
  getChannelDetails,
  getSubscriptionStatusTypes
} from "../types"
const initState={
  loading:false,
  channelData:{},
  channelSubscribed:false,
  error:""
}
export const  channelDetailsReducer=(state=initState,action)=>{
  const {type,payload}=action
  switch(type){
    case getChannelDetails.GET_CHANNEL_DETAILS_REQ:
      return{
        ...state,
        loading:true
      }
    case getChannelDetails.GET_CHANNEL_DETAILS_SUCCESS:
      return{
        ...state,
        loading:false,
        channelData:payload
      }
    case getChannelDetails.GET_CHANNEL_DETAILS_FAIL:
      return{
        ...state,
        loading:false,
        error:payload
      }
    case getSubscriptionStatusTypes:
      return{
        ...state,
        channelSubscribed:payload
      }
    default:return state
  }
}
