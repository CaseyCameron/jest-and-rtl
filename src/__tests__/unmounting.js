import * as React from 'react'
import {render, act} from '@testing-library/react'
import {Countdown} from '../countdown'

beforeAll(() => {
  // listen for console.error and throw an empty object if found
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterAll(() => {
  // restore the regular functionality of console.error to isolate tests
  console.error.mockRestore()
})

afterEach(() => {
  // clear all mocks after each test
  jest.clearAllMocks()
  // restore normal timers
  jest.useRealTimers()
})

test('does not attempt to set state when unmounted (to prevent memory leaks)', () => {
  // force this to happen more quickly to ensure test failure isn't missed due to timeout
  jest.useFakeTimers()
  // grab unmount to test the cleanup phase
  const {unmount} = render(<Countdown />)
  unmount()
  // jest faketimers requires act
  // ensure that if there's a problem we'll be made aware of it
  act(() => jest.runOnlyPendingTimers())
  // if we didn't have a clearInterval in the countdown component, react would throw an error
  // let's assert it wasn't called
  expect(console.error).not.toHaveBeenCalled()
})
