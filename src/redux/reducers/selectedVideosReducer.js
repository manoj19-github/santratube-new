import{selectedVideos} from "../types"
const initState={
  loading:false,
  error:"",
  video:null
}
export const selectedVideosReducer=(state=initState,action)=>{
  const {type,payload}=action
  switch(type){
    case selectedVideos.GET_VIDEO_DATA_REQ:
      return{
        ...state,
        loading:true
      }
    case selectedVideos.GET_VIDEO_DATA_SUCCESS:
      return{
        ...state,
        loading:false,
        video:payload
      }
    case selectedVideos.GET_VIDEO_DATA_ERROR:
      return{
        ...state,
        loading:false,
        error:payload
      }
    default:return state
  }
}
