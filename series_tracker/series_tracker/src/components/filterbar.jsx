import React from "react";

function FilterBar({
  search = "",
  setSearch = () => {},
  currentFilter = "all",
  setCurrentFilter = () => {},
  selectedLetter = "",
  setSelectedLetter = () => {},
}) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <section className="toolbar">
      <div className="toolbar-top">
        <input
          type="text"
          placeholder="Search series..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="toolbar-input"
        />

        <div className="filter-buttons">
          <button
            type="button"
            className={currentFilter === "all" ? "active" : ""}
            onClick={() => setCurrentFilter("all")}
          >
            All
          </button>

          <button
            type="button"
            className={currentFilter === "completed" ? "active" : ""}
            onClick={() => setCurrentFilter("completed")}
          >
            Completed
          </button>

          <button
            type="button"
            className={currentFilter === "watching" ? "active" : ""}
            onClick={() => setCurrentFilter("watching")}
          >
            Watching
          </button>

          <button
            type="button"
            className={currentFilter === "plan" ? "active" : ""}
            onClick={() => setCurrentFilter("plan")}
          >
            Plan
          </button>

          <button
            type="button"
            className={currentFilter === "dropped" ? "active" : ""}
            onClick={() => setCurrentFilter("dropped")}
          >
            Dropped
          </button>
        </div>
      </div>

      <div className="alphabet-filter" aria-label="Filter by first letter">
        <button
          type="button"
          className={selectedLetter === "" ? "active-letter" : ""}
          onClick={() => setSelectedLetter("")}
        >
          All
        </button>

        {letters.map((l) => (
          <button
            key={l}
            type="button"
            className={selectedLetter === l ? "active-letter" : ""}
            onClick={() => setSelectedLetter(l)}
            aria-label={`Filter by ${l}`}
          >
            {l}
          </button>
        ))}
      </div>
    </section>
  );
}

export default FilterBar;
