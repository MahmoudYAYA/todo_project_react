type DeadlineAlertProps = {
  count: number;
};

export const DeadlineAlert = ({ count }: DeadlineAlertProps) => {
  if (count === 0) return null;

  return (
    <div
      role="alert"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: "#ffff80",
        border: "2px solid #ff8000",
        padding: "4px 8px",
        fontSize: 11,
        fontWeight: "bold",
        boxShadow: "inset -1px -1px 0 #804000, inset 1px 1px 0 #ffffc0",
      }}
    >
      <span style={{ fontSize: 14 }}>⚠</span>
      <span>
        {count} tâche{count > 1 ? "s" : ""} avec deadline proche !
      </span>
    </div>
  );
};
