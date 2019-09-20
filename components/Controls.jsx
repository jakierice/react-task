import React from 'react';
import PropTypes from 'prop-types';
import { ControlsLayoutWrapper, HorizontalRule } from '../styles/layout';
import { Button } from './buttons';
import { FormLabel, RangeSlider, FormRowWrapper } from './form-elements';

function Controls(props) {
  const {
    closeSocketConnection,
    isSocketConnected,
    openSocketConnection,
    randomNumberAlertThreshold,
    setRandomNumberAlertThreshold,
    setSnapshotSize,
    snapshotSize,
  } = props;

  return (
    <ControlsLayoutWrapper>
      <Button onClick={closeSocketConnection} disabled={!isSocketConnected}>
        Close connection
      </Button>
      <Button onClick={openSocketConnection} disabled={isSocketConnected}>
        Open connection
      </Button>
      <HorizontalRule />
      <FormRowWrapper>
        <FormLabel htmlFor="snapshot-size-slider">
          Snapshot size: {snapshotSize}
          <RangeSlider
            type="range"
            id="snapshot-size-slider"
            name="snapshot-size-slider"
            min="0"
            max="30"
            value={snapshotSize}
            onChange={event => setSnapshotSize(event.target.value)}
          />
        </FormLabel>
      </FormRowWrapper>
      <FormLabel htmlFor="random-number-threshold-slider">
        Alert threshold: {randomNumberAlertThreshold}
        <RangeSlider
          type="range"
          id="random-number-threshold-slider"
          name="random-number-threshold-slider"
          min="0"
          max="100"
          value={randomNumberAlertThreshold}
          onChange={event => setRandomNumberAlertThreshold(event.target.value)}
        />
      </FormLabel>
    </ControlsLayoutWrapper>
  );
}

Controls.propTypes = {
  closeSocketConnection: PropTypes.func,
  isSocketConnected: PropTypes.bool,
  openSocketConnection: PropTypes.func,
  randomNumberAlertThreshold: PropTypes.number,
  setRandomNumberAlertThreshold: PropTypes.func,
  setSnapshotSize: PropTypes.func,
  snapshotSize: PropTypes.number,
};

export default Controls;
