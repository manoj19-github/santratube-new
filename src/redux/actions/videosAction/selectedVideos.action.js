import{selectedVideos} from "../../types"
import request from "../../api"
export const getVideoById=(videoId)=>async(dispatch,getState)=>{
  try{
    dispatch({type:selectedVideos.GET_VIDEO_DATA_REQ})
    const {data}=await request("/videos",{
      params:{
        part:"snippet,statistics",
        id:videoId
      }
    })
    console.log("data video",data)
    dispatch({
      type:selectedVideos.GET_VIDEO_DATA_SUCCESS,
      payload:data.items[0]
    })
  }catch(err){
    console.log("error in action : ",err )
    dispatch({
      type:selectedVideos.GET_VIDEO_DATA_ERROR,
      payload:err.message

    })
  }

}
