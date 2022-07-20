import * as React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
// NOTE: for this one we're not using userEvent because
// I wanted to show you how userEvent can improve this test
// in the final lesson.
import {submitForm as mockSubmitForm} from '../api'
import App from '../app'

jest.mock('../api')

test('Can fill out a form across multiple pages', async () => {
  // this is what our server would respond with
  mockSubmitForm.mockResolvedValueOnce({success: true})
  const testData = {food: 'test food', drink: 'test drink'}
  render(<App />)

  fireEvent.click(screen.getByText(/fill.*form/i))

  fireEvent.change(screen.getByLabelText(/food/i), {
    // the change event target value should be 'test food'
    target: {value: testData.food},
  })
  fireEvent.click(screen.getByText(/next/i))

  fireEvent.change(screen.getByLabelText(/drink/i), {
    target: {value: testData.drink},
  })
  fireEvent.click(screen.getByText(/review/i))
  // this is the confirmation/review page
  expect(screen.getByLabelText(/food/i)).toHaveTextContent(testData.food)
  expect(screen.getByLabelText(/drink/i)).toHaveTextContent(testData.drink)

  // this getByText picks up two instances of confirm on the page so scope it by css selector: button
  fireEvent.click(screen.getByText(/confirm/i, {selector: 'button'}))
  // when the form is submitted ensure it was called once with testData
  // mock this because this api form submit is asynchronous
  expect(mockSubmitForm).toHaveBeenCalledWith(testData)
  expect(mockSubmitForm).toHaveBeenCalledTimes(1)

  fireEvent.click(await screen.findByText(/home/i))

  expect(screen.getByText(/welcome home/i)).toBeInTheDocument()
})
