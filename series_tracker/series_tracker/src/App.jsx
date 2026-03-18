import { useEffect, useMemo, useState } from "react";
import Header from "./components/header";
import FilterBar from "./components/filterbar";
import SeriesList from "./components/serieslist";
import SeriesForm from "./components/seriesform";
import api from "./services/api";

function App() {
  const [series, setSeries] = useState([]);
  const [search, setSearch] = useState("");
  const [currentFilter, setCurrentFilter] = useState("all");
  const [selectedLetter, setSelectedLetter] = useState("");
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSeries();
  }, []);

  async function fetchSeries() {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/series");
      setSeries(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Erro ao buscar séries:", error);
      setError("Não foi possível carregar as séries.");
      setSeries([]);
    } finally {
      setLoading(false);
    }
  }

  const counts = useMemo(() => {
    return {
      completed: series.filter((item) => item.status === "completed").length,
      watching: series.filter((item) => item.status === "watching").length,
      plan: series.filter((item) => item.status === "plan").length,
      dropped: series.filter((item) => item.status === "dropped").length,
      total: series.length,
    };
  }, [series]);

  const filteredSeries = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    let result = [...series];

    if (normalizedSearch !== "") {
      result = result.filter((item) => {
        const title = String(item.title || "").toLowerCase();
        const genre = String(item.genre || "").toLowerCase();
        const platform = String(item.platform || "").toLowerCase();
        const review = String(item.review || "").toLowerCase();

        return (
          title.includes(normalizedSearch) ||
          genre.includes(normalizedSearch) ||
          platform.includes(normalizedSearch) ||
          review.includes(normalizedSearch)
        );
      });
    }

    if (currentFilter !== "all") {
      result = result.filter((item) => item.status === currentFilter);
    }

    if (selectedLetter !== "") {
      result = result.filter((item) =>
        String(item.title || "")
          .trim()
          .toUpperCase()
          .startsWith(selectedLetter)
      );
    }

    if (currentFilter === "completed") {
      result.sort((a, b) =>
        String(a.title || "").localeCompare(String(b.title || ""))
      );
    }

    return result;
  }, [series, search, currentFilter, selectedLetter]);

  function handleSelectSeries(item) {
    setSelectedSeries(item);
  }

  function handleAddSeries() {
    setSelectedSeries({
      title: "",
      genre: "",
      platform: "",
      status: "plan",
      rating: 0,
      totalSeasons: 1,
      watchedSeasons: 0,
      review: "",
      cover: "",
    });
  }

  async function handleSaveSeries(seriesData) {
    const safeRating = Number(seriesData.rating ?? 0);

    if (safeRating < 0 || safeRating > 10) {
      alert("O rating tem de estar entre 0 e 10.");
      return;
    }

    try {
      if (seriesData._id) {
        const response = await api.put(`/series/${seriesData._id}`, {
          ...seriesData,
          rating: safeRating,
        });

        setSeries((prev) =>
          prev.map((item) =>
            item._id === seriesData._id ? response.data : item
          )
        );
      } else {
        const { _id, ...newSeriesData } = seriesData;

        const response = await api.post("/series", {
          ...newSeriesData,
          rating: safeRating,
        });

        setSeries((prev) => [response.data, ...prev]);
      }

      setSelectedSeries(null);
    } catch (error) {
      console.error("Erro completo:", error);
      console.error("Status:", error.response?.status);
      console.error("Data:", error.response?.data);
      console.error("Mensagem:", error.message);

      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Erro ao criar série"
      );
    }
  }

  async function handleDeleteSeries(id) {
    const confirmed = window.confirm(
      "Tens a certeza que queres apagar esta série?"
    );
    if (!confirmed) return;

    try {
      await api.delete(`/series/${id}`);
      setSeries((prev) => prev.filter((item) => item._id !== id));
      setSelectedSeries(null);
    } catch (error) {
      console.error("Erro ao apagar série:", error);
    }
  }

  const sectionTitles = {
    all: "All Series",
    completed: "Completed Series",
    watching: "Watching Now",
    plan: "Plan to Watch",
    dropped: "Dropped Series",
  };

  return (
    <div className="app-shell">
      <Header counts={counts} />

      <FilterBar
        search={search}
        setSearch={setSearch}
        currentFilter={currentFilter}
        setCurrentFilter={setCurrentFilter}
        selectedLetter={selectedLetter}
        setSelectedLetter={setSelectedLetter}
      />

      <div className="add-button-wrapper">
        <button className="main-add-btn" onClick={handleAddSeries}>
          Add Series
        </button>
      </div>

      <main className="content-area">
        <h2 className="section-title">{sectionTitles[currentFilter]}</h2>

        {loading ? (
          <p className="empty-message">A carregar séries...</p>
        ) : error ? (
          <p className="empty-message">{error}</p>
        ) : (
          <SeriesList series={filteredSeries} onSelect={handleSelectSeries} />
        )}
      </main>

      <SeriesForm
        selectedSeries={selectedSeries}
        onClose={() => setSelectedSeries(null)}
        onSave={handleSaveSeries}
        onDelete={handleDeleteSeries}
      />
    </div>
  );
}

export default App;