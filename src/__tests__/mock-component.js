import * as React from 'react'
import {render, screen} from '@testing-library/react'
import user from '@testing-library/user-event'
import {HiddenMessage} from '../hidden-message'

// mock the css transition because it has a 1000ms timeout
jest.mock('react-transition-group', () => {
  return {
    CSSTransition: (props) => (props.in ? props.children : null),
  }
})

test('shows hidden message when toggle is clicked', () => {
  const myMessage = 'hello world'
  render(<HiddenMessage>{myMessage}</HiddenMessage>)
  const toggleButton = screen.getByText(/toggle/i)
  // toggle the show state and render out a hidden message
  user.click(toggleButton)
  expect(screen.getByText(myMessage)).toBeInTheDocument()
  // toggle the show state to take hidden message off the screen
  user.click(toggleButton)
  expect(screen.queryByText(myMessage)).not.toBeInTheDocument()
})
