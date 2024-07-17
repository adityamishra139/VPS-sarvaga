import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChakraProvider } from '@chakra-ui/react'
ReactDOM.createRoot(document.getElementById("root")).render(
    <Auth0Provider
      domain="dev-nb6bi8m2ahz5lp8n.us.auth0.com"
      clientId="ysxZxkDnmMERVxegyEsONFg7SOwRARqW"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <ChakraProvider>
      <App />
      </ChakraProvider>
    </Auth0Provider>
);
