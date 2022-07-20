import * as React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import user from '@testing-library/user-event'
import {setupServer} from 'msw/node'
import {rest} from 'msw'
import {GreetingLoader} from '../greeting-loader-01-mocking'
// polyfill fetch api so tests running in node can make fetch requests
import 'whatwg-fetch'

const server = setupServer(
  rest.post('/greeting', (req, res, ctx) => {
    // respond with exactly the same thing your api would respond with
    return res(ctx.json({data: {greeting: `Hello ${req.body.subject}`}}))
  }),
)
// intercept /greeting with msw w/ some error redundancy, for typos - will say network request failed
beforeAll(() => server.listen({onUnhandledRequest: 'error'}))
afterAll(() => server.close())
// isolate the tests in the event we add additional serverHandlers for specific tests
afterEach(() => server.resetHandlers())

test('loads greetings on click', async () => {
  render(<GreetingLoader />)
  const nameInput = screen.getByLabelText(/name/i)
  const loadButton = screen.getByText(/load/i)
  user.type(nameInput, 'Mary')
  user.click(loadButton)
  await waitFor(() =>
    expect(screen.getByLabelText(/greeting/i)).toHaveTextContent(/hello mary/i),
  )
})
