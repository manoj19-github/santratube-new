import {
  createStore,applyMiddleware,combineReducers
} from "redux"
import {composeWithDevTools}
from "redux-devtools-extension"
import thunk from "redux-thunk"

import {authReducer} from "../reducers/authReducer"
import {homeVideosReducer} from "../reducers/homeVideosReducer"
import {selectedVideosReducer} from "../reducers/selectedVideosReducer"
import {channelDetailsReducer} from "../reducers/channelDetailsReducer"
import {commentsReducer} from "../reducers/commentsReducer"
import {getRelatedVideosReducer} from "../reducers/getRelatedVideosReducer"
import {videosByChannelReducer} from "../reducers/videosByChannelReducer"
const rootReducer=combineReducers({
  authReducer,homeVideosReducer,
  selectedVideosReducer,
  channelDetailsReducer,
  commentsReducer,
  getRelatedVideosReducer,
  videosByChannelReducer
})

const store=createStore(rootReducer,{},composeWithDevTools(applyMiddleware(thunk)))

export default store
