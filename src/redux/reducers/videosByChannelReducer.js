import {getSubscriptionChannelTypes} from "../types"
const initState={
  loading:false,
  videos:[],
  pageToken:"",
  error:""
}
export const videosByChannelReducer=(state=initState,action)=>{
  const {type,payload}=action
  switch(type){
    case getSubscriptionChannelTypes.GET_SUBSCRIPTION_CHANNEL_REQUEST:
      return{
        ...state,
        loading:true
      }
    case getSubscriptionChannelTypes.GET_SUBSCRIPTION_CHANNEL_SUCCESS:
      if(state.videos.length){
        return{
          ...state,
          loading:false,
          videos:[...state.videos,...payload.videos],
          pageToken:payload.pageToken
        }
      }
      return{
        ...state,
        loading:false,
        videos:payload.videos,
        pageToken:payload.pageToken
      }
    case getSubscriptionChannelTypes.GET_SUBSCRIPTION_CHANNEL_FAIL:
      return{
        ...state,
        loading:false,
        error:payload
      }
    default : return state
  }
}
