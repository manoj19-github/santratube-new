import React from 'react'
import {Routes,Route} from "react-router-dom"
import HomePage from "../Pages/HomePage"
import LoginPage from "../Pages/LoginPage"
import Layout from "../utils/Layout"
import WatchPage from "../Pages/WatchPage"
import SearchPage from "../Pages/SearchPage"
import SubscriptionPage from "../Pages/SubscriptionPage"
const RouteContainer = () => {
    return (
          <Routes>
            <Route path="/auth" exact element={<LoginPage/>}>
            </Route>
            <Route path="/" exact element={<Layout><HomePage/></Layout>}>
            </Route>
            <Route path="/watch/:videoId" exact element={<Layout><WatchPage/></Layout>}>
            </Route>
            <Route path="/search/:query" exact element={<Layout><SearchPage/></Layout>}>
            </Route>
            <Route path="/channel/:channelId" exact element={<Layout><SearchPage/></Layout>}>
            </Route>
            <Route path="/feed/subscriptions" exact element={<Layout><SubscriptionPage/></Layout>}>
            </Route>
            <Route path="*" exact element={<h1>Not Found</h1>}>
            </Route>
          </Routes>
    )
}

export default RouteContainer
