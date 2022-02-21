import{getChannelDetails} from "../../types"
import request from "../../api"
export const getChannelDetailsById=(channelId)=>async(dispatch,getState)=>{
  try{
    dispatch({type:getChannelDetails.GET_CHANNEL_DETAILS_REQ})
    const {data}=await request("/channels",{
      params:{
        part:"contentDetails,snippet,statistics",
        id:channelId
      }
    })
    dispatch({
      type:getChannelDetails.GET_CHANNEL_DETAILS_SUCCESS,
      payload:data.items[0]
    })
  }catch(err){
    console.log("error in action : ",err )
    dispatch({
      type:getChannelDetails.GET_CHANNEL_DETAILS_FAIL,
      payload:err

    })
  }

}
