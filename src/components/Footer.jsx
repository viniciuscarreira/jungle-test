import { useState } from 'react';

function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(event) {
    event.preventDefault();

    if (!email.trim()) return;

    setSubscribed(true);
    setEmail('');
  }

  return (
    <footer className="footer">
      <div className="footer-benefits">
        <div className="benefit">
          <div className="benefit-icon">W</div>
          <h3>Segurança da carteira</h3>
          <p>
            Proteja sua carteira e colecione arte digital
            verificada com confiança.
          </p>
        </div>

        <div className="benefit">
          <div className="benefit-icon">C</div>
          <h3>Criadores em destaque</h3>
          <p>
            Conheça artistas, estúdios e comunidades que
            moldam a cultura digital na rede.
          </p>
        </div>

        <div className="benefit">
          <div className="benefit-icon">D</div>
          <h3>Alertas de lançamentos</h3>
          <p>
            Receba calendários de cunhagem, novidades de
            listas de acesso e análises de mercado.
          </p>
        </div>

        <div className="newsletter">
          <h3>Antecipe-se ao próximo lançamento</h3>

          <form onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="digite seu e-mail..."
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setSubscribed(false);
              }}
              required
            />
            <button type="submit">Enviar</button>
          </form>

          {subscribed ? (
            <p>E-mail recebido! Obrigado pelo interesse.</p>
          ) : (
            <p>
              Receba lançamentos selecionados, histórias
              de criadores e novidades do mercado.
            </p>
          )}
        </div>
      </div>

      <div className="footer-brand">
        <strong>KURIO</strong>
        <p>Feito para colecionadores, criadores e cultura</p>
        <span>contato@email.com</span>
        <span>+55 11 4002 8922</span>
      </div>

      <div className="footer-links">
        <div>
          <h3>Meu perfil</h3>
          <a href="#inicio">Meu perfil</a>
          <a href="#mercado">Minha coleção</a>
          <a href="#mercado">Atividade</a>
          <a href="#criadores">Estúdio do criador</a>
          <a href="#mercado">Lista de interesse</a>
        </div>

        <div>
          <h3>Central de ajuda</h3>
          <a href="#inicio">Central de ajuda</a>
          <a href="#aprenda">Como comprar NFTs</a>
          <a href="#aprenda">Carteira e segurança</a>
          <a href="#inicio">Política do mercado</a>
          <a href="#inicio">Denunciar item</a>
        </div>

        <div>
          <h3>Coleções</h3>
          <a href="#mercado">Arte digital</a>
          <a href="#mercado">Fotografia</a>
          <a href="#mercado">Música</a>
          <a href="#mercado">Arte 3D</a>
          <a href="#mercado">Utilidade</a>
        </div>

        <div>
          <h3>Redes sociais</h3>
          <div className="social-links">
            <a href="https://facebook.com" aria-label="Facebook">f</a>
            <a href="https://instagram.com" aria-label="Instagram">◎</a>
            <a href="https://x.com" aria-label="X">𝕏</a>
            <a href="https://linkedin.com" aria-label="LinkedIn">in</a>
            <a href="https://youtube.com" aria-label="YouTube">▶</a>
          </div>

          <h3 className="wallet-title">Carteiras compatíveis</h3>
          <div className="wallets">
            METAMASK · WALLETCONNECT · COINBASE
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 Kurio. Propriedade digital para todos.
      </div>
    </footer>
  );
}

export default Footer;
