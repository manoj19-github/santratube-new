import {relatedVideosTypes} from "../types"
const initState={
  loading:false,
  videos:[],
  pageToken:"",
  error:""
}
export const getRelatedVideosReducer=(state=initState,action)=>{
  const {type,payload}=action
  switch(type){
    case relatedVideosTypes.GET_RELATED_VIDEOS_REQUEST:
      return{
        ...state,
        loading:true
      }
    case relatedVideosTypes.GET_RELATED_VIDEOS_SUCCESS:
      return{
        ...state,
        loading:false,
        videos:payload.videos,
        pageToken:payload.pageToken
      }
    case relatedVideosTypes.GET_RELATED_VIDEOS_ADD_MORE:
        if(state.videos.length)
          return{
            ...state,
            loading:false,
            videos:[...state.videos,...payload.videos],
            pageToken:payload.pageToken
          }
      return{
        ...state,
        loading:false,
        videos:payload.videos,
        pageToken:payload.pageToken
      }
    case relatedVideosTypes.GET_RELATED_VIDEOS_FAIL:
      return{
        ...state,
        loading:false,
        error:payload
      }
    default:return state
  }

}
