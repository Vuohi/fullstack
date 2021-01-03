const BlogReducer = (state = [], action) => {
  switch (action.type) {
  case 'ADD':
    return state.concat(action.blog)
  case 'BLOGS':
    return action.blogs
  case 'REMOVE':
    return state.filter(blog => blog.id !== action.id)
  case 'LIKE': {
    const likeableBlog = state.find(blog => blog.id === action.id)
    const changedBlog = { ...likeableBlog, likes: likeableBlog.likes+1 }
    return state.map(blog => blog.id === action.id ? changedBlog : blog)
  }
  case 'COMMENT': {
    const commentedBlog = state.find(blog => blog.id === action.id)
    const changedBlog = { ...commentedBlog, comments: commentedBlog.comments.concat(action.comment) }
    return state.map(blog => blog.id === action.id ? changedBlog : blog)
  }
  default:
    return state
  }
}

export const setBlogs = (blogs) => {
  return {
    type: 'BLOGS',
    blogs
  }
}

export const add = (blog) => {
  return {
    type: 'ADD',
    blog
  }
}

export const remove = (id) => {
  return {
    type: 'REMOVE',
    id
  }
}

export const addLike = (id) => {
  return {
    type: 'LIKE',
    id
  }
}

export const comment = (id, comment) => {
  return {
    type: 'COMMENT',
    id,
    comment
  }
}

export default BlogReducer