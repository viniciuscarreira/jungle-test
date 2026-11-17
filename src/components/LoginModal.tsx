
import { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import './LoginModal.css';
import { useAuth } from '../state/AuthContext';

type LoginModalProps = {
  onClose: () => void;
};

export default function LoginModal({ onClose }: LoginModalProps) {
  const { register, login } = useAuth();
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const isRegister = mode === 'register';

  function changeMode(nextMode: 'login' | 'register') {
    setMode(nextMode);
    setMessage('');
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');
    if (isRegister && password !== confirmPassword) {
      setMessage('As senhas não coincidem.');
      return;
    }
    setBusy(true);
    try {
      if (isRegister) await register(username, email, password);
      else await login(email, password);
      onClose();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Não foi possível continuar.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className="login-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="login-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
      >
        <button
          className="login-close"
          type="button"
          aria-label="Fechar modal"
          onClick={onClose}
        >
          <X size={16} />
        </button>

        <h2 id="login-title" className="login-tabs">
          <button
            type="button"
            className={!isRegister ? 'active' : ''}
            onClick={() => changeMode('login')}
          >
            Entrar
          </button>

          <span>|</span>

          <button
            type="button"
            className={isRegister ? 'active' : ''}
            onClick={() => changeMode('register')}
          >
            Criar conta
          </button>
        </h2>

        <p className="login-subtitle">
          {isRegister
            ? 'Crie seu perfil de colecionador e conecte uma carteira quando quiser.'
            : 'Entre para gerenciar sua coleção, catálogo e perfil de criador.'}
        </p>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input
              type="text"
              placeholder="Nome de usuário"
              aria-label="Nome de usuário"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          )}

          <input
            type="email"
            placeholder={isRegister ? 'Digite seu e-mail' : 'contato@email.com'}
            aria-label="E-mail"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <div className="login-password">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder={isRegister ? 'Senha' : '••••••••••'}
              aria-label="Senha"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <button
              type="button"
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>

          {isRegister && (
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirmar senha"
              aria-label="Confirmar senha"
              required
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          )}

          {!isRegister && (
            <button
              type="button"
              className="login-forgot"
              onClick={() =>
                setMessage('Recuperação de senha não está disponível nesta demonstração.')
              }
            >
              Esqueceu a senha?
            </button>
          )}

          <button className="login-submit" type="submit" disabled={busy}>
            {busy ? 'Aguarde...' : isRegister ? 'Criar conta' : 'Entrar'}
          </button>

          {message && (
            <p className="login-feedback" role="status">
              {message}
            </p>
          )}
        </form>

        <div className="login-divider">Login social indisponível na demonstração</div>

        <button className="login-social" type="button" disabled title="Integração social não disponível">
          <span className="login-google">G</span>
          Continuar com Google
        </button>

        <button className="login-social" type="button" disabled title="Integração social não disponível">
          <span className="login-facebook">f</span>
          Continuar com Facebook
        </button>
      </div>
    </div>
  );
}
