import * as React from 'react'
import {render, screen} from '@testing-library/react'
import user from '@testing-library/user-event'
import {savePost as mockSavePost} from '../api'
import {Editor} from '../post-editor-03-api'

jest.mock('../api')

afterEach(() => {
  jest.clearAllMocks()
})

test('renders a form with title, content, tags, and a submit button', () => {
  // this returns a promise that resolves
  mockSavePost.mockResolvedValueOnce()
  const fakeUser = {id: 'user-1'}
  render(<Editor user={fakeUser} />)
  const fakePost = {
    title: 'Test Title',
    content: 'Test content',
    tags: ['tag1', 'tag2'],
  }
  screen.getByLabelText(/title/i).value = fakePost.title
  screen.getByLabelText(/content/i).value = fakePost.content
  screen.getByLabelText(/tags/i).value = fakePost.tags.join(', ')
  const submitButton = screen.getByText(/submit/i)

  user.click(submitButton)

  expect(submitButton).toBeDisabled()

  // call this with the post data. Spread in takePost data and add authorId with fakeUser.id
  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    authorId: fakeUser.id,
  })
  expect(mockSavePost).toHaveBeenCalledTimes(1)
})
