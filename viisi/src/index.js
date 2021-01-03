import React from 'react'
import ReactDOM from 'react-dom'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import App from './App'
import './index.css'
import NotificationReducer from './reducers/NotificationReducer'
import BlogReducer from './reducers/BlogReducer'
import UserReducer from './reducers/UserReducer'
import UsersReducer from './reducers/UsersReducer'

const reducer = combineReducers({
  blogs: BlogReducer,
  notification: NotificationReducer,
  user: UserReducer,
  users: UsersReducer
})

const store = createStore(reducer, composeWithDevTools())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'))