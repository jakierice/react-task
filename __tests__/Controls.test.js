import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import { Controls } from '../components';

// mute console warnings caused by recharts library
// using soon to be deprecated React methods
const originalWarning = console.warn;
beforeAll(() => {
  console.warn = jest.fn();
});

afterAll(() => {
  console.warn = originalWarning;
});

test('should update threshold value on user input', () => {
  const mockSetThresholdFunc = jest.fn();
  const { getByLabelText } = render(
    <Controls setRandomNumberAlertThreshold={mockSetThresholdFunc} />,
  );

  const thresholdRangeInput = getByLabelText('Alert threshold:', {
    exact: false,
  });

  fireEvent.change(thresholdRangeInput, { target: { value: 80 } });

  const thresholdValue = thresholdRangeInput.value;

  expect(mockSetThresholdFunc).toHaveBeenCalledTimes(1);
  expect(thresholdValue).toBe('80');
});

test('should update snapshot value on user input', () => {
  const mockSetSnapshotFunc = jest.fn();
  const { getByLabelText } = render(
    <Controls setSnapshotSize={mockSetSnapshotFunc} />,
  );

  const snapshotRangeInput = getByLabelText('Snapshot size:', {
    exact: false,
  });

  fireEvent.change(snapshotRangeInput, { target: { value: 13 } });

  const snapshotValue = snapshotRangeInput.value;

  expect(mockSetSnapshotFunc).toHaveBeenCalledTimes(1);
  expect(snapshotValue).toBe('13');
});
