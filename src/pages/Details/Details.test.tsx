import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Details from './Details';

describe('<Details />', () => {
  test('it should mount', () => {
    render(<Details />);
    
    const details = screen.getByTestId('Details');

    expect(details).toBeInTheDocument();
  });
});