import {getCommentsTypes} from "../../types"
import request from "../../api"

export const getCommentsByVideoId=(videoId)=>async (dispatch,getState)=>{
  try{
    dispatch({type:getCommentsTypes.GET_COMMENTS_REQUEST})
    const {data}=await request("/commentThreads",{
      params:{
        part:"snippet",
        videoId
      }
    })
    console.log("comments data",data.items)
    dispatch({
      type:getCommentsTypes.GET_COMMENTS_SUCCESS,
      payload:data.items
    })
  }catch(err){
    console.log(err)
    dispatch({type:getCommentsTypes.GET_COMMENTS_SUCCESS,payload:err})
  }

}
