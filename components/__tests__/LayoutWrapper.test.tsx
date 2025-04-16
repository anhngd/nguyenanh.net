import React from 'react'
import { render, screen } from '@testing-library/react'
import LayoutWrapper from '../LayoutWrapper'

// Mock the Header component
jest.mock('../Header', () => {
  return function MockHeader() {
    return <div data-testid="mock-header">Header</div>
  }
})

// Mock the Footer component
jest.mock('../Footer', () => {
  return function MockFooter() {
    return <div data-testid="mock-footer">Footer</div>
  }
})

describe('LayoutWrapper', () => {
  it('renders children correctly', () => {
    render(
      <LayoutWrapper>
        <div>Test Content</div>
      </LayoutWrapper>
    )
    expect(screen.getByText('Test Content')).toBeInTheDocument()
    expect(screen.getByTestId('mock-header')).toBeInTheDocument()
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument()
  })
}) 