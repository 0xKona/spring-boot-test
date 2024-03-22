import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        font-family: "Anek Gurmukhi", sans-serif;
        font-optical-sizing: auto;
        margin: 0;
        padding: 0;
    }
    body {
        background-color: #121212;
        height: 100vh;
        overflow-x: hidden;
        margin: 0; 
        padding: 0
    };
`;