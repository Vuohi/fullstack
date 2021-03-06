const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
},
{
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
}, {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
}, {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
}
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

const getToken = async (username, password) => {
  const user = {
    username,
    name: 'test',
    password
  }
  await api.post('/api/users')
    .send(user)
  const response = await api.post('/api/login')
    .send({ username, password })
  return response.body.token
}


test('there are as many blogs as initialblogs has', async () => {
  const response = await api.get('/api/blogs')
    .expect('Content-Type', /application\/json/)
  expect(response.body).toHaveLength(2)
})
  
test('Blog has defined id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('A blog can be added', async () => {
  const token = await getToken("Henkilo", "salasana")
 
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(initialBlogs[2])
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(3)
  expect(titles).toContain('Canonical string reduction')
  
})

test('An added blog without value for likes got zero likes', async () => {
  const token = await getToken("jotain", "jotain")
  const blog = new Blog({
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    __v: 0
  })
  
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(blog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  const response = await api.get('/api/blogs')
  expect(response.body[2].likes).toBe(0)
})

test('A new blog without title or url cannot be added', async () => {
  const token = await getToken("user", "password")
  const blog = new Blog({
    _id: "5a422b891b54a676234d17fa",
    author: "Robert C. Martin",
    likes: 10,
    __v: 0
  })
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(blog)
    .expect(400)
  
})

test('A blog can be deleted', async () => {
  const token = await getToken("dsahkl", "z4uxrcvt")

  const newBlog = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(initialBlogs[2])
    .expect(200)
  await api
    .delete(`/api/blogs/${newBlog.body.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)
  const response = await api.get('/api/blogs')
  const ids = response.body.map(r => r.id)
  expect(ids).not.toContain(`${newBlog.id}`)
})

test('A blog can be modified', async () => {
  const blog =  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 8,
    __v: 0
  }
  const updatedBlog = await api.put('/api/blogs/5a422a851b54a676234d17f7')
    .send(blog)
  expect(updatedBlog.body.likes).toBe(8)
})

afterAll(() => {
  mongoose.connection.close()
})