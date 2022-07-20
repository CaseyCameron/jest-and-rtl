import * as React from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {render, screen} from '@testing-library/react'
import user from '@testing-library/user-event'
import {Counter} from '../redux-counter'
import {store as appStore} from '../redux-store'
import {reducer} from '../redux-reducer'

test('can render with redux with defaults', () => {
  render(
    // requires the provider from react-redux and the provider's store
    // this allows us to test the Counter is if it was redux agnostic
    <Provider store={appStore}>
      <Counter />
    </Provider>,
  )
  user.click(screen.getByText('+'))
  expect(screen.getByLabelText(/count/i)).toHaveTextContent('1')
})

test('can render with redux with custom initial state', () => {
  // create and initialize our own store
  const store = createStore(reducer, {count: 3})
  render(
    <Provider store={store}>
      <Counter />
    </Provider>,
  )
  user.click(screen.getByText('-'))
  expect(screen.getByLabelText(/count/i)).toHaveTextContent('2')
})
