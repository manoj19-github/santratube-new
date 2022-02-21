import {relatedVideosTypes} from "../../types"
import request from "../../api"
export const getPlayListVideosAction=(playlistId)=>async (dispatch,getState)=>{
  try{
    dispatch({type:relatedVideosTypes.GET_RELATED_VIDEOS_REQUEST})
    const {data}=await request("/playlistItems",{
      params:{
        part:"contentDetails,snippet,status",
        playlistId:playlistId,
        pageToken:getState().getRelatedVideosReducer.pageToken,
        maxResults:20
      }
    })
    console.log("playlist videos ",data)
    dispatch({
      type:relatedVideosTypes.GET_RELATED_VIDEOS_SUCCESS,
      payload:{videos:data.items,pageToken:data.nextPageToken}
    })
  }catch(err){

  }
}
