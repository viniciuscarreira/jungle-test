import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
import { FavoritesProvider } from './state/FavoritesContext';
import { AuthProvider, useAuth } from './state/AuthContext';
import { useEffect, type ReactNode } from 'react';
import { useNavigate } from '@tanstack/react-router';

function PrivatePage({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      sessionStorage.setItem('kurio-login-required', '1');
      void navigate({ to: '/' });
    }
  }, [user, navigate]);
  if (!user) return <p style={{ padding: 32 }}>Faça login para acessar esta página. Redirecionando...</p>;
  return <>{children}</>;
}
const ProtectedProfile = () => <PrivatePage><CollectorProfile /></PrivatePage>;
const ProtectedWallets = () => <PrivatePage><Wallets /></PrivatePage>;

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
  component: ProtectedProfile,
});

const walletsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/carteiras',
  component: ProtectedWallets,
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

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 1, staleTime: 30_000 } } });

function renderApp() {
ReactDOM.createRoot(rootElement!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}><AuthProvider><FavoritesProvider><CartProvider><RouterProvider router={router} /></CartProvider></FavoritesProvider></AuthProvider></QueryClientProvider>
  </React.StrictMode>
);

}
// Start the mock API before React mounts so the first catalog request is intercepted.
// The worker is generated with: npx msw init public --save
async function bootstrap() {
  try {
    const { worker } = await import('./mocks/browser');
    await worker.start({ onUnhandledRequest: 'bypass', quiet: true });
  } catch (error) {
    console.error('Não foi possível iniciar a API simulada:', error);
  }
  renderApp();
}
void bootstrap();
