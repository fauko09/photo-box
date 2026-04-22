export default function FilterPanel({ filters, selectedId, onSelect }) {
  return (
    <section className="control-group">
      <div>
        <h2>Filter</h2>
        <p>Ubah mood foto sebelum atau sesudah capture.</p>
      </div>
      <div className="option-grid">
        {filters.map((filter) => (
          <button
            className={filter.id === selectedId ? 'option-button is-selected' : 'option-button'}
            key={filter.id}
            type="button"
            onClick={() => onSelect(filter.id)}
          >
            <span className="filter-dot" style={{ filter: filter.css }} />
            {filter.name}
          </button>
        ))}
      </div>
    </section>
  );
}
