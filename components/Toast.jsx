import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { X } from 'react-feather';
import { useTransition } from 'react-spring';
import { animated } from 'react-spring';
import Alert from '@reach/alert';

export const Container = styled.div`
  position: fixed;
  z-index: 1000;
  width: auto;
  top: ${props => (props.top ? '30px' : 'unset')};
  bottom: ${props => (props.top ? 'unset' : '30px')};
  margin: 0 auto;
  left: 30px;
  right: 30px;
  display: flex;
  flex-direction: ${props => (props.top ? 'column-reverse' : 'column')};
  pointer-events: none;
  align-items: ${props =>
    props.position === 'center' ? 'center' : `flex-${props.position || 'end'}`};
  @media (max-width: 680px) {
    align-items: center;
  }
`;

export const ToastMessageWrapper = styled(Alert)`
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  width: 40ch;
  @media (max-width: 680px) {
    width: 100%;
  }
`;

const AnimatedToastWrapper = animated(ToastMessageWrapper);

export const Content = styled.div`
  color: ${({ theme }) => theme.white};
  background: ${({ theme }) => theme.gray};
  opacity: 0.9;
  padding: 1.2rem 1.8rem;
  font-size: 1rem;
  display: grid;
  grid-template-columns: ${props =>
    props.canClose === false ? '1fr' : '1fr auto'};
  grid-gap: 10px;
  overflow: hidden;
  height: auto;
  border-radius: 3px;
  margin-top: ${props => (props.top ? '0' : '10px')};
  margin-bottom: ${props => (props.top ? '10px' : '0')};
`;

export const CloseButton = styled.div`
  cursor: pointer;
  pointer-events: all;
  outline: 0;
  border: none;
  background: transparent;
  display: flex;
  align-self: flex-end;
  overflow: hidden;
  margin: 0;
  padding: 0;
  padding-bottom: 14px;
  color: rgba(255, 255, 255, 0.5);
  :hover {
    color: rgba(255, 255, 255, 0.6);
  }
`;

export const Life = styled(animated.div)`
  position: absolute;
  bottom: ${props => (props.top ? '10px' : '0')};
  left: 0px;
  width: auto;
  background-image: ${({ theme }) =>
    `linear-gradient(130deg, ${theme.pink}, ${theme.red})`};
  height: 5px;
`;

let id = 0;

function ToastList({
  config = { tension: 125, friction: 20, precision: 0.1 },
  timeout = 3000,
  children,
}) {
  const [refMap] = useState(() => new WeakMap());
  const [cancelMap] = useState(() => new WeakMap());
  const [items, setItems] = useState([]);
  const transitions = useTransition(items, item => item.key, {
    from: { opacity: 0, height: 0, life: '100%' },
    enter: item => async next =>
      await next({ opacity: 1, height: refMap.get(item).offsetHeight }),
    leave: item => async (next, cancel) => {
      cancelMap.set(item, cancel);
      await next({ life: '0%' });
      await next({ opacity: 0 });
      await next({ height: 0 });
    },
    onRest: item => setItems(state => state.filter(i => i.key !== item.key)),
    config: (item, state) =>
      state === 'leave' ? [{ duration: timeout }, config, config] : config,
  });

  useEffect(
    () =>
      void children(msg => setItems(state => [...state, { key: id++, msg }])),
    [],
  );
  return (
    <Container>
      {transitions.map(({ key, item, props: { life, ...style } }) => (
        <AnimatedToastWrapper key={key} style={style}>
          <Content ref={ref => ref && refMap.set(item, ref)}>
            <Life style={{ right: life }} />
            <p>{item.msg}</p>
            <CloseButton
              onClick={e => {
                e.stopPropagation();
                cancelMap.has(item) && cancelMap.get(item)();
              }}
            >
              <X size={18} />
            </CloseButton>
          </Content>
        </AnimatedToastWrapper>
      ))}
    </Container>
  );
}

ToastList.propTypes = {
  config: PropTypes.shape({
    tension: PropTypes.number,
    friction: PropTypes.number,
    precision: PropTypes.number,
  }),
  timeout: PropTypes.number,
  children: PropTypes.func,
};

export default ToastList;