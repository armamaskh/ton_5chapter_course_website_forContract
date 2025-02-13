import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TonConnectUIProvider } from '@tonconnect/ui-react';

let manifestURL = "https://armamaskh.github.io/ton_5chapter_course_website_forContract/tonconnect-manifest.json";

createRoot(document.getElementById('root') as HTMLElement).render(
  <TonConnectUIProvider manifestUrl={manifestURL}>
    <App />
  </TonConnectUIProvider>,
)
