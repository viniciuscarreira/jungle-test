
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useCart } from '../state/CartContext';
import Footer from '../components/Footer';
import './Payment.css';

type PaymentForm = {
  nickname: string;
  username: string;
  network: string;
  profileName: string;
  walletAddress: string;
  secondaryWallet: string;
  walletType: string;
  discountCode: string;
  email: string;
  description: string;
};

const initialForm: PaymentForm = {
  nickname: '',
  username: '',
  network: '',
  profileName: '',
  walletAddress: '',
  secondaryWallet: '',
  walletType: '',
  discountCode: '',
  email: '',
  description: '',
};

export default function Payment() {
  const navigate = useNavigate();
  const { items: paymentItems, subtotal, discount, networkFee, total, checkout } = useCart();
  const [form, setForm] = useState<PaymentForm>(initialForm);
  const [useAnotherWallet, setUseAnotherWallet] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState('coinbase');
  const [submitted, setSubmitted] = useState(false);

  function updateField(field: keyof PaymentForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const order = checkout(selectedProvider);
    if (order) navigate({ to: "/confirmacao" });
    else setSubmitted(true);
  }

  return (
    <div className="payment-page">
      <main className="payment-container">
        <div className="payment-breadcrumb">Início / Mercado / Pagamento</div>

        <form className="payment-layout" onSubmit={handleSubmit}>
          <section className="payment-profile">
            <h2>Perfil do colecionador</h2>

            <div className="payment-fields">
              <label>
                Nome de exibição *
                <input
                  required
                  value={form.nickname}
                  onChange={(e) => updateField('nickname', e.target.value)}
                />
              </label>

              <label>
                Nome de usuário *
                <input
                  required
                  value={form.username}
                  onChange={(e) => updateField('username', e.target.value)}
                />
              </label>

              <label>
                Rede *
                <select
                  required
                  value={form.network}
                  onChange={(e) => updateField('network', e.target.value)}
                >
                  <option value="">Selecione uma rede</option>
                  <option value="ethereum">Ethereum</option>
                  <option value="polygon">Polygon</option>
                  <option value="solana">Solana</option>
                </select>
              </label>

              <label>
                Nome do perfil *
                <input
                  required
                  value={form.profileName}
                  onChange={(e) => updateField('profileName', e.target.value)}
                />
              </label>

              <label>
                Endereço da carteira *
                <input
                  required
                  placeholder="Endereço da carteira"
                  value={form.walletAddress}
                  onChange={(e) => updateField('walletAddress', e.target.value)}
                />
              </label>

              <label>
                Endereço em carteira secundária (opcional)
                <input
                  value={form.secondaryWallet}
                  onChange={(e) => updateField('secondaryWallet', e.target.value)}
                />
              </label>

              <label>
                Tipo de carteira *
                <select
                  required
                  value={form.walletType}
                  onChange={(e) => updateField('walletType', e.target.value)}
                >
                  <option value="">Selecione uma carteira</option>
                  <option value="metamask">MetaMask</option>
                  <option value="walletconnect">WalletConnect</option>
                  <option value="coinbase">Coinbase Wallet</option>
                </select>
              </label>

              <label>
                Código de indicação *
                <input
                  required
                  value={form.discountCode}
                  onChange={(e) => updateField('discountCode', e.target.value)}
                />
              </label>

              <label>
                E-mail *
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                />
              </label>
            </div>

            <label className="payment-checkbox">
              <input
                type="checkbox"
                checked={useAnotherWallet}
                onChange={(e) => setUseAnotherWallet(e.target.checked)}
              />
              Usar outra carteira?
            </label>

            <label className="payment-description">
              Descrição do colecionador (opcional)
              <textarea
                rows={6}
                value={form.description}
                onChange={(e) => updateField('description', e.target.value)}
              />
            </label>
          </section>

          <aside className="payment-summary">
            <h2>Seus NFTs</h2>
            {paymentItems.length === 0 && <p>Seu carrinho está vazio. Adicione NFTs antes de finalizar.</p>}

            <div className="payment-summary-head">
              <span>NFTs</span>
              <span>Subtotal</span>
            </div>

            {paymentItems.map((item) => (
              <div className="payment-nft" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <strong>{item.name}</strong>
                  <small>ID do token: {item.token} ({item.quantity}x)</small>
                </div>
                <span>{(item.price * item.quantity).toFixed(2)} ETH</span>
              </div>
            ))}

            <p className="payment-coupon-note">
              Tem um código promocional? Aplique aqui.
            </p>

            <div className="payment-summary-line">
              <span>Subtotal</span>
              <span>{subtotal.toFixed(2)} ETH</span>
            </div>
            <div className="payment-summary-line">
              <span>Desconto de lançamento</span>
              <span>(-) {discount.toFixed(2)} ETH</span>
            </div>
            <div className="payment-summary-line">
              <span>Taxa de rede</span>
              <span>{networkFee.toFixed(3)} ETH</span>
            </div>

            <div className="payment-total">
              <strong>Total</strong>
              <strong>{total.toFixed(3)} ETH</strong>
            </div>

            <h3>Carteira e rede</h3>

            <div className="payment-wallet-options">
              {[
                { id: 'metamask', label: 'METAMASK · WALLETCONNECT · COINBASE' },
                { id: 'walletconnect', label: 'MetaMask' },
                { id: 'coinbase', label: 'Coinbase Wallet' },
              ].map((provider) => (
                <label
                  className={`payment-wallet-option ${
                    selectedProvider === provider.id ? 'selected' : ''
                  }`}
                  key={provider.id}
                >
                  <input
                    type="radio"
                    name="wallet-provider"
                    value={provider.id}
                    checked={selectedProvider === provider.id}
                    onChange={() => setSelectedProvider(provider.id)}
                  />
                  {provider.label}
                </label>
              ))}
            </div>

            <button type="submit" className="payment-submit" disabled={paymentItems.length === 0}>
              Confirmar compra
            </button>

            {submitted && (
              <p className="payment-success">
                Formulário validado! A confirmação de compra será integrada
                na próxima etapa.
              </p>
            )}
          </aside>
        </form>
      </main>

      <Footer />
    </div>
  );
}
