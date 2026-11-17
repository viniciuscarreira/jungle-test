
import { useState } from 'react';
import { Heart, Minus, Plus, Star, ZoomIn } from 'lucide-react';
import NFTCard from '../components/NFTCard';
import Footer from '../components/Footer';
import './NFTDetails.css';
import { useNavigate, useParams } from '@tanstack/react-router';
import { getNFT, nfts } from '../data/nfts';
import { useCart } from '../state/CartContext';

const galleryImages = [
  '/images/monkey-green.png',
  '/images/monkey-purple.png',
  '/images/monkey-gold.png',
  '/images/monkey-green.png',
];

export default function NFTDetails() {
  const navigate = useNavigate();
  const { id } = useParams({ from: "/nft/$id" });
  const nft = getNFT(id);
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [favorite, setFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');
  const [relatedPage, setRelatedPage] = useState(0);

  if (!nft) return <div className="details-page" style={{padding: 48}}><h1>NFT não encontrado</h1><button onClick={() => navigate({to:"/"})}>Voltar ao mercado</button></div>;
  return (
    <div className="details-page">
      <main className="details-container">
        <div className="details-breadcrumb">Início / Mercado</div>

        <section className="details-product">
          <div className="details-gallery">
            <div className="details-thumbnails">
              {[nft.image, ...galleryImages.filter(image => image !== nft.image)].map((image, index) => (
                <button
                  key={index}
                  className={`details-thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`Visualização ${index + 1}`} />
                </button>
              ))}
            </div>

            <div className="details-main-image">
              <img src={[nft.image, ...galleryImages.filter(image => image !== nft.image)][selectedImage % (1 + galleryImages.filter(image => image !== nft.image).length)]} alt={nft.name} />
              <ZoomIn className="details-zoom" size={20} />
            </div>
          </div>

          <div className="details-info">
            <h1>{nft.name}</h1>
            <strong className="details-price">{nft.price} ETH</strong>

            <div className="details-rating">
              <span>★★★★★</span>
              <small>4.9 | 19 avaliações de colecionadores</small>
            </div>

            <h3>Sobre este NFT:</h3>
            <p>
              Um colecionável digital finalizado à mão da coleção Kurio Editions,
              verificado na Ethereum, com arte desbloqueável e acesso para
              colecionadores.
            </p>

            <p className="details-edition">
              Edição:<br />
              {nft.name.match(/#(\d+)/)?.[1]} / 1000 <span className="details-verified">VERIFICADO</span>
            </p>

            <div className="details-actions">
              <div className="details-quantity">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus size={15} />
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>
                  <Plus size={15} />
                </button>
              </div>

              <button className="details-buy" onClick={() => { addItem({ id: nft.id, name: nft.name, token: nft.name.match(/#\d+/)?.[0] ?? String(nft.id), price: Number(nft.price), quantity, image: nft.image }); navigate({ to: "/carrinho" }); }}>COMPRAR</button>

              <button
                className={`details-favorite ${favorite ? 'selected' : ''}`}
                onClick={() => setFavorite(!favorite)}
              >
                <Heart size={15} fill={favorite ? 'currentColor' : 'none'} />
                {favorite ? 'Favoritado' : 'Favoritar'}
              </button>
            </div>

            <div className="details-metadata">
              <p>ID do token: {nft.name.match(/#\d+/)?.[0]}</p>
              <p>Coleção: {nft.category}</p>
              <p>Rede: {nft.network} · Criador: {nft.creator}</p>
            </div>

            <p className="details-share">Compartilhar este NFT: ◉ ◇ ♥</p>
          </div>
        </section>

        <section className="details-description">
          <div className="details-tabs">
            <button
              className={activeTab === 'details' ? 'active' : ''}
              onClick={() => setActiveTab('details')}
            >
              Detalhes do NFT
            </button>
            <button
              className={activeTab === 'reviews' ? 'active' : ''}
              onClick={() => setActiveTab('reviews')}
            >
              Avaliações de colecionadores (19)
            </button>
          </div>

          {activeTab === 'details' ? (
            <div className="details-description-content">
              <p>
                {nft.name} é uma obra digital 1/1 finalizada à mão da
                coleção Kurio Editions. Cada atributo fica armazenado nos
                metadados do token e é verificado na Ethereum.
              </p>
              <p>
                A propriedade inclui a arte em alta resolução, lançamentos
                exclusivos para colecionadores e um registro permanente de
                procedência registrado na rede.
              </p>
              <h4>Rede:</h4>
              <p>Cunhado na Ethereum com procedência imutável e metadados armazenados no IPFS.</p>
              <h4>Contrato:</h4>
              <p>Direitos autorais do criador. NFTs são colecionáveis, não representam participação financeira.</p>
              <h4>Direitos autorais:</h4>
              <p>© 2026 Kurio. Contrato inteligente ERC-721 verificado.</p>
            </div>
          ) : (
            <div className="details-description-content">
              <p><Star size={14} fill="currentColor" /> 4.9 de 5 — 19 avaliações de colecionadores.</p>
              <p>As avaliações dos colecionadores serão exibidas aqui.</p>
            </div>
          )}
        </section>

        <section className="details-related">
          <h2>Mais desta coleção</h2>
          <div className="details-related-grid">
            {nfts.filter(item => item.id !== nft.id).slice(relatedPage*5,relatedPage*5+5).map(item => <NFTCard key={item.id} {...item} />)}
          </div>
          <div className="details-dots">{[0,1,2].map(index => <button key={index} type="button" aria-label={`Mais desta coleção ${index+1}`} onClick={() => setRelatedPage(index)} style={{background:"transparent",border:0,color:relatedPage===index?"#e99b54":"#f5e6d6",cursor:"pointer",fontSize:20}}>{relatedPage===index?"●":"○"}</button>)}</div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
