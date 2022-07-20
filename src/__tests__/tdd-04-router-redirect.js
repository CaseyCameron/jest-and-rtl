import * as React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Redirect as MockRedirect} from 'react-router'
import {savePost as mockSavePost} from '../api'
import {Editor} from '../post-editor-04-router-redirect'

jest.mock('react-router', () => {
  return {
    // return null because we don't care what it renders
    // we just need a jest function to assert how it's being called
    Redirect: jest.fn(() => null),
  }
})

jest.mock('../api')

afterEach(() => {
  jest.clearAllMocks()
})

// relies on an api so we mock it
test('renders a form with title, content, tags, and a submit button', async () => {
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

  userEvent.click(submitButton)

  expect(submitButton).toBeDisabled()

  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    authorId: fakeUser.id,
  })
  expect(mockSavePost).toHaveBeenCalledTimes(1)

  // expect this to have been called with a to: prop component
  // the second argument required is context - here it's an empty object
  // tip - don't put many expects inside a waitFor because it will increase the duration of failed test
  // want to fail faster
  await waitFor(() => expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {}))
  // don't assert toHaveBeenCallTimes() on a react-router or react component. It is an implementation detail
})
