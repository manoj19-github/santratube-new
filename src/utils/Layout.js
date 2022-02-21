import React,{useState} from 'react'
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import {Container} from "react-bootstrap"
const Layout = ({children}) => {
  const [sidebarOpen,isSidebarOpen]=useState(false)
  const handleToggleSidebar=()=>{
    isSidebarOpen(value=>!value)
  }
    return (
      <div className="app__page">
      <Header
        handleToggleSidebar={handleToggleSidebar}
      />
      <div className="app_container_parent">
      <div className="app__container">
        <Sidebar
          sidebarOpen={sidebarOpen}
          handleToggleSidebar={handleToggleSidebar}
          />
      </div>
      <Container fluid className="app__main">
        {children}
      </Container>
    </div>
    </div>
    )
}
export default Layout
