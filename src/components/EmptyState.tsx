export const EmptyState = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
        color: "#808080",
        fontSize: 11,
        gap: "8px",
      }}
    >
      {/* Classic Windows "empty folder" icon using text art */}
      <div style={{ fontSize: 40, lineHeight: 1 }}>🗂️</div>
      <p style={{ margin: 0, fontStyle: "italic" }}>Aucune tâche pour ce filtre</p>
      <p style={{ margin: 0, fontSize: 10, color: "#a0a0a0" }}>
        Utilisez le formulaire ci-dessus pour ajouter une tâche.
      </p>
    </div>
  );
};
