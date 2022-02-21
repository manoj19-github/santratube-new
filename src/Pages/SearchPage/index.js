import React,{useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux"
import "./SearchPage.scss"
import {Row,Col} from "react-bootstrap"
import SearchVideo from "../../components/searchVideo"
import {getSearchedVideosAction} from "../../redux/actions/videosAction/searchVideos.action"
import {useParams} from "react-router-dom"
import InfiniteScroll from "react-infinite-scroll-component"
import Skeleton,{SkeletonTheme} from "react-loading-skeleton"
import {getChannelPlaylist} from "../../redux/actions/channelAction/getChannelPlayList.action"
const SearchPage = () => {
  const dispatch=useDispatch()
  const {query,channelId}=useParams()
  useEffect(()=>{
    if(channelId) return
    dispatch(getSearchedVideosAction(query))
  },[dispatch,query])
  const {videos,loading}=useSelector(state=>state.homeVideosReducer)
  const fetchData=()=>{
    if(channelId) return 
    dispatch(getSearchedVideosAction(query))
  }
  useEffect(()=>{
    if(!channelId) return
    dispatch(getChannelPlaylist(channelId))
  },[channelId])

    return (
      <div className="searchPage_container">
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
                <Skeleton width="80%" height="30vh" style={{margin:"0.5rem 0"}}/>
              </SkeletonTheme>
            ))
            :
          (videos?.map((video,index)=>(
            <SearchVideo videoData={video} key={index}/>
          )))
        }
      </InfiniteScroll>
      </div>

    )
}

export default SearchPage
