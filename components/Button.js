import styled from 'styled-components';

export const Button = styled.button`
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  background: none;
  border: 1px solid
    ${({ theme, disabled }) => (disabled ? theme.lightGray : theme.blue)};
  color: ${({ theme, disabled }) => (disabled ? theme.lightGray : theme.blue)};
  margin: 0 0.2rem 0.2rem 0;
  transition: border-color 0.3s ease, color 0.3s ease;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};

  &:hover, &:focus {
    outline: none;
    border: 1px solid
      ${({ theme, disabled }) => (disabled ? theme.lightGray : theme.yellow)};
    color: ${({ theme, disabled }) =>
      disabled ? theme.lightGray : theme.yellow};
  }
`;

export const SecondayButton = styled.button``;
