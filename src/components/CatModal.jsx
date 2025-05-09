import styles from "../styles/CatModal.module.scss";

export default function CatModal({ imageUrl, onClose }) {
  if (!imageUrl) return null;

  return (
    <div className={styles["modal-backdrop"]} onClick={onClose}>
      <div
        className={styles["modal-content"]}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={imageUrl} alt="cat large" className={styles["modal-img"]} />
        <button
          className={styles["close-btn"]}
          onClick={onClose}
          aria-label="Close image"
        >
          ×
        </button>
      </div>
    </div>
  );
}
