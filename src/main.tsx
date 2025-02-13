import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TonConnectUIProvider } from '@tonconnect/ui-react';

let manifestURL = "https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json";

createRoot(document.getElementById('root') as HTMLElement).render(
  <TonConnectUIProvider manifestUrl={manifestURL}>
    <App />
  </TonConnectUIProvider>,
)
