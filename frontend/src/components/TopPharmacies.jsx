import { pharmacies } from "../assets/assets_frontend/pharmacies.js";
import { Link } from "react-router-dom";

export const TopPharmacies = () => {
  return (
    <section className="pharmacies-simple">
      <div className="container" style={{marginTop:"25px"}}>
        <header className="section-header" style={{marginBottom:"30px"}}>
          <div className="badge">🏥 Verified Pharmacies</div>
          <h2>Top Pharmacies in Srinagar</h2>
          <p style={{fontSize:"23px"}}>Find nearby pharmacies open 24/7</p>
        </header>

        <div className="grid">
          {pharmacies.slice(0, 6).map((pharmacy) => (
            <Link 
              key={pharmacy.id}
              to={`/pharmacies/${pharmacy.id}`}
              className="card"
            >
              {/* <div className="card-top">
                <div className="icon">💊</div>
                <div className="rating">
                  ⭐ 4.8 (127)
                </div>
              </div> */}
              
              <h3>{pharmacy.name}</h3>
              <div className="location">
                📍 {pharmacy.area}
              </div>
              
              <div className="status">
                <span className="open">Open Now</span>
                <span>{pharmacy.timing}</span>
              </div>
              
              <div className="details">
                <span>📞 {pharmacy.contact}</span>
                {/* <span className="distance">2.1 km</span> */}
              </div>
              
              <button className="btn">
                Visit Pharmacy →
              </button>
            </Link>
          ))}
        </div>

        {/* <footer className="stats">
          <div>250+ Pharmacies</div>
          <div>24/7 Open</div>
          <div>100% Verified</div>
        </footer> */}
      </div>
    </section>
  );
};
export default TopPharmacies;