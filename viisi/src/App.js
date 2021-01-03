import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import {Navbar, Nav, Row, Col} from 'react-bootstrap'
import BlogList from './components/BlogList'
import usersService from './services/users'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import LoggedInBar from './components/LoggedInBar'
import Notification from './components/Notification'
import CreateForm from './components/CreateForm'
import Users from './components/Users'
import User from './components/User'
import BlogView from './components/BlogView'
import { setBlogs, addLike, comment } from './reducers/BlogReducer'
import { setUser } from './reducers/UserReducer'
import { setUsers } from './reducers/UsersReducer'



const App = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(setBlogs( blogs ))
    )
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      dispatch(setUser(JSON.parse(loggedUser)))
      blogService.setToken(JSON.parse(loggedUser).token)
    }
  }, [])

  useEffect(() => {
    usersService.getAll().then(users =>
      dispatch(setUsers(users)))
  })

  const like = (blog, event) => {
    event.preventDefault()
    const modifiedBlog = {
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
      url: blog.url,
      user: blog.user?.id,
      comments: blog.comments
    }       
    blogService.upDate(blog.id, modifiedBlog)
    dispatch(addLike(blog.id))
  }

  const handleComment = (blog, content, event) => {
    event.preventDefault()
    const modifiedBlog = {
      title: blog.title,
      author: blog.author,
      likes: blog.likes,
      url: blog.url,
      user: blog.user?.id,
      comments: blog.comments?.concat(content)
    }
    blogService.upDate(blog.id, modifiedBlog)
    dispatch(comment(blog.id, content))
  }

  const navLinkColor = {
    color: "rgb(178 187 246)",
    paddingTop: "0"
  }
  

  return (
    <div class="container">
    <Router>
        <Notification  />
        {user === [] ? <LoginForm  />
          :
          <>
            
            <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" className="justify-content-between">
            <Navbar.Brand href="#home">BlogList</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Row className="justify-content-xl">
                  <Col xs>
              <Nav.Link href="#" as="span">
                <Link class="nav-link" style={navLinkColor} to="/users">Users</Link>
                    </Nav.Link>
                    </Col>
                  <Col xs>
              <Nav.Link href="#" as="span">
                <Link class="nav-link" style={navLinkColor} to="/blogs">Blogs</Link>
                    </Nav.Link>
                  </Col>
                  <Col md="auto">
                    <LoggedInBar />
                    </Col>
                  </Row>
                </Navbar.Collapse>
              </Navbar>
          
            <Switch>
              <Route path="/blogs/:id" render={(props) => {
                return (<BlogView {...props} like={like} handleComment={handleComment} />)
              }} />
              <Route path="/users/:id" render={(props) => {
                return (<User {...props} />)
              }} />
              <Route path="/users">
                <Users />
              </Route>
              <Route path="/">
                <BlogList like={like}  />
                <CreateForm />
              </Route>
            </Switch>
          </>
        }
      </Router>
      </div>
  )
}

export default App