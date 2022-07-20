import * as React from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {render as rtlRender, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Counter} from '../redux-counter'
import {reducer} from '../redux-reducer'

// extrapolate this to a global file to make it easier throughout the codebase to test any component
// that's connected to redux
function render(
  ui,
  {
    initialState,
    store = createStore(reducer, initialState),
    ...rtlOptions
  } = {},
) {
  function Wrapper({children}) {
    return <Provider store={store}>{children}</Provider>
  }
  return {
    // return the rtlRender inside an object with the store
    // return the store in case assertions are needed, although it's an implementation detail
    ...rtlRender(ui, {wrapper: Wrapper, ...rtlOptions}),
    store,
  }
}

test('can increment the value', () => {
  render(<Counter />)
  userEvent.click(screen.getByText('+'))
  expect(screen.getByLabelText(/count/i)).toHaveTextContent('1')
})

test('can decrement the value', () => {
  render(<Counter />, {
    initialState: {count: 3},
  })
  userEvent.click(screen.getByText('-'))
  expect(screen.getByLabelText(/count/i)).toHaveTextContent('2')
})
