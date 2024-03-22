import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StyleSheetManager shouldForwardProp={(validName) => isPropValid(validName)}></StyleSheetManager>
    <App />
  </React.StrictMode>,
)
