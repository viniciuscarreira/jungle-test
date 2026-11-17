
import { useState } from 'react';
import { Check, ExternalLink, X } from 'lucide-react';
import './OrderConfirmation.css';

const purchasedNFTs = [
  {
    id: 1,
    name: 'Emerald Ape #042',
    token: '#042',
    quantity: 2,
    subtotal: 2.38,
    image: '/images/monkey-green.png',
  },
  {
    id: 2,
    name: 'Violet Nomad #314',
    token: '#314',
    quantity: 6,
    subtotal: 8.34,
    image: '/images/monkey-purple.png',
  },
  {
    id: 3,
    name: 'Ivory Baron #088',
    token: '#088',
    quantity: 9,
    subtotal: 16.11,
    image: '/images/monkey-gold.png',
  },
];

export default function OrderConfirmation() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <div className="confirmation-closed">
        <button onClick={() => setIsOpen(true)}>
          Ver confirmação do pedido
        </button>
      </div>
    );
  }

  return (
    <div className="confirmation-page">
      <div className="confirmation-modal">
        <button
          className="confirmation-close"
          aria-label="Fechar confirmação"
          onClick={() => setIsOpen(false)}
        >
          <X size={18} />
        </button>

        <div className="confirmation-icon">
          <div className="confirmation-envelope">
            <Check size={26} />
          </div>
        </div>

        <h1>Seus NFTs agora estão na sua carteira</h1>

        <div className="confirmation-transaction">
          <div>
            <span>ID da transação</span>
            <strong>0x7f13...2b9c</strong>
          </div>
          <div>
            <span>Data</span>
            <strong>20 jul, 2026</strong>
          </div>
          <div>
            <span>Total</span>
            <strong>26.846 ETH</strong>
          </div>
          <div>
            <span>Carteira</span>
            <strong>MetaMask</strong>
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
              <strong>{nft.subtotal.toFixed(2)} ETH</strong>
            </div>
          ))}

          <div className="confirmation-fees">
            <div>
              <span>Taxa de rede</span>
              <span>0.016 ETH</span>
            </div>
            <div>
              <strong>Total</strong>
              <strong>26.846 ETH</strong>
            </div>
          </div>
        </section>

        <p className="confirmation-message">
          Transação confirmada na Ethereum. A propriedade foi
          transferida para sua carteira conectada e registrada na rede.
        </p>

        <button
          className="confirmation-etherscan"
          type="button"
          onClick={() => {
            // Integraremos o link real após implementar o checkout.
          }}
        >
          Ver no Etherscan <ExternalLink size={14} />
        </button>
      </div>
    </div>
  );
}
