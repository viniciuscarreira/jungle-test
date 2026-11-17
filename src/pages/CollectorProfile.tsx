
import { useRef, useState } from 'react';
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
  const [form, setForm] = useState<ProfileForm>(initialForm);
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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      setMessage('As novas senhas não coincidem.');
      return;
    }

    if (form.newPassword && !form.currentPassword) {
      setMessage('Informe a senha atual para alterar a senha.');
      return;
    }

    setMessage('Dados validados! A persistência será integrada depois.');
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
                className={`collector-menu-item ${index === 0 ? 'active' : ''}`}
                onClick={() => {
                  if (index !== 0) {
                    setMessage(`A seção "${label}" será conectada depois.`);
                  }
                }}
              >
                <Icon size={17} strokeWidth={1.6} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="collector-content">
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
        </main>
      </div>
    </div>
  );
}
