
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import {
  UserRound,
  Wallet,
  ShoppingCart,
  Heart,
  Tag,
  Download,
  LifeBuoy,
  LogOut,
} from 'lucide-react';
import './Wallets.css';

type WalletForm = {
  displayName: string;
  walletNickname: string;
  network: string;
  profileName: string;
  address: string;
  secondaryAddress: string;
  walletType: string;
  referralCode: string;
  email: string;
  ensExtension: string;
  ensName: string;
};

const emptyForm: WalletForm = {
  displayName: '',
  walletNickname: '',
  network: '',
  profileName: '',
  address: '',
  secondaryAddress: '',
  walletType: '',
  referralCode: '',
  email: '',
  ensExtension: '.eth',
  ensName: '',
};

const menuItems = [
  { label: 'Dados do perfil', icon: UserRound },
  { label: 'Carteiras', icon: Wallet },
  { label: 'Atividade', icon: ShoppingCart },
  { label: 'Lista de interesse', icon: Heart },
  { label: 'Ofertas', icon: Tag },
  { label: 'Arquivos baixados', icon: Download },
  { label: 'Suporte', icon: LifeBuoy },
  { label: 'Sair', icon: LogOut },
];

export default function Wallets() {
  const navigate = useNavigate();
  const [form, setForm] = useState<WalletForm>(() => {
    try {
      const saved = localStorage.getItem('kurio-wallets-demo');
      return saved ? { ...emptyForm, ...JSON.parse(saved) } : emptyForm;
    } catch { return emptyForm; }
  });
  const [sameAsPrimary, setSameAsPrimary] = useState(false);
  const [showSecondary, setShowSecondary] = useState(false);
  const [message, setMessage] = useState('');

  function updateField(field: keyof WalletForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    localStorage.setItem('kurio-wallets-demo', JSON.stringify(form));
    setMessage('Dados da carteira demonstrativa salvos neste navegador. Nenhuma carteira real foi conectada.');
  }

  return (
    <div className="wallets-page">
      <div className="wallets-layout">
        <aside className="wallets-sidebar">
          <h2>Meu perfil</h2>

          <nav aria-label="Menu do perfil">
            {menuItems.map(({ label, icon: Icon }, index) => (
              <button
                type="button"
                key={label}
                className={`wallets-menu-item ${index === 1 ? 'active' : ''}`}
                onClick={() => {
                  if (label === 'Dados do perfil') navigate({ to: '/perfil' });
                  else if (label === 'Sair') navigate({ to: '/' });
                  else if (index !== 1) setMessage(`A seção "${label}" será conectada depois.`);
                }}
              >
                <Icon size={17} strokeWidth={1.6} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="wallets-content">
          <div className="wallets-section-heading">
            <div>
              <h1>Carteira principal</h1>
              <p>
                Esta carteira fica disponível no pagamento e para receber NFTs comprados.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setMessage('Preencha os dados para adicionar sua carteira.')}
            >
              Adicionar
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="wallets-fields">
              <label>
                Nome de exibição <span>*</span>
                <input
                  required
                  value={form.displayName}
                  onChange={(event) =>
                    updateField('displayName', event.target.value)
                  }
                />
              </label>

              <label>
                Apelido da carteira <span>*</span>
                <input
                  required
                  value={form.walletNickname}
                  onChange={(event) =>
                    updateField('walletNickname', event.target.value)
                  }
                />
              </label>

              <label>
                Rede <span>*</span>
                <select
                  required
                  value={form.network}
                  onChange={(event) =>
                    updateField('network', event.target.value)
                  }
                >
                  <option value="">Selecione uma rede</option>
                  <option value="ethereum">Ethereum</option>
                  <option value="polygon">Polygon</option>
                  <option value="solana">Solana</option>
                </select>
              </label>

              <label>
                Nome do perfil <span>*</span>
                <input
                  required
                  value={form.profileName}
                  onChange={(event) =>
                    updateField('profileName', event.target.value)
                  }
                />
              </label>

              <label>
                Endereço da carteira <span>*</span>
                <input
                  required
                  placeholder="Endereço da carteira"
                  value={form.address}
                  onChange={(event) =>
                    updateField('address', event.target.value)
                  }
                />
              </label>

              <label>
                ENS ou carteira secundária (opcional)
                <input
                  value={form.secondaryAddress}
                  onChange={(event) =>
                    updateField('secondaryAddress', event.target.value)
                  }
                />
              </label>

              <label>
                Tipo de carteira <span>*</span>
                <select
                  required
                  value={form.walletType}
                  onChange={(event) =>
                    updateField('walletType', event.target.value)
                  }
                >
                  <option value="">Selecione uma carteira</option>
                  <option value="metamask">MetaMask</option>
                  <option value="walletconnect">WalletConnect</option>
                  <option value="coinbase">Coinbase Wallet</option>
                </select>
              </label>

              <label>
                Código de indicação <span>*</span>
                <input
                  required
                  value={form.referralCode}
                  onChange={(event) =>
                    updateField('referralCode', event.target.value)
                  }
                />
              </label>

              <label>
                E-mail <span>*</span>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(event) =>
                    updateField('email', event.target.value)
                  }
                />
              </label>

              <label>
                Nome ENS <span>*</span>
                <div className="wallets-ens">
                  <select
                    value={form.ensExtension}
                    onChange={(event) =>
                      updateField('ensExtension', event.target.value)
                    }
                  >
                    <option value=".eth">.eth</option>
                    <option value=".xyz">.xyz</option>
                  </select>

                  <input
                    required
                    value={form.ensName}
                    onChange={(event) =>
                      updateField('ensName', event.target.value)
                    }
                  />
                </div>
              </label>
            </div>

            <button className="wallets-save" type="submit">
              Salvar carteira
            </button>
          </form>

          <section className="wallets-secondary">
            <div className="wallets-section-heading">
              <div>
                <h2>Carteira secundária</h2>
                {!showSecondary && (
                  <p>Você ainda não adicionou uma carteira secundária.</p>
                )}
              </div>

              <div className="wallets-secondary-actions">
                <label>
                  <input
                    type="checkbox"
                    checked={sameAsPrimary}
                    onChange={(event) =>
                      setSameAsPrimary(event.target.checked)
                    }
                  />
                  Igual à carteira principal
                </label>

                <button
                  type="button"
                  onClick={() => setShowSecondary(!showSecondary)}
                >
                  {showSecondary ? 'Cancelar' : 'Adicionar'}
                </button>
              </div>
            </div>

            {showSecondary && (
              <div className="wallets-secondary-form">
                <label>
                  Endereço da carteira secundária
                  <input
                    placeholder="0x..."
                    value={
                      sameAsPrimary
                        ? form.address
                        : form.secondaryAddress
                    }
                    disabled={sameAsPrimary}
                    onChange={(event) =>
                      updateField('secondaryAddress', event.target.value)
                    }
                  />
                </label>

                <button
                  type="button"
                  onClick={() =>
                    setMessage('Carteira secundária validada visualmente.')
                  }
                >
                  Salvar carteira secundária
                </button>
              </div>
            )}
          </section>

          {message && (
            <p className="wallets-message" role="status">
              {message}
            </p>
          )}
        </main>
      </div>
    </div>
  );
}
