import {relatedVideosTypes} from "../../types"
import request from "../../api"
export const getRelatedVideosAction=(videoId,addMore=false)=>async (dispatch,getState)=>{
  try{
      dispatch({type:relatedVideosTypes.GET_RELATED_VIDEOS_REQUEST})
      const {data}=await request("/search",{
        params:{
          part:"snippet",
          relatedToVideoId:videoId,
          pageToken:getState().getRelatedVideosReducer.pageToken,
          maxResults:20,
          type:'video',
        }
      })
      dispatch({
        type:relatedVideosTypes.GET_RELATED_VIDEOS_SUCCESS,
        payload:{videos:data.items,pageToken:data.nextPageToken}

      })
      if(addMore){
        dispatch({
          type:relatedVideosTypes.GET_RELATED_VIDEOS_ADD_MORE,
          payload:{videos:data.items,pageToken:data.nextPageToken}

        })
      }else{
        dispatch({
          type:relatedVideosTypes.GET_RELATED_VIDEOS_SUCCESS,
          payload:{videos:data.items,pageToken:data.nextPageToken}

        })
      }
  }catch(err){
    console.log(err.message)
    dispatch({
      type:relatedVideosTypes.GET_RELATED_VIDEOS_FAIL,
      payload:err.message
    })
  }

}
