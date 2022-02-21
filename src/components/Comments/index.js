import React,{useEffect,useState} from 'react'
import "./_Comments.scss"
import Comment from "./Comment"
import {useDispatch,useSelector} from "react-redux"
import {getCommentsByVideoId} from "../../redux/actions/commentsAction/getComments.action"
import {postCommentsByVideoId} from "../../redux/actions/commentsAction/postComment.action"
const Comments = ({videoId,totalComments}) => {
  const dispatch=useDispatch()
  const [newComment,setNewComment]=useState(null)
  useEffect(()=>{
    dispatch(getCommentsByVideoId(videoId))
  },[dispatch,videoId])
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(newComment.length===0) return
    dispatch(postCommentsByVideoId(videoId,newComment))
    setNewComment("")

  }
  const comments=useSelector(state=>state.commentsReducer.commentsData)
  const _comments=comments?.map(comment=>comment.snippet.topLevelComment.snippet)
    return (
        <div className="comments">
          <p>{totalComments} Comments</p>
        <div className="comments__form d-flex w-100 my-2">
          <img src="https://img.favpng.com/25/13/19/samsung-galaxy-a8-a8-user-login-telephone-avatar-png-favpng-dqKEPfX7hPbc6SMVUCteANKwj.jpg"
            alt="avatar"
            className="rounded-circle mr-3"
          />
        <form
          className="d-flex flex-grow-1 w-100"
          onSubmit={handleSubmit}
          >
            <input type="text" className="flex-grow-1"
              placeholder="write a comment..."
              value={newComment}
              onChange={(e)=>setNewComment(e.target.value)}
            />
            <button className="border-0  p-2 ">Comment</button>
          </form>
        </div>
        <div className="comments__list mt-5">
          {
            _comments?.map((comment,index)=>(
              <Comment commentData={comment} key={index}/>
            ))
          }

        </div>
      </div>
    )
}

export default Comments
