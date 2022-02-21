import {postCommentsTypes} from "../../types"
import {getCommentsByVideoId} from "./getComments.action"
import request from "../../api"

export const postCommentsByVideoId=(videoId,text)=>async (dispatch,getState)=>{
  try{

    const payload={
      snippet:{
        videoId,
        topLevelComment:{
          snippet:{
            textOriginal:text
          }
        }
      }
    }

    const {data}=await request.post("/commentThreads",payload,{
      params:{
        part:"snippet"
      },
      headers:{
        Authorization:`Bearer ${getState().authReducer.accessToken}`
      }
    })

    dispatch({
      type:postCommentsTypes.POST_COMMENTS_SUCCESS
    })
    setTimeout(()=>{
        dispatch(getCommentsByVideoId(videoId))
    },6000)



  }catch(err){
    console.log(err)
    dispatch({type:postCommentsTypes.POST_COMMENTS_FAIL,payload:err})
  }

}
