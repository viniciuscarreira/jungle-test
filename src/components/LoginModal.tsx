
import { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import './LoginModal.css';

type LoginModalProps = {
  onClose: () => void;
};

export default function LoginModal({ onClose }: LoginModalProps) {
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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isRegister && password !== confirmPassword) {
      setMessage('As senhas não coincidem.');
      return;
    }

    if (isRegister && password.length < 6) {
      setMessage('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setMessage(
      isRegister
        ? 'Cadastro validado! A criação da conta será integrada depois.'
        : 'Login validado! A autenticação será integrada depois.'
    );
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
                setMessage('Recuperação de senha será implementada depois.')
              }
            >
              Esqueceu a senha?
            </button>
          )}

          <button className="login-submit" type="submit">
            {isRegister ? 'Criar conta' : 'Entrar'}
          </button>

          {message && (
            <p className="login-feedback" role="status">
              {message}
            </p>
          )}
        </form>

        <div className="login-divider">Ou continue com</div>

        <button className="login-social" type="button">
          <span className="login-google">G</span>
          Continuar com Google
        </button>

        <button className="login-social" type="button">
          <span className="login-facebook">f</span>
          Continuar com Facebook
        </button>
      </div>
    </div>
  );
}
