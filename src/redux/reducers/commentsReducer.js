import {postCommentsTypes,getCommentsTypes} from "../types"

const initState={
    loading:false,
    addCommentsSuccess:false,
    commentsData:[],
    error:"",
}

export const commentsReducer=(state=initState,action)=>{
  const {type,payload}=action
  switch(type){
    case getCommentsTypes.GET_COMMENTS_REQUEST:
      return{
        ...state,
        loading:true
      }
    case getCommentsTypes.GET_COMMENTS_SUCCESS:
      return{
        ...state,
        loading:false,
        commentsData:payload
      }
    case getCommentsTypes.GET_COMMENTS_FAIL:
      return{
        ...state,
        loading:false,
        error:payload
      }
    case postCommentsTypes.POST_COMMENTS_SUCCESS:
      return{
        ...state,
        addCommentsSuccess:true

      }
    case postCommentsTypes.POST_COMMENTS_FAIL:
      return{
        ...state,
        addCommentsSuccess:false
      }
    default: return state
  }
}
