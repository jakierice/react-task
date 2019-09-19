import styled from 'styled-components';

export const PageTitle = styled.h1`
  color: ${({ theme }) => theme.white};
  font-size: 1.8rem;
  margin: 0;
`;

export const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.white};
`;

export const StrongText = styled.strong`
  color: ${({ theme }) => theme.white};
  font-weight: normal;
  font-size: 1.4rem;
`;

export const SmallText = styled.small`
  color: ${({ theme }) => theme.white};
`;

export const CapitalText = styled.span`
  text-transform: uppercase;
`;
