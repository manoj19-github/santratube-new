import React,{useEffect} from 'react'
import {Row,Col,Container} from "react-bootstrap"
import CategoriesBar from "../../components/CategoriesBar"
import Video from "../../components/Video"
import {useDispatch,useSelector} from "react-redux"
import {getPopularVideosAction} from "../../redux/actions/videosAction/videos.action"
import {getSearchedVideosAction} from "../../redux/actions/videosAction/searchVideos.action"
import InfiniteScroll from "react-infinite-scroll-component"
import "./HomePage.scss";
import HomeSkeleton from "../../components/Skeleton/HomeSkeleton"

const HomePage = () => {
  const {videos,loading,activeCategory}=useSelector(state=>state.homeVideosReducer)
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getPopularVideosAction())
  },[])

  const fetchData=()=>{
    if(activeCategory=="all")
      dispatch(getPopularVideosAction())
    else
      dispatch(getSearchedVideosAction(activeCategory))
  }
    return (
      <Container className="video_page">
        <CategoriesBar/>
      <Row className="video-container">
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
              loading && !videos.length && (
              [...Array(20)].map(()=>(
                <Col lg={3} md={4}>
                  <HomeSkeleton/>
                </Col>
              ))
            )
          }
          {
          videos.map((video,index)=>(
              <Col lg={3} md={4}>
                <Video videoData={video} key={video.id}/>
              </Col>
            ))

          }
        </InfiniteScroll>

        </Row>


      </Container>
    )
}

export default HomePage
