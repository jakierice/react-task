import styled from 'styled-components';
import {  Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';

export const FullScreenModal = styled(Dialog)`
  margin: 0;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.darkGray};
`;
