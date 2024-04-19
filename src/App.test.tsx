/* eslint-disable prettier/prettier */
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './pages/Admin/Home';
import { LocationDisplay } from './route';

describe('App', () => {
  it('Render hello world', () => {
    // arrange
    render(<Home />);
    // act
    // expect
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Hello World');
  });
  it('rendering a component that uses useLocation', () => {
    render(
      <MemoryRouter initialEntries={['/not-found']}>
        <LocationDisplay />
      </MemoryRouter>
    );
    expect(screen.getByTestId('location-display')).toHaveTextContent(
      '/not-found'
    );
  });
});
