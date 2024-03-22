import { css } from 'styled-components';

export const hoverBorderAnimation = css`
  --cursorX: 50%;
  --cursorY: 50%;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: radial-gradient(circle at var(--cursorX) var(--cursorY), rgba(255,0,0,0.5), rgba(0,255,0,0.5), rgba(0,0,255,0.5));
    background-size: 200% 200%;
    z-index: -1;
    transition: opacity 0.3s, transform 0.3s;
    opacity: 0;
    transform: scale(1.1);
  }
  &:hover:before {
    opacity: 1;
    transform: scale(1);
  }
`;
