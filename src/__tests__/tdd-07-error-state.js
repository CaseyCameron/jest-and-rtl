import * as React from 'react'
import {render, screen} from '@testing-library/react'
import user from '@testing-library/user-event'
import {build, sequence} from 'test-data-bot'
import {savePost as mockSavePost} from '../api'
import {Editor} from '../post-editor-07-error-state'

jest.mock('react-router', () => {
  return {
    Redirect: jest.fn(() => null),
  }
})
jest.mock('../api')

afterEach(() => {
  jest.clearAllMocks()
})

const userBuilder = build('User').fields({
  id: sequence((s) => `user-${s}`),
})

test('renders an error message from the server', async () => {
  const testError = 'test error'
  // a rejected value will also be a data object. It has an error property.
  mockSavePost.mockRejectedValueOnce({data: {error: testError}})
  const fakeUser = userBuilder()
  render(<Editor user={fakeUser} />)
  const submitButton = screen.getByText(/submit/i)

  user.click(submitButton)
  // findBy's are asynchronous
  const postError = await screen.findByRole('alert')
  // our alert should have our 'test error' message
  expect(postError).toHaveTextContent(testError)
  expect(submitButton).toBeEnabled()
})
