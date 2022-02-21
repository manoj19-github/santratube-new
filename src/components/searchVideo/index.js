import React,{useEffect,useState} from 'react'
import {Container,Row,Col} from "react-bootstrap"
import request from "../../redux/api"
import "./searchVideo.scss"
import {AiFillEye} from "react-icons/ai"
import moment from "moment"
import numeral from "numeral"
import {GoPrimitiveDot}from "react-icons/go"
import { LazyLoadImage } from 'react-lazy-load-image-component'
import {useNavigate} from "react-router-dom"
import {CgPlayList} from "react-icons/cg"
const SearchVideo = ({videoData,channelType}) => {
  const [views,setViews]=useState(null)
  const [playlistToVideo,setplaylistToVideo]=useState(null)
  const [playlistVideoTotal,setplaylistVideoTotal]=useState(null)
  const [duration,setDuration]=useState(null)
  const [channelIcon,setChannelIcon]=useState(null)
  const [channelSubscriber,setChannelSubscriber]=useState(null)
  const [channelVideos,setChannelVideos]=useState(null)
  const seconds=moment.duration(duration).asSeconds()
  const _duration=moment.utc(seconds*1000).format("mm:ss")
  const navigate=useNavigate()
  const {id,snippet:{
    channelId,channelTitle,
    title,publishedAt,description,
    thumbnails:{medium},resourceId
  },}=videoData
  const _channelId=resourceId?.channelId||channelId
  const {snippet:{thumbnails}}=videoData
  const isVideo=id.kind ==="youtube#video"
  const isChannel=id.kind==="youtube#channel"

  const isPlaylist=id.kind==="youtube#playlist"
  const itemsKind=id.kind
  const _videoId=id?.videoId ||id

  useEffect(()=>{
    if(!isChannel) return
    const get_channel_details=async()=>{
      const {data:{items}}=await request("/channels",{
        params:{
          part:"snippet,contentDetails,statistics",
          id:id.channelId
        }
      })
      setChannelSubscriber(items[0].statistics.subscriberCount)
      setChannelVideos(items[0].statistics.videoCount)
      console.log("youtube channelData ",items)
    }
    get_channel_details()
  },[itemsKind])

  useEffect(()=>{
    if(!isVideo) return
    const get_video_details=async()=>{
      const {data:{items}}=await request("/videos",{
        params:{
          part:"contentDetails,statistics",
          id:_videoId,
        }
      })
      console.log("items channel",items)

      setDuration(items[0].contentDetails.duration)
      setViews(items[0].statistics.viewCount)

    }
    get_video_details()
  },[isVideo,_videoId])

  useEffect(()=>{

    const get_channel_details=async()=>{
      const {data:{items}}=await request("/channels",{
        params:{
          part:"snippet",
          id:channelId,
        }
      })
      setChannelIcon(items[0].snippet.thumbnails.default)
    }
    get_channel_details()
  },[channelId])

  // playlists details
  useEffect(()=>{
    if(!isPlaylist) return
    const get_playlist_details=async()=>{
      const {data:{items}}=await request("/playlistItems",{
        params:{
          part:"contentDetails,snippet,status",
          playlistId:id.playlistId,
          maxResults:500
        }
      })
      console.log("data playlist  : ",items)
      setplaylistVideoTotal(items.length)
      setplaylistToVideo(items[0].contentDetails.videoId)
    }
    get_playlist_details()

  },[isPlaylist])
  const handleClick=()=>{
    if(isVideo){
      navigate(`/watch/${_videoId}`)
    }else if(isPlaylist){
      navigate(`/watch/${playlistToVideo}`)
    }
  }
    return (
      <Container className="searchVideo" onClick={handleClick}>
        <Row>
          <Col md={12} lg={4} className="searchVideo__left">
            {
              thumbnails && thumbnails.default.url && (
                <>
                <LazyLoadImage src={`${thumbnails.default.url}`}
                 effect="blur" className={`searchVideo__left__image ${isChannel || channelType && "channelIcon"}`}/>
               </>
              )
            }
           {
            isPlaylist &&(
              <div className="searchVideo__left__playlist__overlay">
                <p>{playlistVideoTotal}</p>
                <CgPlayList fontSize={24}/>
              </div>
            )
           }

           <span className="searchVideo__left__duration">{isVideo && _duration}</span>
          </Col>
          <Col lg={8} md={0} className={`searchVideo__right ${isChannel &&  "channelPage"} ${channelType && "channelType"}`}>
            {
              isChannel || channelType && <h4 className={`searchVideo__right__channelTitle ${channelType && "channelType__title"}`}>{title}</h4>
            }

            {
              isChannel &&(
                <div>
                  <div>
                    <span>{numeral(channelSubscriber).format("0.a")} subscribers </span>
                    <span><GoPrimitiveDot/></span>
                    <span>{channelVideos} videos</span>
                  </div>
                  <p>{description}</p>

                </div>
              )
            }
            {
               isPlaylist && (

                <div className="searchVideo__right__title">
                  {title}
                </div>
              )}
              {
                isVideo && (
                  <>
                  <div className="searchVideo__right__title">
                    {title}
                  </div>
                <div className="searchVideo__right__details">
                  <span>
                    <AiFillEye fontSize={17} style={{marginRight:"0.4rem"}}/>{numeral(views).format("0.a")} views
                  </span>
                  <span><GoPrimitiveDot/></span>
                  <span>
                    {moment(publishedAt).fromNow()}
                  </span>
                </div>
                <div className="searchVideo__right__channelContainer">
                  <LazyLoadImage src={channelIcon?.url}
                   effect="blur" className="searchVideo__right__channelContainer__image"/>
                 <p>{channelTitle}</p>
                </div>
                <div className="searchVideo__right__videoDetails">
                  {description}
                </div>
                </>

            )}
              {
                isPlaylist && (
                  <div className="searchVideo__right__channelContainer">
                   <p>{channelTitle}</p>
                  </div>
                )
              }



          </Col>
        </Row>
      </Container>

    )
}

export default SearchVideo
