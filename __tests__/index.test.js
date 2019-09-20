import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import Home from '../pages/index';

// mute console warnings caused by recharts library
// using soon to be deprecated React methods
const originalWarning = console.warn;
beforeAll(() => {
  console.warn = jest.fn();
});

afterAll(() => {
  console.warn = originalWarning;
});

test('index page loads', () => {
  const { getByTestId } = render(<Home />);

  expect(getByTestId('home-root')).toBeInTheDocument();
});
