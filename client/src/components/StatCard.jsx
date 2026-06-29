import "./StatCard.css";

function StatCard({ title, value, color, icon }) {
  return (
    <div className="stat-card">

      <div className="stat-top">

        <div
          className="stat-icon"
          style={{ background: `${color}20`, color: color }}
        >
          {icon}
        </div>

        <span className="stat-percent">
          {value > 0 ? `${value} Jobs` : "0 Jobs"}
        </span>

      </div>

      <h1>{String(value).padStart(2, "0")}</h1>

      <p>{title}</p>

      <div
        className="stat-line"
        style={{ background: color }}
      ></div>

    </div>
  );
}

export default StatCard;