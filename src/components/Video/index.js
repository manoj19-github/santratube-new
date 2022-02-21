import React,{useEffect,useState} from 'react'
import "./_video.scss"
import {AiFillEye} from "react-icons/ai"
import request from "../../redux/api"
import moment from "moment"
import numeral from "numeral"
import {GoPrimitiveDot}from "react-icons/go"
import { LazyLoadImage } from 'react-lazy-load-image-component'
import {useNavigate} from "react-router-dom"
const Video = ({videoData}) => {
  const [views,setViews]=useState(null)
  const [duration,setDuration]=useState(null)
  const [channelIcon,setChannelIcon]=useState(null)
  const seconds=moment.duration(duration).asSeconds()
  const _duration=moment.utc(seconds*1000).format("mm:ss")
  const navigate=useNavigate()
  const {id,snippet:{
    channelId,channelTitle,
    title,publishedAt,
    thumbnails:{medium}
  },}=videoData
  const _videoId=id?.videoId ||id
  useEffect(()=>{
    const get_video_details=async()=>{
      const {data:{items}}=await request("/videos",{
        params:{
          part:"contentDetails,statistics",
          id:_videoId,
        }
      })
      console.log("items",items)

      setDuration(items[0].contentDetails.duration)
      setViews(items[0].statistics.viewCount)

    }
    get_video_details()
  },[_videoId])

  useEffect(()=>{
    const get_video_details=async()=>{
      const {data:{items}}=await request("/channels",{
        params:{
          part:"snippet",
          id:channelId,
        }
      })
      setChannelIcon(items[0].snippet.thumbnails.default)
    }
    get_video_details()
  },[channelId])
  const handleClick=()=>{
    navigate(`/watch/${_videoId}`)
  }
    return (
        <div className="video" onClick={handleClick}>
          <div className="video__top">
            <LazyLoadImage  src={medium.url} effect="blur"/>
            <span className="video__top__duration">{_duration}</span>
          </div>
          <div className="video__title">
            {title}
          </div>
          <div className="video__details">
            <span>
              <AiFillEye fontSize={17}/>{numeral(views).format("0.a")} views
            </span>
            <span><GoPrimitiveDot/></span>
            <span>
              {moment(publishedAt).fromNow()}
            </span>
          </div>
          <div className="video__channel">
            {channelIcon &&         <LazyLoadImage  src={channelIcon?.url} effect={"blur"}/>}
            <p>{channelTitle}</p>
          </div>
        </div>
    )
}

export default Video
