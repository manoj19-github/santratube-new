import React,{useEffect} from 'react'
import "./_VideoMetaData.scss"
import moment from "moment"
import numeral from "numeral"
import {MdThumbUp,MdThumbDown} from "react-icons/md"
import {GoPrimitiveDot}from "react-icons/go"
import ShowMoreText from "react-show-more-text"
import {useDispatch,useSelector} from "react-redux"
import {getChannelDetailsById} from "../../redux/actions/channelAction/getChannelDetails.action"
import {getSubscriptionStatus} from "../../redux/actions/channelAction/getSubscriptionStatus.action"
const VideoMetaData = ({video:{snippet,statistics},videoId}) => {
  const {
    title,publishedAt,
    channelId,channelTitle,
    description
  }=snippet
  const {viewCount,likeCount,dislikeCount}=statistics
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getChannelDetailsById(channelId))
  },[dispatch,channelId])

  useEffect(()=>{
    dispatch(getSubscriptionStatus(channelId))
  },[dispatch,channelId])

  const {
    snippet:channelSnippet,
    statistics:channelStatistics
  }=useSelector(state=>state.channelDetailsReducer.channelData)
  const channelSubscribed=useSelector(state=>state.channelDetailsReducer.channelSubscribed)
    return (
        <div className="videoMetaData py-2">
          <div className="videoMetaData__top">
            <h5>{title}</h5>
            <div className="d-flex justify-content-between align-items-center py-1 videoMetaData__top__statContainer">
              <div className="videoMetaData__top__statContainer__data">
                <div>
                  {numeral(viewCount).format("0.a")} views
                </div>
                <div>
                  <GoPrimitiveDot/>
                </div>
                <div>
                  {moment(publishedAt).fromNow()}
                </div>
              </div>
            <div className="videoMetaData__top__statContainer__like">
              <span>
                <MdThumbUp size={26} className="like"/>{numeral(likeCount).format("0.a")}
              </span>
              <span>
                <MdThumbDown size={26} className="dislike"/>{numeral(dislikeCount).format("0.a")}
              </span>
            </div>
            </div>
          </div>
          <div className="videoMetaData__channel d-flex justify-content-center align-items-center">
              <div className="d-flex channelContainer">
                <img src={channelSnippet?.thumbnails?.default?.url}
                  className="rounded-circle"
                  alt=""/>
                <div className="d-flex flex-column">
                  <div>
                    {channelTitle}
                  </div>
                  <div>
                    {numeral(channelStatistics?.subscriberCount).format("0.a")} {'  '} Subscribers
                  </div>
                </div>

            </div>
            <button className={`btn btn-subscribed border-0
                 p-2 px-4 m-2 ${channelSubscribed && "subscribed-btn"}`}>
              {channelSubscribed ?"Subscribed":"Subscribe"}
            </button>
          </div>
          <div className="videoMetaData__description">
            <ShowMoreText
              lines={3}
              more="SHOW MORE"
              less="SHOW LESS"
              anchorClass="showMoreText"
              expanded={false}
              >
              {description}
            </ShowMoreText>

          </div>
        </div>
    )
}

export default VideoMetaData
