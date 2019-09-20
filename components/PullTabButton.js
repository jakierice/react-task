import styled from 'styled-components';

export const PullTabButton = styled.button`
  border-radius: 50% 0 0 50%;
  padding: 0.6rem;
  background-color: ${({ theme }) => theme.blue};
  border: none;
  height: 3.2rem;
  width: 3.2rem;
  outline: none;

  &:focus, &:active {
    background-color: ${({ theme }) => theme.yellow};
  }
`;
