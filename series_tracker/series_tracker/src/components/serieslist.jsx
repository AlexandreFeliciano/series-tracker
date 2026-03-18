import SeriesCard from "./seriescard";

function SeriesList({ series = [], onSelect = () => {} }) {
  if (!Array.isArray(series) || series.length === 0) {
    return <p className="empty-message">Nenhuma série encontrada.</p>;
  }

  return (
    <section className="series-grid">
      {series.map((item) => (
        <SeriesCard
          key={item._id || item.id}
          serie={item}
          onSelect={onSelect}
        />
      ))}
    </section>
  );
}

export default SeriesList;