
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useCart } from '../state/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';
import NFTCard from '../components/NFTCard';
import Footer from '../components/Footer';
import './Cart.css';

const relatedNFTs = [
  { id: 1, name: 'Cosmic Bloom #118', price: '1.29', image: '/images/monkey-purple.png' },
  { id: 2, name: 'Violet Nomad #314', price: '1.39', image: '/images/monkey-purple.png' },
  { id: 3, name: 'Ivory Baron #088', price: '1.79', image: '/images/monkey-gold.png' },
  { id: 4, name: 'Golden Beat #207', price: '0.99', image: '/images/monkey-gold.png' },
  { id: 5, name: 'Golden Signal #160', price: '0.39', image: '/images/monkey-gold.png' },
];

const formatETH = (value: number) => `${value.toFixed(2)} ETH`;

export default function Cart() {
  const navigate = useNavigate();
  const { items, subtotal, discount, networkFee, total, updateQuantity, removeItem, applyCoupon } = useCart();
  const [coupon, setCoupon] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  function handleCoupon() { setCouponMessage(applyCoupon(coupon) ? 'Cupom aplicado: 10% de desconto!' : 'Cupom inválido. Experimente KURIO10.'); }

  return (
    <div className="cart-page">
      <main className="cart-container">
        <div className="cart-breadcrumb">Início / Mercado / Carrinho</div>

        <div className="cart-layout">
          <section className="cart-products">
            <div className="cart-table-heading">
              <span>NFTs</span>
              <span>Preço</span>
              <span>Edições</span>
              <span>Total</span>
              <span></span>
            </div>

            {items.length === 0 ? (
              <div className="cart-empty">
                Seu carrinho está vazio.
              </div>
            ) : (
              items.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-product">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <h3>{item.name}</h3>
                      <p>ID do token: {item.token}</p>
                    </div>
                  </div>

                  <span className="cart-unit-price">
                    {formatETH(item.price)}
                  </span>

                  <div className="cart-quantity">
                    <button
                      aria-label={`Diminuir quantidade de ${item.name}`}
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Minus size={13} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      aria-label={`Aumentar quantidade de ${item.name}`}
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus size={13} />
                    </button>
                  </div>

                  <strong className="cart-item-total">
                    {formatETH(item.price * item.quantity)}
                  </strong>

                  <button
                    className="cart-remove"
                    aria-label={`Remover ${item.name}`}
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              ))
            )}
          </section>

          <aside className="cart-summary">
            <h2>Resumo da carteira</h2>

            <label htmlFor="cart-coupon">Código promocional</label>
            <div className="cart-coupon">
              <input
                id="cart-coupon"
                type="text"
                value={coupon}
                onChange={(event) => setCoupon(event.target.value)}
                placeholder="Digite o código promocional..."
              />
              <button onClick={handleCoupon}>Aplicar</button>
            </div>

            {couponMessage && (
              <p className="cart-coupon-message">{couponMessage}</p>
            )}

            <div className="cart-summary-lines">
              <div>
                <span>Subtotal</span>
                <span>{formatETH(subtotal)}</span>
              </div>
              <div>
                <span>Desconto de lançamento</span>
                <span>-{formatETH(discount)}</span>
              </div>
              <div>
                <span>Taxa de rede</span>
                <span>{formatETH(networkFee)}</span>
              </div>
              <small>Taxa estimada</small>
            </div>

            <div className="cart-grand-total">
              <strong>Total</strong>
              <strong>{formatETH(total)}</strong>
            </div>

            <button
              className="cart-checkout"
              disabled={items.length === 0}
              onClick={() => navigate({ to: "/pagamento" })}
            >
              Conectar e finalizar
            </button>

            <a className="cart-continue" href="/">
              Continuar explorando
            </a>
          </aside>
        </div>

        <section className="cart-related">
          <h2>Colecionadores também viram</h2>

          <div className="cart-related-grid">
            {relatedNFTs.map((nft) => (
              <NFTCard key={nft.id} {...nft} />
            ))}
          </div>

          <div className="cart-related-dots">● ○ ○</div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
