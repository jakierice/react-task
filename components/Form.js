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
`;
