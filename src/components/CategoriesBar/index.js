import React,{useState} from 'react'
import "./CategoriesBar.scss"
import {useDispatch} from "react-redux"
import {getSearchedVideosAction}
from "../../redux/actions/videosAction/searchVideos.action"
import {getPopularVideosAction}
 from "../../redux/actions/videosAction/videos.action"
const keywords=[
  "All",
  "React js",
  "Javascript",
  "use of Internet",
  "Music",
  "Bengali Song",
  "kishor kumar",
  "Cricket",
  "coder's life",
  "Gatsby",
  "Lata mangeshkar",
  "Redux",
  "Backend Development",
  "IOT",
  "Android Development",
  "Javascript",
  "use of Internet",
  "Music",
  "Bengali Song",
  "kishor kumar",
  "Cricket",
  "coder's life",
  "Gatsby",
  "Redux",
  "Backend Development",
  "IOT",
  "Android Development"
]
const CategoriesBar = () => {
  const [activeElement,setActiveElement]=useState('All')
  const dispatch=useDispatch()
  const handleClick=(value)=>{
    setActiveElement(value)
    if(value=="All"){
      dispatch(getPopularVideosAction())
    }else{
      dispatch(getSearchedVideosAction(value))
    }
  }
    return (
        <div className="CategoriesBar">
          {
            keywords.map((key,index)=>(
              <div
                key={index}
                onClick={()=>handleClick(key)}
                className={`${activeElement===key ?"active":""} cursor-pointer`}
              >
                {key}
              </div>
            ))
          }

        </div>
    )
}

export default CategoriesBar
