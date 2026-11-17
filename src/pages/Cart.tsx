
import { useState } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import NFTCard from '../components/NFTCard';
import Footer from '../components/Footer';
import './Cart.css';

type CartItem = {
  id: number;
  name: string;
  token: string;
  price: number;
  quantity: number;
  image: string;
};

const initialItems: CartItem[] = [
  {
    id: 1,
    name: 'Emerald Ape #042',
    token: '#042',
    price: 1.19,
    quantity: 2,
    image: '/images/monkey-green.png',
  },
  {
    id: 2,
    name: 'Violet Nomad #314',
    token: '#314',
    price: 1.39,
    quantity: 6,
    image: '/images/monkey-purple.png',
  },
  {
    id: 3,
    name: 'Ivory Baron #088',
    token: '#088',
    price: 1.79,
    quantity: 9,
    image: '/images/monkey-gold.png',
  },
];

const relatedNFTs = [
  { id: 1, name: 'Cosmic Bloom #118', price: '1.29', image: '/images/monkey-purple.png' },
  { id: 2, name: 'Violet Nomad #314', price: '1.39', image: '/images/monkey-purple.png' },
  { id: 3, name: 'Ivory Baron #088', price: '1.79', image: '/images/monkey-gold.png' },
  { id: 4, name: 'Golden Beat #207', price: '0.99', image: '/images/monkey-gold.png' },
  { id: 5, name: 'Golden Signal #160', price: '0.39', image: '/images/monkey-gold.png' },
];

const formatETH = (value: number) => `${value.toFixed(2)} ETH`;

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponMessage, setCouponMessage] = useState('');

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discount = couponApplied ? subtotal * 0.1 : 0;
  const networkFee = items.length > 0 ? 0.016 : 0;
  const total = Math.max(0, subtotal - discount + networkFee);

  function updateQuantity(id: number, amount: number) {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  }

  function removeItem(id: number) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  function applyCoupon() {
    if (coupon.trim().toUpperCase() === 'KURIO10') {
      setCouponApplied(true);
      setCouponMessage('Cupom aplicado: 10% de desconto!');
    } else {
      setCouponApplied(false);
      setCouponMessage('Cupom inválido. Experimente KURIO10.');
    }
  }

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
              <button onClick={applyCoupon}>Aplicar</button>
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
