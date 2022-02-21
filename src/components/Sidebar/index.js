import React,{useState} from 'react'
import  "./_sidebar.scss"
import {Link} from "react-router-dom"
import {useDispatch} from "react-redux"
import {
    MdSubscriptions,
    MdExitToApp,
    MdThumbUp,
    MdHistory,
    MdLibraryBooks,
    MdHome,
    MdSentimentDissatisfied
} from "react-icons/md"
import {logoutAction} from "../../redux/actions/authActions/auth.action"

const Sidebar = ({sidebarOpen,  handleToggleSidebar}) => {
  const dispatch=useDispatch()
  const handleLogout=()=>{
    dispatch(logoutAction())
  }

    return (
        <nav
          className={`${sidebarOpen?"sidebar":"sidebar open"}`}
          onClick={()=>handleToggleSidebar(false)}
        >

            <Link to="/">
              <li>
                <MdHome fontSize={25}/>
                <span>Home</span>
              </li>
            </Link>
            <Link to="/feed/subscriptions">
              <li>
                <MdSubscriptions fontSize={25}/>
                <span>Subscription</span>
              </li>
            </Link>
            <li>
              <MdThumbUp fontSize={25}/>
              <span>Liked Videos</span>
            </li>
            <li>
              <MdHistory fontSize={25}/>
              <span>History</span>
            </li>
            <li>
              <MdLibraryBooks fontSize={25}/>
              <span>Library</span>
            </li>
            <li>
              <MdSentimentDissatisfied fontSize={25}/>
              <span>I Dont Know</span>
            </li>
            <hr/>
            <li onClick={handleLogout }>
              <MdExitToApp fontSize={25}/>
              <span>Log out</span>
            </li>
            <hr/>

        </nav>
    )
}

export default Sidebar
