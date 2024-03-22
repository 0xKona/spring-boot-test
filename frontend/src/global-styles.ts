import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        font-family: "Anek Gurmukhi", sans-serif;
        font-optical-sizing: auto;
    }
    body {
        background-color: white;
        height: 100vh;
        overflow-x: hidden;
        margin: 0; 
        padding: 0
    };
    h1 { margin: 0; padding-top: 7px;}
`;