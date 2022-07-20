import * as React from 'react'
import {render} from '@testing-library/react'
import {reportError as mockReportError} from '../api'
import {ErrorBoundary} from '../error-boundary'

jest.mock('../api')

afterEach(() => {
  // clear the mocks that are default to the api module are cleared after each test
  // don't let them leak out into other tests
  jest.clearAllMocks()
})

// this only exists in our tests just to test the error boundary
// it doesn't matter what this renders, only the throw new Error
function Bomb({shouldThrow}) {
  if (shouldThrow) {
    throw new Error('💣')
  } else {
    return null
  }
}

test('calls reportError and renders that there was a problem', () => {
  mockReportError.mockResolvedValueOnce({success: true})
  const {rerender} = render(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>,
  )

  //test a future error boundary w/ diff props w/ rerender
  rerender(
    <ErrorBoundary>
      <Bomb shouldThrow={true} />
    </ErrorBoundary>,
  )
  // the mockReport Error is called with an error and info
  // info is simply information about the component that throws the error
  const error = expect.any(Error)
  const info = {componentStack: expect.stringContaining('Bomb')}
  expect(mockReportError).toHaveBeenCalledWith(error, info)
  expect(mockReportError).toHaveBeenCalledTimes(1)
})

/*
eslint
  jest/prefer-hooks-on-top: off
*/
