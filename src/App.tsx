import { useQuery } from '@tanstack/react-query';
import { fetchCatalog } from './api/client';

import './App.css';
import { Search, ShoppingCart, LogIn } from 'lucide-react';


import NFTCard from './components/NFTCard';
import BlogCard from './components/BlogCard';
import Footer from './components/Footer';


import { useMemo, useState } from 'react';
import LoginModal from './components/LoginModal';
import { useAuth } from './state/AuthContext';


import { useNavigate } from '@tanstack/react-router';


import { nfts } from './data/nfts';
import { useCart } from './state/CartContext';

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
  const [loginOpen, setLoginOpen] = useState(() => sessionStorage.getItem('kurio-login-required') === '1');
  const { user, logout } = useAuth();
  if (sessionStorage.getItem('kurio-login-required') === '1') sessionStorage.removeItem('kurio-login-required');
  const navigate = useNavigate();
  const { items } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [network, setNetwork] = useState('');
  const [priceLimit, setPriceLimit] = useState(12.3);
  const [appliedPrice, setAppliedPrice] = useState(12.3);
  const [tab, setTab] = useState('Todos os NFTs');
  const [page, setPage] = useState(1);
  const [heroIndex, setHeroIndex] = useState(0);
  const heroSlides = [
    {title: 'SEJA DONO DO FUTURO', second: 'DA ARTE DIGITAL', image:'/images/monkey-green.png', label:'Bem-vindo à Kurio'},
    {title: 'DESCUBRA NOVOS', second: 'CRIADORES DIGITAIS', image:'/images/monkey-purple.png', label:'Coleções exclusivas'},
    {title: 'COLECIONE ARTE', second: 'QUE FAZ HISTÓRIA', image:'/images/monkey-gold.png', label:'Explore o mercado'},
  ];
  const catalogFilters = { search, category, network, maxPrice: appliedPrice, sort: tab === 'Novos lançamentos' ? 'new' : tab === 'Em alta' ? 'popular' : 'all' };
  const catalogQuery = useQuery({ queryKey: ['catalog', catalogFilters], queryFn: () => fetchCatalog(catalogFilters) });
  // Keep the demo browsable if the local mock worker was not initialized yet.
  const visibleNFTs = useMemo(() => {
    const filtered = nfts.filter(nft => (!search || `${nft.name} ${nft.creator}`.toLowerCase().includes(search.toLowerCase())) && (!category || nft.category === category) && (!network || nft.network === network) && Number(nft.price) <= appliedPrice);
    if (tab === 'Novos lançamentos') filtered.sort((a,b) => b.created-a.created);
    if (tab === 'Em alta') filtered.sort((a,b) => b.popularity-a.popularity);
    return catalogQuery.data ?? filtered;
  }, [catalogQuery.data, search, category, network, appliedPrice, tab]);
  const pageCount = Math.max(1, Math.ceil(visibleNFTs.length/9));
  const currentPage = Math.min(page,pageCount);
  const pageNFTs = visibleNFTs.slice((currentPage-1)*9,currentPage*9);
  const chooseCategory = (value:string) => { setCategory(old => old === value ? '' : value); setPage(1); };
  const chooseNetwork = (value:string) => { setNetwork(old => old === value ? '' : value); setPage(1); };


  return (
    <div className="app">
      <header className="header">
        <a href="#inicio" className="logo">
          KURIO
        </a>

        <nav className="nav">
          <a href="#inicio" className="active">Início</a>
          <a href="#mercado">Mercado</a>
          <a href="#mercado" onClick={() => { setTab("Todos os NFTs"); setPage(1); }}>Criadores</a>
          <a href="#aprenda">Aprenda</a>
        </nav>


        <div className="header-actions">
          <button
            className="search-button"
            aria-label="Pesquisar"
            type="button"
            onClick={() => setSearchOpen(open => !open)}
          >
            <Search size={22} strokeWidth={1.8} />
          </button>

          <button
            className="cart-button"
            aria-label="Abrir carrinho"
            type="button"
            onClick={() => navigate({ to: '/carrinho' })}
          >
            <ShoppingCart size={23} strokeWidth={1.8} />

            <span className="cart-count">{items.reduce((sum,item)=>sum+item.quantity,0)}</span>
          </button>

          <button
            className="login-button"
            type="button"
            onClick={() => user ? navigate({ to: '/perfil' }) : setLoginOpen(true)}
          >
            <LogIn size={19} strokeWidth={1.8} />
            <span>{user ? user.name : 'Entrar'}</span>
          </button>
        </div>
        {user && <button type="button" className="kurio-logout" onClick={logout}>Sair</button>}
        {searchOpen && <div className="kurio-search"><input autoFocus aria-label="Pesquisar NFTs" placeholder="Pesquisar NFT ou criador..." value={search} onChange={e => {setSearch(e.target.value);setPage(1);}} /><button type="button" onClick={() => {setSearch('');setSearchOpen(false);setPage(1);}}>Limpar ✕</button></div>}
      </header>

      <main id="inicio">
        <section className="hero">
          <div className="hero-content">
            <span className="hero-label">
              {heroSlides[heroIndex].label}
            </span>

            <h1>
              {heroSlides[heroIndex].title}
              <br />
              {heroSlides[heroIndex].second}
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
              {heroSlides.map((slide,index) => <button type="button" key={slide.title} aria-label={`Destaque ${index+1}`} className={heroIndex === index ? 'active' : ''} onClick={() => setHeroIndex(index)} />)}
            </div>
          </div>

          <div className="hero-image">
            <img
              src={heroSlides[heroIndex].image}
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
                {['Arte digital','Fotografia','Música','Arte 3D','Colecionáveis','Generativa','Jogos','Assinaturas','Utilidade'].map(value => <li key={value}><button type="button" className={category===value?'kurio-active-filter':''} onClick={() => chooseCategory(value)}>{value} <span>({nfts.filter(n=>n.category===value).length})</span></button></li>)}
              </ul>
              <h3>Faixa de preço</h3>
              <input aria-label="Preço máximo" type="range" min="0.02" max="12.30" step="0.01" value={priceLimit} onChange={e => setPriceLimit(Number(e.target.value))} />
              <p>Preço: 0,02 - {priceLimit.toFixed(2).replace('.',',')} ETH</p>
              <button className="filter-button" onClick={() => {setAppliedPrice(priceLimit);setPage(1);}}>Aplicar</button>
              <h3>Rede</h3>
              <ul className="category-list">
                {['Ethereum','Polygon','Solana'].map(value => <li key={value}><button type="button" className={network===value?'kurio-active-filter':''} onClick={() => chooseNetwork(value)}>{value} <span>({nfts.filter(n=>n.network===value).length})</span></button></li>)}
              </ul>
              {(category || network || appliedPrice < 12.3 || search) && <button className="kurio-clear" onClick={() => {setCategory('');setNetwork('');setPriceLimit(12.3);setAppliedPrice(12.3);setSearch('');setPage(1);}}>Limpar filtros</button>}
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
                {['Todos os NFTs','Novos lançamentos','Em alta'].map(value => <button key={value} className={tab===value?'selected':''} onClick={() => {setTab(value);setPage(1);}}>{value}</button>)}
              </div>

              <span>Ordenar por: Listados recentemente</span>
            </div>

            {catalogQuery.isPending && <p role="status">Carregando catálogo...</p>}
            {catalogQuery.isError && <p role="alert">API simulada indisponível. Exibindo catálogo local. <button type="button" onClick={() => void catalogQuery.refetch()}>Tentar novamente</button></p>}
            <div className="nft-grid">
              {pageNFTs.map((nft) => (
                <NFTCard key={nft.id} {...nft} />
              ))}
            </div>

            {pageNFTs.length === 0 && <p>Nenhum NFT encontrado para estes filtros.</p>}
            <div className="pagination">
              {Array.from({length:pageCount},(_,i)=>i+1).map(number => <button key={number} className={currentPage===number?'selected':''} onClick={() => {setPage(number);document.getElementById('mercado')?.scrollIntoView({behavior:'smooth'});}}>{number}</button>)}
              <button disabled={currentPage===pageCount} onClick={() => {setPage(Math.min(pageCount,currentPage+1));document.getElementById('mercado')?.scrollIntoView({behavior:'smooth'});}}>›</button>
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
