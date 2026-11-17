
import './App.css';
import { Search, ShoppingCart, LogIn } from 'lucide-react';


import NFTCard from './components/NFTCard';
import BlogCard from './components/BlogCard';
import Footer from './components/Footer';

import NFTDetails from './pages/NFTDetails';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import OrderConfirmation from './pages/OrderConfirmation';

import { useState } from 'react';
import LoginModal from './components/LoginModal';


const nfts = [
  { id: 1, name: 'Emerald Ape #042', price: '1.19', image: '/images/monkey-green.png' },
  { id: 2, name: 'Sage Nomad #009', price: '1.69', image: '/images/monkey-purple.png' },
  { id: 3, name: 'Neon Vessel #552', price: '1.99', oldPrice: '2.29', image: '/images/monkey-gold.png' },
  { id: 4, name: 'Cosmic Bloom #118', price: '1.29', image: '/images/monkey-purple.png' },
  { id: 5, name: 'Violet Nomad #314', price: '1.39', image: '/images/monkey-purple.png' },
  { id: 6, name: 'Ivory Baron #088', price: '1.79', image: '/images/monkey-green.png' },
  { id: 7, name: 'Golden Beat #207', price: '0.99', image: '/images/monkey-gold.png' },
  { id: 8, name: 'Golden Signal #160', price: '0.39', image: '/images/monkey-gold.png' },
  { id: 9, name: 'Golden Echo #231', price: '0.59', image: '/images/monkey-gold.png' },
];


const articles = [
  {
    id: 1,
    image: '/images/monkey-gold.png',
    date: '12 de setembro',
    readingTime: 6,
    title: 'Como funciona a propriedade de NFTs',
    description: 'Aprenda a colecionar, negociar e verificar ativos digitais.'
  },
  {
    id: 2,
    image: '/images/monkey-green.png',
    date: '13 de setembro',
    readingTime: 2,
    title: '10 artistas digitais para acompanhar',
    description: 'Conheça criadores que moldam a cultura digital.'
  },
  {
    id: 3,
    image: '/images/monkey-purple.png',
    date: '15 de setembro',
    readingTime: 3,
    title: 'Raridade, atributos e procedência',
    description: 'Entenda raridade, procedência, direitos autorais e utilidade.'
  },
  {
    id: 4,
    image: '/images/monkey-gold.png',
    date: '15 de setembro',
    readingTime: 2,
    title: 'Como proteger sua carteira',
    description: 'Proteja sua carteira, seus ativos e sua identidade.'
  }
];


