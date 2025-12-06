// TopPharmacies.jsx
import { pharmacies } from "../assets/assets_frontend/pharmacies.js";
import { Link } from "react-router-dom";

export const TopPharmacies = () => {
  return (
    <section className="pharmacies-section">
      <h2 className="section-title">Top Pharmacies in Srinagar</h2>
      <p className="section-subtitle">
        Easily find nearby pharmacies for medicines and healthcare essentials.
      </p>

      <div className="pharmacies-grid">
        {pharmacies.map((p) => (
          <article key={p.id} className="pharmacy-card">
            {/* pura card clickable: */}
            <Link
              to={`/pharmacies/${p.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h3 className="pharmacy-name">{p.name}</h3>
              <span className="pharmacy-location">{p.area}</span>

              <div className="pharmacy-field">
                <span className="label">Address</span>
                <p className="value">{p.address}</p>
              </div>

              <div className="pharmacy-field">
                <span className="label">Timings</span>
                <p className="value">{p.timing}</p>
              </div>

              <div className="pharmacy-field">
                <span className="label">Contact</span>
                <p className="value">{p.contact}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TopPharmacies;
