import * as React from 'react'
import {Provider} from 'react-redux'
import {render, screen} from '@testing-library/react'
import user from '@testing-library/user-event'
import {Counter} from '../redux-counter'
import {store} from '../redux-store'

test('can render with redux with defaults', () => {
  render(
    // requires the provider from react-redux and the provider's store
    // this allows us to test the Counter is if it was redux agnostic
    <Provider store={store}>
      <Counter />
    </Provider>,
  )
  user.click(screen.getByText('+'))
  expect(screen.getByLabelText(/count/i)).toHaveTextContent('1')
})
