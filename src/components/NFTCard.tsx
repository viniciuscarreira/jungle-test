
interface NFTCardProps {
  name: string;
  price: string;
  image: string;
  oldPrice?: string;
}

function NFTCard({
  name,
  price,
  image,
  oldPrice
}: NFTCardProps) {
  return (
    <article className="nft-card">
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
