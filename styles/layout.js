import styled from 'styled-components';

export const PageLayoutWrapper = styled.div`
  display: grid;
  width: auto;
  height: 100vh;
  grid-template-areas:
    'header'
    'main'
    'footer';
  grid-template-rows: minmax(4rem, auto) 1fr 1fr;
  grid-template-columns: 3fr;
`;

export const HeaderLayoutWrapper = styled.header`
  grid-row: header;
  grid-column: header;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.4rem;
`;

export const MainContentLayoutWrapper = styled.main`
  display: grid;
  grid-row: main;
  grid-column: main;
  grid-template-areas:
    'charts charts controls'
    'charts charts meta'
    'charts charts meta';
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);

  @media screen and (max-width: 768px) {
    grid-template-areas:
      'charts'
      'charts'
      'meta';
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: 1fr;
  }
`;

export const ChartsLayoutWrapper = styled.section`
  grid-area: charts;
  padding: 1.2rem;
`;

export const ControlsLayoutWrapper = styled.section`
  grid-area: controls;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const MetaInfoLayoutWrapper = styled.section`
  grid-area: meta;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const ShowOnDesktopOnly = styled.div`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const ShowOnMobileOnly = styled.div`
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export const HorizontalRule = styled.hr`
  width: 100%;
  border: 0;
  height: 0;
  border-top: 1px solid ${({ theme }) => theme.gray};
  border-bottom: 1px solid ${({ theme }) => theme.gray};
`;

export const PositionFixed = styled.div`
  top: ${props => props.top}px;
  right: ${props => props.right}px;
  bottom: ${props => props.bottom}px;
  left: ${props => props.left}px;
  height: auto;
  width: auto;
  position: fixed;
`;