function App() {
  const [loginOpen, setLoginOpen] = useState(false);

  const mostrarConfirmacao = false;
  const mostrarPagamento = false;
  const mostrarCarrinho = false;
  const mostrarDetalhes = false;

  if (mostrarConfirmacao) return <OrderConfirmation />;
  if (mostrarPagamento) return <Payment />;
  if (mostrarCarrinho) return <Cart />;
  if (mostrarDetalhes) return <NFTDetails />;

  return (
    <div className="app">
      <header className="header">
        <a href="#inicio" className="logo">
          KURIO
        </a>

        <nav className="nav">
          <a href="#inicio" className="active">Início</a>
          <a href="#mercado">Mercado</a>
          <a href="#criadores">Criadores</a>
          <a href="#aprenda">Aprenda</a>
        </nav>


        <div className="header-actions">
          <button
            className="search-button"
            aria-label="Pesquisar"
            type="button"
          >
            <Search size={22} strokeWidth={1.8} />
          </button>

          <button
            className="cart-button"
            aria-label="Carrinho com 6 itens"
            type="button"
          >
            <ShoppingCart size={23} strokeWidth={1.8} />

            <span className="cart-count">6</span>
          </button>

          <button
            className="login-button"
            type="button"
            onClick={() => setLoginOpen(true)}
          >
            <LogIn size={19} strokeWidth={1.8} />
            <span>Entrar</span>
          </button>
        </div>

      </header>

      <main id="inicio">
        <section className="hero">
          <div className="hero-content">
            <span className="hero-label">
              Bem-vindo à Kurio
            </span>

            <h1>
              SEJA DONO DO FUTURO
              <br />
              DA ARTE DIGITAL
            </h1>

            <p>
              Descubra NFTs selecionados de criadores
              emergentes e consagrados. Colecione arte
              digital rara, apoie artistas e tenha um
              parte da cultura da internet.
            </p>

            <a href="#mercado" className="hero-button">
              EXPLORAR
            </a>

            <div className="hero-dots">
              <span className="active"></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div className="hero-image">
            <img
              src="images/monkey-green.png"
              alt="NFT de macaco com jaqueta verde"
              className="hero-monkey"
            />
          </div>
        </section>

        <section className="marketplace" id="mercado">
          <div className="sidebar-column">
            <aside className="marketplace-sidebar">
              <h3>Coleções</h3>

              <ul className="category-list">
                <li>Arte digital <span>(33)</span></li>
                <li>Fotografia <span>(12)</span></li>
                <li>Música <span>(65)</span></li>
                <li>Arte 3D <span>(39)</span></li>
                <li>Colecionáveis <span>(23)</span></li>
                <li>Generativa <span>(17)</span></li>
                <li>Jogos <span>(19)</span></li>
                <li>Assinaturas <span>(13)</span></li>
                <li>Utilidade <span>(18)</span></li>
              </ul>

              <h3>Faixa de preço</h3>
              <input type="range" min="0" max="12" step="0.1" />
              <p>Preço: 0,02 - 12,30 ETH</p>
              <button className="filter-button">Aplicar</button>

              <h3>Rede</h3>
              <ul className="category-list">
                <li>Ethereum <span>(119)</span></li>
                <li>Polygon <span>(78)</span></li>
                <li>Solana <span>(86)</span></li>
              </ul>
            </aside>

            <div className="featured-nft">
              <h3>NFT EM DESTAQUE</h3>
              <h4>OFERTA LIMITADA</h4>

              <img
                src="/images/monkey-purple.png"
                alt="NFT em destaque"
              />
            </div>
          </div>



          <div className="marketplace-content">
            <div className="marketplace-header">
              <div className="marketplace-tabs">
                <button className="selected">Todos os NFTs</button>
                <button>Novos lançamentos</button>
                <button>Em alta</button>
              </div>

              <span>Ordenar por: Listados recentemente</span>
            </div>

            <div className="nft-grid">
              {nfts.map((nft) => (
                <NFTCard key={nft.id} {...nft} />
              ))}
            </div>

            <div className="pagination">
              <button className="selected">1</button>
              <button>2</button>
              <button>3</button>
              <button>4</button>
              <button>›</button>
            </div>
          </div>
        </section>

        <section className="promo-section">
          <div className="promo-card">
            <img
              src="/images/monkey-green.png"
              alt="Lançamentos exclusivos"
            />

            <div className="promo-content">
              <h3>
                Lançamentos gênesis
                <br />
                de edição limitada
              </h3>

              <p>
                Colecione edições escassas diretamente dos
                criadores antes da revelação pública.
              </p>

              <a href="#mercado" className="promo-button">
                Explorar →
              </a>
            </div>
          </div>

          <div className="promo-card">
            <img
              src="/images/monkey-gold.png"
              alt="Arte digital selecionada"
            />

            <div className="promo-content">
              <h3>
                Arte digital selecionada
                <br />
                e muito mais
              </h3>

              <p>
                Explore novos artistas, coleções verificadas
                e obras digitais que definem a cultura.
              </p>

              <a href="#mercado" className="promo-button">
                Explorar →
              </a>
            </div>
          </div>
        </section>

        <section className="blog-section" id="aprenda">
          <div className="blog-heading">
            <h2>Diário da Cunhagem</h2>
            <p>
              Histórias, guias e insights para colecionadores sobre
              o universo da propriedade digital.
            </p>
          </div>

          <div className="blog-grid">
            {articles.map((article) => (
              <BlogCard key={article.id} {...article} />
            ))}
          </div>
        </section>

      </main>
      <Footer />

      {loginOpen && (
        <LoginModal onClose={() => setLoginOpen(false)} />
      )}
    </div>
  );
}

export default App;
