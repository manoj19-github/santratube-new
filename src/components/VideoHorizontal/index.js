import React,{useState,useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import {Row,Col} from "react-bootstrap"
import {AiFillEye} from "react-icons/ai"
import request from "../../redux/api"
import moment from "moment"
import numeral from "numeral"
import {GoPrimitiveDot}from "react-icons/go"
import { LazyLoadImage } from 'react-lazy-load-image-component'
import "./_videoHorizontal.scss"
const VideoHorizontal = ({videoData,videoDataId}) => {
  const [views,setViews]=useState(null)
  const [duration,setDuration]=useState(null)
  const [channelIcon,setChannelIcon]=useState(null)
  const seconds=moment.duration(duration).asSeconds()
  const _duration=moment.utc(seconds*1000).format("mm:ss")
  const navigate=useNavigate()
  const {id,snippet:{
    channelId,channelTitle,
    title,publishedAt,
    thumbnails:{medium},
  },}=videoData
  //const _videoId=id?.videoId ||id
  useEffect(()=>{
    const get_video_details=async()=>{
      const {data:{items}}=await request("/videos",{
        params:{
          part:"contentDetails,statistics",
          id:id.videoId,
        }
      })
      console.log("items",items)

      setDuration(items[0].contentDetails.duration)
      setViews(items[0].statistics.viewCount)

    }
    get_video_details()
  },[id])

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
    navigate(`/watch/${id.videoId}`)
  }
    return (
        <Row className="videoHorizontal m-1 py-2 align-items-center" onClick={handleClick}>
          <Col xs={6}  className="videoHorizontal__left">
          <LazyLoadImage
              src={medium.url}
              alt="avatar"
              effect="blur"
              className="videoHorizontal__left__thumbnail"
              wrapperClassName="videoHorizontal__left__thumbnail-wrapper"
            />

          <span className="duration">{_duration}</span>
          </Col>
          <Col xs={6} className="videoHorizontal__right p-0">
            <p className="videoHorizontal__right__title">
                {title}
            </p>

            <div className="videoHorizontal__right__channel">
              {/*<LazyLoadImage  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4FRdJhLdEEhFbcIuR-DEGYsFMjn-6QUGZ7A&usqp=CAU" effect="blur" />*/}
              <p>{channelTitle}</p>
            </div>
            <div className="videoHorizontal__right__details">
              <span><AiFillEye fontSize={17}/> {numeral(views).format("0.a")} views</span>
              <GoPrimitiveDot/>
              <span>{moment(publishedAt).fromNow()}</span>
            </div>
          </Col>

        </Row>
    )
}

export default VideoHorizontal
