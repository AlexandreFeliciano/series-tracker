function SeriesCard({ serie, onSelect = () => {} }) {
  return (
    <div className="series-card" onClick={() => onSelect(serie)}>
      <img
        src={serie.cover}
        alt={serie.title}
        className="series-cover"
      />

      <div className="score-badge">
        {Number(serie.rating ?? 0)}/10
      </div>

      <div className="series-overlay">
        <h3>{serie.title}</h3>
      </div>
    </div>
  );
}

export default SeriesCard;