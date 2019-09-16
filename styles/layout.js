import styled from 'styled-components';

export const PageLayoutWrapper = styled.div`
  padding: 0.8rem;
  display: grid;
  width: 100vw;
  height: 100vh;
  grid-template-areas:
    'head'
    'main'
    'footer';
  grid-template-rows: minmax(6rem, auto) 1fr 1fr;
  grid-template-columns: 3fr;
`;

export const HeaderLayoutWrapper = styled.header`
  grid-row: head;
  grid-column: head;
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
