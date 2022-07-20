import * as React from 'react'
import {render, screen, within} from '@testing-library/react'
import {Modal} from '../modal'

test('modal shows the children', () => {
  // the div below doesn't appear inside the container that render creates for us, it's in a diff dom node
  // however we have access to the div and we have access to everything in the document.body
  // the modal content is appended to the body, (this is required one way or another)
  render(
    <Modal>
      <div data-testid="test" />
    </Modal>
  )
  // let's grab a specific query within the modal-root
  const { getByTestId} = within(document.getElementById('modal-root'))
  expect(getByTestId('test')).toBeInTheDocument()
})
