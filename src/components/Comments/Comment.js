import React from 'react'
import {GoPrimitiveDot}from "react-icons/go"
import moment from "moment"
import "./_Comment.scss"
import BindHtml from 'react-bind-html';
const Comment = ({commentData}) => {
  const {
    authorProfileImageUrl,
    authorDisplayName,
    publishedAt,
    textDisplay
  }=commentData
    return (
        <div className="comment  d-flex w-100 my-2 ">
          <img
            src={
              authorProfileImageUrl
            }
            alt=""
            className="rounded-circle mr-3"
          />
          <div className="comment__body">
            <p className="comment__body__header mb-1">
              {authorDisplayName} <GoPrimitiveDot/>
              {moment(publishedAt).fromNow()}
            </p>
            <p><BindHtml html={textDisplay}/></p>
          </div>

        </div>
    )
}

export default Comment
