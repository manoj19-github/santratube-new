import {homeVideosTypes} from "../types"
const initState={
  loading:false,
  nextPageToken:"",
  activeCategory:'All',
  videos:[],
  error:""
}
export const homeVideosReducer=(state=initState,action)=>{
  const {type,payload}=action
  switch(type){
    case homeVideosTypes.HOME_VIDEOS_REQUEST:
      return{
        ...state,
        videos:state.videos.length?state.videos:[],
        loading:true,
      }
    case homeVideosTypes.HOME_VIDEOS_SUCCESS:
    return{
      ...state,
      videos:state.activeCategory===payload.category?
      [...state.videos,...payload.videos]:payload.videos,

      nextPageToken:payload.nextPageToken,
      loading:false,
      activeCategory:payload.category,
    }

    case homeVideosTypes.HOME_VIDEOS_ERROR:
      return{
        ...state,
        loading:false,
        error:payload
      }
    default:return state



  }
}
