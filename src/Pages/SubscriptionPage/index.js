import React,{useEffect} from 'react'
import "./SubscriptionPage.scss"
import {getVideosByChannel} from "../../redux/actions/subscriptionAction/getSubscription.action"
import {useDispatch,useSelector} from "react-redux"
import {Container} from "react-bootstrap"
import InfiniteScroll from "react-infinite-scroll-component"
import Skeleton,{SkeletonTheme} from "react-loading-skeleton"
import SearchVideo from "../../components/searchVideo"
const SubscriptionPage = () => {
  const dispatch=useDispatch()
  useEffect(()=>{
      dispatch(getVideosByChannel())
  },[dispatch])
  const fetchData=()=>{
    dispatch(getVideosByChannel())
  }
  const {videos,loading}=useSelector(state=>state.videosByChannelReducer)
    return (
        <Container fluid>
          <InfiniteScroll
            dataLength={videos.length}
            next={fetchData}
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
              loading && !videos.length ? [...new Array(20)].map(()=>(
                <SkeletonTheme color="#343a40" highlightColor="#3c4147">
                  <Skeleton width="80%" height="30vh" style={{margin:"0.8rem 0"}}/>
                </SkeletonTheme>
              ))
              :
            (videos?.filter(video=>video.snippet.thumbnails.default.url).map((video,index)=>(
              <SearchVideo
                videoData={video}
                key={index}
                channelType={true}
              />
            )))
          }
        </InfiniteScroll>

        </Container>
    )
}

export default SubscriptionPage
