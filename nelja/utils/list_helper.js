const dummy = (blogs) => {
    return 1
}
  
const totalLikes = (blogs) => {
  return blogs.map(blog => blog.likes).reduce((acc, curr) => acc + curr)
}

const favoriteBlog = (blogs) => {
  const mostLikes = Math.max(...blogs.map(blog => blog.likes))
  return blogs.find(blog => blog.likes === mostLikes)
}

const mostBlogs = (blogs) => {
  const allBlogs = blogs.reduce((acc, curr) => {
    if (!acc[curr.author]) {acc[curr.author] = 0}
    acc[curr.author] += 1
    return acc
  }, {})
  const values = Object.values(allBlogs)
  let authorWithMostBlogs = {}
  authorWithMostBlogs.blogs = Math.max(...values)
  for (const [key, value] of Object.entries(allBlogs)) {
    if (value === authorWithMostBlogs.blogs) {
      authorWithMostBlogs.author = key
    }
  }
  return authorWithMostBlogs
}

const mostLikes = (blogs) => {
  const allLikes = blogs.reduce((acc, curr) => {
    if (!acc[curr.author]) { acc[curr.author] = 0 }
    acc[curr.author] += curr.likes
    return acc
  }, {})
  const values = Object.values(allLikes)
  let authorWithMostLikes = {}
  authorWithMostLikes.likes = Math.max(...values)
  for (const [key, value] of Object.entries(allLikes)) {
    if (value === authorWithMostLikes.likes) {
      authorWithMostLikes.author = key
    }
  }
  return authorWithMostLikes
}
  
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}

