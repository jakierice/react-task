import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import Home from './index';

test('index page loads', () => {
  const { getByText, getByTestId } = render(<Home />);

  // fireEvent.click(getByText('Load Greeting'))

  expect(getByTestId('home-root')).toBeInTheDocument();
});
