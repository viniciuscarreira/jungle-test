
interface BlogCardProps {
  image: string;
  date: string;
  readingTime: number;
  title: string;
  description: string;
}

function BlogCard({
  image,
  date,
  readingTime,
  title,
  description
}: BlogCardProps) {
  return (
    <article className="blog-card">
      <img
        src={image}
        alt={title}
        className="blog-image"
      />

      <div className="blog-content">
        <p className="blog-meta">
          {date} | Leitura de {readingTime} min
        </p>

        <h3>{title}</h3>

        <p className="blog-description">
          {description}
        </p>

        <a href="#aprenda" className="blog-link">
          Ler mais →
        </a>
      </div>
    </article>
  );
}

export default BlogCard;
