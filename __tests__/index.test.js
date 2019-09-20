import React from 'react';
import { render } from '@testing-library/react';

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

test('Home component page loads', () => {
  const { getByTestId } = render(<Home />);

  expect(getByTestId('home-root')).toBeInTheDocument();
});

test('should not log more than snapshot value', () => {
  const { getByLabelText, getByTestId } = render(<Home />);

  const snapshotValue = getByLabelText('Snapshot size:', { exact: false })
    .value;
  const logList = getByTestId('log-list');

  expect(logList.childElementCount).toBeLessThan(parseInt(snapshotValue));
});
