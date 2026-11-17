
import { useNavigate } from '@tanstack/react-router';
import { useCart } from '../state/CartContext';
import { useAuth } from '../state/AuthContext';
import { Check, X } from 'lucide-react';
import './OrderConfirmation.css';

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const { order } = useCart();
  const { user } = useAuth();
  const purchasedNFTs = order?.items ?? [];


  if (!order || !user || order.ownerEmail !== user.email) return <div className="confirmation-closed"><p>Nenhum pedido simulado encontrado.</p><button onClick={() => navigate({ to: "/carrinho" })}>Voltar ao carrinho</button></div>;

  return (
    <div className="confirmation-page">
      <div className="confirmation-modal">
        <button
          className="confirmation-close"
          aria-label="Fechar confirmação"
          onClick={() => navigate({ to: "/" })}
        >
          <X size={18} />
        </button>

        <div className="confirmation-icon">
          <div className="confirmation-envelope">
            <Check size={26} />
          </div>
        </div>

        <h1>Pedido simulado realizado com sucesso</h1>

        <div className="confirmation-transaction">
          <div>
            <span>ID do pedido</span>
            <strong>{order.id}</strong>
          </div>
          <div>
            <span>Data</span>
            <strong>{new Date(order.date).toLocaleDateString("pt-BR")}</strong>
          </div>
          <div>
            <span>Total</span>
            <strong>{order.total.toFixed(3)} ETH</strong>
          </div>
          <div>
            <span>Carteira</span>
            <strong>{order.provider}</strong>
          </div>
        </div>

        <section className="confirmation-details">
          <h2>Detalhes da transação</h2>

          <div className="confirmation-table-heading">
            <span>NFTs</span>
            <span>Edições</span>
            <span>Subtotal</span>
          </div>

          {purchasedNFTs.map((nft) => (
            <div className="confirmation-nft" key={nft.id}>
              <div className="confirmation-nft-info">
                <img src={nft.image} alt={nft.name} />
                <div>
                  <strong>{nft.name}</strong>
                  <small>ID do token: {nft.token}</small>
                </div>
              </div>
              <span>({nft.quantity}x)</span>
              <strong>{(nft.price * nft.quantity).toFixed(2)} ETH</strong>
            </div>
          ))}

          <div className="confirmation-fees">
            <div>
              <span>Taxa de rede</span>
              <span>{order.networkFee.toFixed(3)} ETH</span>
            </div>
            <div>
              <strong>Total</strong>
              <strong>{order.total.toFixed(3)} ETH</strong>
            </div>
          </div>
        </section>

        <p className="confirmation-message">
          Este é um pedido demonstrativo. Nenhuma transferência de NFT ou transação blockchain foi realizada.
        </p>

        <div className="confirmation-actions">
          <button className="confirmation-etherscan" type="button" onClick={() => navigate({to:"/"})}>Voltar ao início</button>
        </div>
      </div>
    </div>
  );
}
