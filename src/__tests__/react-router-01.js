import * as React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {render, screen} from '@testing-library/react'
import user from '@testing-library/user-event'
import {Main} from '../main'
// import { createMemoryHistory } from 'history';

test('main renders about and home and I can navigate to those pages', () => {
  // create a MemoryHistory with an array of index paths. Here we only include one
  // const history = createMemoryHistory({initialEntries: ['/']})
  // const {getByRole, getByText, debug} = render(<Router history={history}><Main /></Router>)
  window.history.pushState({}, 'Test page', '/')
  render(
    // can't use 'Link' outside of a router. Without the BrowserRouter, rendering <Main /> is bugged
    <BrowserRouter>
      <Main />
    </BrowserRouter>,
  )
  expect(screen.getByRole('heading')).toHaveTextContent(/home/i)
  // don't need to abstract this into a var
  user.click(screen.getByText(/about/i))
  expect(screen.getByRole('heading')).toHaveTextContent(/about/i)
})
