
import { useRef, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '../state/AuthContext';
import { useFavorites } from '../state/FavoritesContext';
import { nfts } from '../data/nfts';
import NFTCard from '../components/NFTCard';
import {
  UserRound,
  Wallet,
  ShoppingCart,
  Heart,
  Tag,
  Download,
  LifeBuoy,
  LogOut,
  ImagePlus,
  Eye,
  EyeOff,
} from 'lucide-react';
import './CollectorProfile.css';

type ProfileForm = {
  displayName: string;
  username: string;
  email: string;
  ensExtension: string;
  ensName: string;
  walletNickname: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const initialForm: ProfileForm = {
  displayName: '',
  username: '',
  email: '',
  ensExtension: '.eth',
  ensName: '',
  walletNickname: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
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

export default function CollectorProfile() {
  const navigate = useNavigate();
  const { user, logout, changePassword } = useAuth();
  const { favorites } = useFavorites();
  const [section, setSection] = useState<'profile' | 'favorites'>(() => { const target = sessionStorage.getItem('kurio-profile-section'); sessionStorage.removeItem('kurio-profile-section'); return target === 'favorites' ? 'favorites' : 'profile'; });
  const [form, setForm] = useState<ProfileForm>(() => {
    try {
      const saved = localStorage.getItem('kurio-profile-demo');
      return { ...initialForm, ...(saved ? JSON.parse(saved) : {}), displayName: user?.name || '', email: user?.email || '' };
    } catch { return initialForm; }
  });
  const [avatar, setAvatar] = useState<string | null>(null);
  const [showPasswords, setShowPasswords] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  function updateField(field: keyof ProfileForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setMessage('Selecione um arquivo de imagem.');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(file);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      setMessage('As novas senhas não coincidem.');
      return;
    }

    if (form.newPassword && !form.currentPassword) {
      setMessage('Informe a senha atual para alterar a senha.');
      return;
    }

    if (form.currentPassword || form.newPassword || form.confirmPassword) {
      if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
        setMessage('Preencha os três campos de senha para alterá-la.');
        return;
      }
      try { await changePassword(form.currentPassword, form.newPassword); }
      catch (error) { setMessage(error instanceof Error ? error.message : 'Não foi possível alterar a senha.'); return; }
    }
    const { currentPassword: _current, newPassword: _new, confirmPassword: _confirm, ...publicFields } = form;
    void [_current, _new, _confirm];
    localStorage.setItem('kurio-profile-demo', JSON.stringify(publicFields));
    setForm(current => ({ ...current, currentPassword: '', newPassword: '', confirmPassword: '' }));
    setMessage(form.newPassword ? 'Perfil salvo e senha alterada com sucesso.' : 'Perfil demonstrativo salvo neste navegador.');
  }

  return (
    <div className="collector-page">
      <div className="collector-layout">
        <aside className="collector-sidebar">
          <h2>Meu perfil</h2>

          <nav aria-label="Menu do perfil">
            {menuItems.map(({ label, icon: Icon }, index) => (
              <button
                type="button"
                key={label}
                className={`collector-menu-item ${(section === 'profile' && index === 0) || (section === 'favorites' && label === 'Lista de interesse') ? 'active' : ''}`}
                onClick={() => {
                  if (label === 'Carteiras') navigate({ to: '/carteiras' });
                  else if (label === 'Sair') { logout(); navigate({ to: '/' }); }
                  else if (label === 'Lista de interesse') { setSection('favorites'); setMessage(''); }
                  else if (index === 0) { setSection('profile'); setMessage(''); }
                  else setMessage(`A seção "${label}" será conectada depois.`);
                }}
              >
                <Icon size={17} strokeWidth={1.6} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="collector-content">
          {section === 'favorites' ? (
            <section aria-label="Lista de interesse">
              <h1>Lista de interesse</h1>
              <p>Seus NFTs favoritos ficam salvos nesta conta neste navegador.</p>
              {favorites.length === 0 ? <p>Você ainda não favoritou nenhum NFT. Explore o mercado para começar.</p> : (
                <div className="nft-grid kurio-favorites-grid">
                  {nfts.filter(nft => favorites.includes(nft.id)).map(nft => <NFTCard key={nft.id} {...nft} />)}
                </div>
              )}
              <button type="button" className="collector-save" onClick={() => navigate({ to: '/' })}>Explorar NFTs</button>
            </section>
          ) : <>
          <h1>Perfil do colecionador</h1>

          <form onSubmit={handleSubmit}>
            <div className="collector-fields">
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
                Nome de usuário <span>*</span>
                <input
                  required
                  value={form.username}
                  onChange={(event) =>
                    updateField('username', event.target.value)
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
                <div className="collector-ens">
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

              <div className="collector-avatar-field">
                <span>Avatar</span>

                <div className="collector-avatar-actions">
                  <div className="collector-avatar-preview">
                    {avatar ? (
                      <img src={avatar} alt="Avatar selecionado" />
                    ) : (
                      <ImagePlus size={20} />
                    )}
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleAvatarChange}
                  />

                  <button
                    type="button"
                    className="collector-avatar-change"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Alterar
                  </button>

                  <button
                    type="button"
                    className="collector-avatar-remove"
                    onClick={() => {
                      setAvatar(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                      }
                    }}
                  >
                    Remover
                  </button>
                </div>
              </div>
            </div>

            <h2 className="collector-password-heading">Alterar senha</h2>

            <div className="collector-password-fields">
              <label>
                Senha atual
                <div className="collector-password-input">
                  <input
                    type={showPasswords ? 'text' : 'password'}
                    value={form.currentPassword}
                    onChange={(event) =>
                      updateField('currentPassword', event.target.value)
                    }
                  />
                  <button
                    type="button"
                    aria-label="Mostrar ou ocultar senhas"
                    onClick={() => setShowPasswords(!showPasswords)}
                  >
                    {showPasswords ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </label>

              <label>
                Nova senha
                <div className="collector-password-input">
                  <input
                    type={showPasswords ? 'text' : 'password'}
                    value={form.newPassword}
                    onChange={(event) =>
                      updateField('newPassword', event.target.value)
                    }
                  />
                  <button
                    type="button"
                    aria-label="Mostrar ou ocultar senhas"
                    onClick={() => setShowPasswords(!showPasswords)}
                  >
                    {showPasswords ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </label>

              <label>
                Confirmar nova senha
                <div className="collector-password-input">
                  <input
                    type={showPasswords ? 'text' : 'password'}
                    value={form.confirmPassword}
                    onChange={(event) =>
                      updateField('confirmPassword', event.target.value)
                    }
                  />
                  <button
                    type="button"
                    aria-label="Mostrar ou ocultar senhas"
                    onClick={() => setShowPasswords(!showPasswords)}
                  >
                    {showPasswords ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </label>
            </div>

            <button className="collector-save" type="submit">
              Salvar
            </button>

            {message && (
              <p className="collector-message" role="status">
                {message}
              </p>
            )}
          </form>
          </>}
        </main>
      </div>
    </div>
  );
}
