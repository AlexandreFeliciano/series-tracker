import { useEffect, useState } from "react";

function SeriesForm({ selectedSeries, onClose, onSave, onDelete }) {
    const [formData, setFormData] = useState({
        _id: "",
        title: "",
        genre: "",
        platform: "",
        status: "plan",
        rating: 0,
        totalSeasons: 1,
        watchedSeasons: 0,
        review: "",
        cover: ""
    });

    useEffect(() => {
        if (selectedSeries) {
            setFormData({
                _id: selectedSeries._id || "",
                title: selectedSeries.title || "",
                genre: selectedSeries.genre || "",
                platform: selectedSeries.platform || "",
                status: selectedSeries.status || "plan",
                rating: selectedSeries.rating ?? 0,
                totalSeasons: selectedSeries.totalSeasons ?? 1,
                watchedSeasons: selectedSeries.watchedSeasons ?? 0,
                review: selectedSeries.review || "",
                cover: selectedSeries.cover || ""
            });
        }
    }, [selectedSeries]);

    if (!selectedSeries) return null;

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "rating" ||
                name === "totalSeasons" ||
                name === "watchedSeasons"
                    ? Number(value)
                    : value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log("A enviar formulário:", formData);
        onSave(formData);
    }

    return (
        <div className="modal-backdrop">
            <div className="modal-box">
                <h2>{formData._id ? "Edit Series" : "Add Series"}</h2>

                <form onSubmit={handleSubmit} className="modal-form">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />

                    <label>Genre</label>
                    <input
                        type="text"
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                    />

                    <label>Platform</label>
                    <input
                        type="text"
                        name="platform"
                        value={formData.platform}
                        onChange={handleChange}
                    />

                    <label>Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="plan">Plan to watch</option>
                        <option value="watching">Watching</option>
                        <option value="completed">Completed</option>
                        <option value="dropped">Dropped</option>
                    </select>

                    <label>Rating</label>
                    <input
                        type="number"
                        name="rating"
                        min="0"
                        max="10"
                        step="1"
                        value={formData.rating}
                        onChange={handleChange}
                        placeholder="Score (0-10)"
                    />

                    <label>Total Seasons</label>
                    <input
                        type="number"
                        name="totalSeasons"
                        min="1"
                        value={formData.totalSeasons}
                        onChange={handleChange}
                    />

                    <label>Watched Seasons</label>
                    <input
                        type="number"
                        name="watchedSeasons"
                        min="0"
                        value={formData.watchedSeasons}
                        onChange={handleChange}
                    />

                    <label>Review</label>
                    <textarea
                        name="review"
                        rows="4"
                        value={formData.review}
                        onChange={handleChange}
                    />

                    <label>Cover URL</label>
                    <input
                        type="text"
                        name="cover"
                        value={formData.cover}
                        onChange={handleChange}
                    />

                    <div className="modal-actions">
                        <button type="button" className="cancel-btn" onClick={onClose}>
                            Cancel
                        </button>

                        {formData._id && (
                            <button
                                type="button"
                                className="delete-btn"
                                onClick={() => onDelete(formData._id)}
                            >
                                Delete
                            </button>
                        )}

                        <button type="submit" className="save-btn">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SeriesForm;