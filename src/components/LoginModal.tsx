
import { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import './LoginModal.css';

type LoginModalProps = {
  onClose: () => void;
};

export default function LoginModal({ onClose }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
          aria-label="Fechar login"
          onClick={onClose}
        >
          <X size={16} />
        </button>

        <h2 id="login-title">
          <span>Entrar</span> | Criar conta
        </h2>

        <p className="login-subtitle">
          Entre para gerenciar sua coleção, catálogo e perfil de criador.
        </p>

        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <input
            type="email"
            placeholder="contato@email.com"
            aria-label="E-mail"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <div className="login-password">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••••"
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

          <button type="button" className="login-forgot">
            Esqueceu a senha?
          </button>

          <button className="login-submit" type="submit">
            Entrar
          </button>
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
