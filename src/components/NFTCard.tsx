import { useNavigate } from '@tanstack/react-router';

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
