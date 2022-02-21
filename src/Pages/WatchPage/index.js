import React,{useEffect} from 'react'
import "./WatchPage.scss"
import {Row,Container,Col} from "react-bootstrap"
import VideoMetaData from "../../components/VideoMetaData"
import VideoHorizontal from "../../components/VideoHorizontal"
import Comments from "../../components/Comments"
import {useParams} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import {getVideoById} from "../../redux/actions/videosAction/selectedVideos.action"
import {getRelatedVideosAction} from "../../redux/actions/videosAction/relatedVideos.action"
import {getPlayListVideosAction} from "../../redux/actions/videosAction/getPlayListVideos.action"
import InfiniteScroll from "react-infinite-scroll-component"
import Skeleton,{SkeletonTheme} from "react-loading-skeleton"
const WatchPage = () => {
  const dispatch=useDispatch()
  const {videoId}=useParams()
  useEffect(()=>{
    window.scrollTo(0,0)
  },[dispatch,videoId])
  useEffect(()=>{
    dispatch(getVideoById(videoId))

  },[dispatch,videoId])
  useEffect(()=>{
    dispatch(getRelatedVideosAction(videoId))
  },[dispatch,videoId])
  const fetchRelatedVideosData=()=>{
    dispatch(getRelatedVideosAction(videoId,true))
  }
  const {loading,video}=useSelector(state=>state.selectedVideosReducer)
  const {videos:relatedVideos,loading:relatedVideosLoading}=useSelector(state=>state.getRelatedVideosReducer)

    return (
      <Row>
        <Col lg={8} className="watchscreen">
          <div className="watchscreen__player">
            {
              loading ? (
                <SkeletonTheme color="#343a40" highlightColor="#3c4147">
                  <Skeleton width="100%" height="60vh"/>
                </SkeletonTheme>

              ):(
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={video?.snippet?.title}
                  allowFullScreen
                  width="100%"
                  height="100%"
                >
                </iframe>
              )

            }

            {
              !loading && video ?
              <VideoMetaData video={video} videoId={videoId}/>
              :<h5>loading ..</h5>
            }

            <Comments videoId={videoId} totalComments={video?.statistics?.commentCount}/>

          </div>
        </Col>
        <Col lg={4}>
          <InfiniteScroll
            dataLength={relatedVideos.length}
            next={fetchRelatedVideosData}
            hasMore={true}
            loader={
              <p className="text-center">Hang on data Loading ...</p>
            }
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            className="row"
            >
            {
              !loading && relatedVideos.length ? relatedVideos?.filter(video=>video.snippet).map((video,index)=>(
                <VideoHorizontal
                  key={index}
                  videoData={video}
                  videoDataId={videoId}
                />
            )):
            <SkeletonTheme color="#343a40" highlightColor="#3c4147">
              <Skeleton width="100%" height="130px" count={15}/>
            </SkeletonTheme>


            }
          </InfiniteScroll>

        </Col>
      </Row>
    )
}

export default WatchPage
