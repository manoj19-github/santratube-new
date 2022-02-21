import React,{useState} from 'react'
import "./_header.scss"
import {AiOutlineSearch} from "react-icons/ai"
import {MdNotificationsNone,MdApps} from "react-icons/md"
import {FaBars} from "react-icons/fa"
import {useSelector,useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import {Link} from "react-router-dom"
const Header = ({handleToggleSidebar}) => {
  const navigate=useNavigate()
  const [searchText,setSearchText]=useState("")
  const dispatch=useDispatch()
  const handleSubmit=(e)=>{
    e.preventDefault()
    navigate(`/search/${searchText}`)
  }
  const userData=useSelector(state=>state.authReducer.user)

    return (
      <div className="header">
          <FaBars
            onClick={handleToggleSidebar}
             color="#b1bdb4" className="header__menu cursor-pointer" fontSize={28} />
          <Link to="/">
            <div className="header__logo__container">
              <img
                alt="logo"
                src="/assets/logo.jpg"
                className="header__logo__container__logo"
              />
              <div><span className="brand">Santra</span>Tube</div>
            </div>
        </Link>
        <form className="header__search" onSubmit={handleSubmit}>
          <input
            placeholder="search"
            type="text"
            value={searchText}
            onChange={(e)=>setSearchText(e.target.value)}
          />
        <button type="submit">
          <AiOutlineSearch
            color="#b1bdb4"
            fontSize={28}
          />
        </button>
        </form>
        <div className="header__icons">
          <MdNotificationsNone className="header__icons__notify" color="#b1bdb4" fontSize={27}/>
          <MdApps size={28} className="header__icons__apps"/>
          <img
            src={userData?.imgURL}
            alt="avatar"
            className="header__icons__avatar"
          />
        </div>
      </div>
    )
}

export default Header
