import React, { useRef, ReactNode } from 'react';
import styled from 'styled-components';
import { hoverBorderAnimation } from '../styles/card-effects'; // Adjust the path as needed

const StyledContainer = styled.div`
    width: 400px;
    height: 100px;
    display: flex;
    margin-bottom: 10px;
    transition: all .15s ease-in-out;
    background-color: whitesmoke;
    &:hover{
         transform: scale(1.05);
    }
    ${hoverBorderAnimation}
`;

interface ContainerProps {
  children?: ReactNode; // Define a type for children prop
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      containerRef.current.style.setProperty('--cursorX', `${x}%`);
      containerRef.current.style.setProperty('--cursorY', `${y}%`);
    }
  };

  return (
    <StyledContainer ref={containerRef} onMouseMove={handleMouseMove}>
      {children}
    </StyledContainer>
  );
};

export default Container;


