import { useState, useEffect } from "react";
import { getCats } from "../services/CatService";
import styles from "../styles/CatGallery.module.scss";

export default function CatGallery({ onImageClick }) {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetchId, setFetchId] = useState(0);

  const fetchCats = async (signal) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCats(signal);
      if (!signal.aborted) {
        setCats(data);
      }
    } catch (error) {
      if (error.name !== "AbortError" && !signal.aborted) {
        console.error(error.message);
        setError("Failed to load cats. Please try again.");
      }
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchCats(controller.signal);

    return () => controller.abort();
  }, [fetchId]);

  const handleRefresh = () => {
    setFetchId((prev) => prev + 1);
  };

  return (
    <div>
      <button
        className={styles["refresh-btn"]}
        onClick={handleRefresh}
        aria-label="Refresh cat images"
      >
        Refresh cats
      </button>

      {error && (
        <div className={styles["error-message"]}>
          <p>{error}</p>
          <button onClick={handleRefresh}>Try again</button>
        </div>
      )}

      {loading ? (
        <p className={styles.loader}>Loading...</p>
      ) : (
        <div className={styles.gallery}>
          {cats.slice(0, 6).map((cat) => (
            <img
              key={cat.id}
              src={cat.url}
              alt={`Random cat ${cat.id}`}
              className={styles["cat-img"]}
              onClick={() => onImageClick(cat.url)}
              tabIndex={0}
              loading="lazy"
            />
          ))}
        </div>
      )}
    </div>
  );
}
