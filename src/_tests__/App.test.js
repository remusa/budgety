import React from 'react'
import { render, cleanup, fireEvent } from 'test-utils'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import App from '../App'

afterEach(cleanup)

it('full app rendering/navigating', () => {
  const history = createMemoryHistory()

  const { getByText, getByTestId } = render(
    <Router history={history}>
      <App />
    </Router>
  )

  expect(getByTestId('heading')).toHaveTextContent('React + TypeScript + Parcel Boilerplate')

  fireEvent.click(getByText(/log in/i))
  expect(getByTestId('login-page')).toHaveTextContent('Login to your account')
  // expect(container.innerHTML).toHaveTextContent('Login')

  fireEvent.click(getByText(/sign up/i))
  expect(getByTestId('signup-page')).toHaveTextContent('Sign Up')
})

it('landing on a bad page shows 404 page', () => {
  const history = createMemoryHistory()
  history.push('/some/bad/route')

  const { getByTestId, getByRole } = render(
    <Router history={history}>
      <App />
    </Router>
  )

  expect(getByTestId('not-found')).toHaveTextContent('404 Not Found')
  expect(getByRole('heading')).toHaveTextContent('404 Not Found')
})

it.skip('rendering a component that uses withRouter', () => {
  const history = createMemoryHistory()
  const route = '/some-route'
  history.push(route)

  const { getByTestId } = render(
    <Router history={history}>
      <div />
    </Router>
  )

  expect(getByTestId('location-display')).toHaveTextContent(route)
})
