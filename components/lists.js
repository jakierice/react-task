import styled from 'styled-components';

export const UnorderedList = styled.ul`
  list-style: none;
  padding: 0;
  color: ${({ theme }) => theme.white};
`;

// would eventually add OrderedList component to this file