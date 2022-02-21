import {homeVideosTypes} from "../../types"
import request from "../../api"
export const getSearchedVideosAction=(keyword)=>async (dispatch,getState)=>{
  console.log("search keywords",keyword)
  try{
      dispatch({type:homeVideosTypes.HOME_VIDEOS_REQUEST})
      const {data}=await request("/search",{
        params:{
          part:"snippet",
          maxResults:20,
          q:keyword,
          pageToken:getState().homeVideosReducer.nextPageToken,
          type:'video,channel,playlist',
        }
      })

      dispatch({
        type:homeVideosTypes.HOME_VIDEOS_SUCCESS,
        payload:{
          videos:data.items,
          nextPageToken:data.nextPageToken,
          category:keyword
        }
      })
  }catch(err){
    console.log(err.message)
    dispatch({
      type:homeVideosTypes.HOME_VIDEOS_ERROR,
      payload:err.message
    })
  }

}
