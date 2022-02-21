import{getSubscriptionStatusTypes} from "../../types"
import request from "../../api"
export const getSubscriptionStatus=(channelId)=>async(dispatch,getState)=>{

  try{
    const {data}=await request("/subscriptions",{
      params:{
        part:"snippet",
        forChannelId:channelId,
        mine:true
      },
      headers:{
        Authorization:`Bearer ${getState().authReducer.accessToken}`
      }
    })
    console.log("data subscription",data)
    dispatch({
      type:getSubscriptionStatusTypes,
      payload:data.items.length !==0
    })
  }catch(err){
    console.log("error in action : ",err )
  }

}
