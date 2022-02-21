import request from "../../api"
import {homeVideosTypes} from "../../types"
export const getChannelPlaylist=(channelId)=>async (dispatch,getState)=>{
  try{
    dispatch({type:homeVideosTypes.HOME_VIDEOS_REQUEST})
    const {data}=await request("/playlists",{
      params:{
        part:"contentDetails,snippet,status",
        channelId,
      },
      headers:{
        Authorization:`Bearer ${getState().authReducer.accessToken}`
      }
    })
    dispatch({
      type:homeVideosTypes.HOME_VIDEOS_SUCCESS,
      payload:{videos:data.items,category:"All",pageToken:data.nextPageToken}
    })

  } catch(err) {
    console.log("error in getChannelPlaylist action",err)
    dispatch({
      type:homeVideosTypes.HOME_VIDEOS_ERROR,
      payload:err
    })
  }

}
