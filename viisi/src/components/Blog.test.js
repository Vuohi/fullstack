import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'
import BlogList from './BlogList'

let blog
let user

beforeEach(() => {
  blog = {
    id: '12345',
    title: 'Otsikko',
    author: 'Blogin kirjoittaja',
    url: 'www.nettiosoite.fi',
    likes: 0,
    user: {
      id: '123',
      name: 'Koko Nimi',
      username: 'Käyttäjänimi'
    }
  }

  user = {
    id: '123',
    name: 'Koko Nimi',
    username: 'Käyttäjänimi'
  }


})

test('Author and title visible, but not url and likes', () => {
  const component = render(
    <Blog blog={blog} user={user} />
  )

  const div = component.container.querySelector('.hideWhenVisible')
  expect(div).not.toHaveStyle('display: none')

  const div2 = component.container.querySelector('.showWhenVisible')
  expect(div2).toHaveStyle('display: none')


})

test('Also url and likes are visible after button press', () => {

  const component = render(
    <Blog blog={blog} user={user} />
  )

  const button = component.getByText('View')
  fireEvent.click(button)

  const div = component.container.querySelector('.hideWhenVisible')
  expect(div).toHaveStyle('display: none')

  const div2 = component.container.querySelector('.showWhenVisible')
  expect(div2).not.toHaveStyle('display: none')
})

test('Clicking button twice causes two function calls', () => {
  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} handler={mockHandler} />
  )

  const viewButton = component.getByText('View')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('Like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})



