import{getSubscriptionChannelTypes} from "../../types"
import request from "../../api"
export const getVideosByChannel=()=>async(dispatch,getState)=>{
  dispatch({
    type:getSubscriptionChannelTypes.GET_SUBSCRIPTION_CHANNEL_REQUEST
  })
  try{
    const {data}=await request("/subscriptions",{
      params:{
        part:"snippet,contentDetails",
        mine:true,
        maxResults:10,
        pageToken:getState().videosByChannelReducer.pageToken
      },
      headers:{
        Authorization:`Bearer ${getState().authReducer.accessToken}`
      }
    })
    console.log("data subscription",data)
    dispatch({
      type:getSubscriptionChannelTypes.GET_SUBSCRIPTION_CHANNEL_SUCCESS,
      payload:{videos:data.items,pageToken:data.nextPageToken}
    })
  }catch(err){
    dispatch({
      type:getSubscriptionChannelTypes.GET_SUBSCRIPTION_CHANNEL_FAIL,
      payload:err
    })
    console.log("error in action : ",err )
  }

}
