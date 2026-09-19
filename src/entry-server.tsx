import {StrictMode} from 'react';
import {renderToString} from 'react-dom/server';
import App from './App.tsx';

// Used at build time by scripts/prerender.mjs to generate the homepage HTML.
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
