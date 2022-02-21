import {homeVideosTypes} from "../../types"
import request from "../../api"
export const getPopularVideosAction=()=>async (dispatch,getState)=>{
  try{
      dispatch({type:homeVideosTypes.HOME_VIDEOS_REQUEST})
      const {data}=await request("/videos",{
        params:{
          part:'snippet,contentDetails,statistics',
          chart:'mostPopular',
          regionCode:'IN',
          maxResults:50,
          pageToken:getState().homeVideosReducer.nextPageToken,

        },
      })
      dispatch({
        type:homeVideosTypes.HOME_VIDEOS_SUCCESS,
        payload:{
          videos:data.items,
          nextPageToken:data.nextPageToken,
          category:"All"
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
