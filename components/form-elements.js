import styled from 'styled-components';

export const FormRowWrapper = styled.div`
  margin: 0.6rem 0;
`;

export const FormLabel = styled.label`
  color: ${({ theme }) => theme.white};
  margin-top: 0.6rem;
`;

export const RangeSlider = styled.input.attrs({
  type: 'range',
})`
  width: 100%;

  -webkit-appearance: none;
  height: 0.8rem;
  background-color: ${({ theme }) => theme.lightGray};
  outline: none;
  padding: 0;
  margin: 1.2rem 0;

  &:focus {
    background-color: ${({ theme }) => theme.white};
  }

  // Range Handle
  &::-webkit-slider-thumb {
    appearance: none;
    width: 1rem;
    height: 2rem;
    background: ${({ theme }) => theme.red};
    cursor: pointer;
    transition: background 0.15s ease-in-out;

    &:hover {
      background: ${({ theme }) => theme.yellow};
    }
  }

  &:active::-webkit-slider-thumb {
    background: ${({ theme }) => theme.yellow};
  }

  &::-moz-range-thumb {
    width: 1rem;
    height: 2rem;
    border: 0;
    border-radius: 50%;
    background: ${({ theme }) => theme.pink};
    cursor: pointer;
    transition: background 0.15s ease-in-out;

    &:hover {
      background: ${({ theme }) => theme.yellow};
    }
  }

  &:active::-moz-range-thumb {
    background: ${({ theme }) => theme.yellow};
  }
`;
