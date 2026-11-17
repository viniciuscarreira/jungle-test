import { useNavigate } from '@tanstack/react-router';
import { Heart } from 'lucide-react';
import { useFavorites } from '../state/FavoritesContext';
import { useAuth } from '../state/AuthContext';

interface NFTCardProps {
  id?: number;
  name: string;
  price: string;
  image: string;
  oldPrice?: string;
}

function NFTCard({
  id,
  name,
  price,
  image,
  oldPrice
}: NFTCardProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const nftId = id ?? 1;
  const favorite = isFavorite(nftId);
  return (
    <article
      className="nft-card"
      role="link"
      tabIndex={0}
      onClick={() => navigate({ to: '/nft/$id', params: { id: String(id ?? 1) } })}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          navigate({ to: '/nft/$id', params: { id: String(id ?? 1) } });
        }
      }}
      style={{ cursor: 'pointer' }}
    >
      <button type="button" className={`nft-card-favorite ${favorite ? 'selected' : ''}`}
        aria-label={favorite ? `Remover ${name} dos favoritos` : `Favoritar ${name}`}
        aria-pressed={favorite}
        onClick={event => {
          event.stopPropagation();
          if (!user) { sessionStorage.setItem('kurio-login-required', '1'); navigate({ to: '/' }); return; }
          toggleFavorite(nftId);
        }}>
        <Heart size={17} fill={favorite ? 'currentColor' : 'none'} />
      </button>
      <img
        src={image}
        alt={name}
        className="nft-image"
      />

      <div className="nft-info">
        <h3>{name}</h3>

        <div className="nft-prices">
          <strong>{price} ETH</strong>
          {oldPrice && <span>{oldPrice} ETH</span>}
        </div>
      </div>
    </article>
  );
}

export default NFTCard;
