/// <reference types="vite/client" />

declare module '*.png' {
  const source: string;
  export default source;
}

declare module '*.webp' {
  const source: string;
  export default source;
}
