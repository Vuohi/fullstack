const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

test('user without proper name cannot be created', async () => {
    const user = {
        username: "er",
        name: "kas", 
        password: "jfdjfire"
    }

    await api.post('/api/users')
        .send(user)
        .expect(400)
    
    const users = await api.get('/api/users')
    const usernames = users.body.map(u => u.username)
    expect(usernames).not.toContain("er")
})

test('user without proper password cannot be created', async () => {
    const user = {
        username: "user",
        name: "kas", 
        password: "jf"
    }

    await api.post('/api/users')
        .send(user)
        .expect(400)
    
    const users = await api.get('/api/users')
    const usernames = users.body.map(u => u.username)
    expect(usernames).not.toContain("user")
    
})

test('user without unique username cannot be created', async () => {
    const user = {
        username: "user",
        name: "kas", 
        password: "jfdjfire"
    }

    await api.post('/api/users')
        .send(user)
        .expect(200)
    
        await api.post('/api/users')
        .send(user)
        .expect(400)
})

afterAll(() => {
    mongoose.connection.close()
})