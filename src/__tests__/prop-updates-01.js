import * as React from 'react'
import user from '@testing-library/user-event'
import {render, screen} from '@testing-library/react'
import {FavoriteNumber} from '../favorite-number'

test('entering an invalid value shows an error message', () => {
  const {debug, rerender} = render(<FavoriteNumber />)
  const input = screen.getByLabelText(/favorite number/i)
  user.type(input, '10')
  // the number will be invalid here
  expect(screen.getByRole('alert')).toHaveTextContent(/the number is invalid/i)
  debug()
  // the number will be valid below so we must rerender <FavoriteNumber />
  rerender(<FavoriteNumber max={10} />)
  debug()
  // since the number is good we expect the alert message not to be in the document
  expect(screen.queryByRole('alert')).not.toBeInTheDocument()
})

// disabling the rule for the purposes of the exercise
/*
eslint
  testing-library/no-debug: "off",
*/
