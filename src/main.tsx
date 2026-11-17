
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

import App from './App';
import NFTDetails from './pages/NFTDetails';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import OrderConfirmation from './pages/OrderConfirmation';
import CollectorProfile from './pages/CollectorProfile';
import Wallets from './pages/Wallets';

import './index.css';
import { CartProvider } from './state/CartContext';

const rootRoute = createRootRoute();

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: App,
});

const nftRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/nft/$id',
  component: NFTDetails,
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/carrinho',
  component: Cart,
});

const paymentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/pagamento',
  component: Payment,
});

const confirmationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/confirmacao',
  component: OrderConfirmation,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/perfil',
  component: CollectorProfile,
});

const walletsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/carteiras',
  component: Wallets,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  nftRoute,
  cartRoute,
  paymentRoute,
  confirmationRoute,
  profileRoute,
  walletsRoute,
]);

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Elemento root não encontrado!');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <CartProvider><RouterProvider router={router} /></CartProvider>
  </React.StrictMode>
);
