// src/tests/App.test.tsx
import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

// 1) Fake products must match shape ShoppingSection expects
const fakeProducts = [
  {
    id: 1,
    title: 'Alpha',
    price: 10,
    description: 'Test description',
    image: 'alpha.png',
    category: 'electronics',
    rating: { rate: 4.2, count: 100 },
  },
  {
    id: 2,
    title: 'Bravo',
    price: 20,
    description: 'Test description',
    image: 'bravo.png',
    category: 'jewelery',
    rating: { rate: 3.7, count: 50 },
  },
]

beforeAll(() => {
  // 2) Stub global fetch to yield fakeProducts
  vi.stubGlobal('fetch', vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(fakeProducts),
    })
  ))
})

afterAll(() => {
  vi.unstubAllGlobals()
})

// Helper to render <App> inside MemoryRouter
function renderWithRouter(ui: React.ReactElement, { route = '/' } = {}) {
  window.history.pushState({}, 'Test page', route)
  return render(
    <MemoryRouter initialEntries={[route]}>
      {ui}
    </MemoryRouter>
  )
}

describe('App component', () => {
  it('shows loading then renders products', async () => {
    renderWithRouter(<App />)

    // loading indicator appears
    expect(screen.getByText(/loading/i)).toBeInTheDocument()

    // then our fake titles show up
    await waitFor(() => {
      expect(screen.getByText('Alpha')).toBeInTheDocument()
      expect(screen.getByText('Bravo')).toBeInTheDocument()
    })
  })

  it('updates the cart badge when items are added', async () => {
    renderWithRouter(<App />)

    // wait for products to load
    await waitFor(() => screen.getByText('Alpha'))

    // click the first "Add to cart" button
    const addButtons = screen.getAllByRole('button', { name: /add to cart/i })
    await userEvent.click(addButtons[0])

    // simply assert that a "1" appears somewhere (the badge)
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('renders the About page on /about', () => {
    renderWithRouter(<App />, { route: '/about' })
    expect(
      screen.getByRole('heading', { name: /about/i })
    ).toBeInTheDocument()
  })
})
