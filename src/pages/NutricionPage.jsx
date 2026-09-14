import "../pages/consultorios.css";
import { doctores } from "../pages/data/doctores";
import { Link } from "react-router-dom";

export default function NutricionPage() {

  const nutricionistas = doctores.filter(
    (doc) => doc.especialidad === "nutricion"
  );

  return (
    <div className="especialidad-page">

      <div className="text-center mb-5">
        <h1 className="especialidad-title">Nutrición</h1>
        <p className="especialidad-subtitle">Sanatorio Mayo S.A.</p>
      </div>

      <div className="especialidad-container">
        <h2 className="section-title">Especialistas</h2>
        <hr />

        <div className="cards-grid">
          {nutricionistas.map((doc) => (
            <div className="doctor-card" key={doc.id}>
              <div className="doctor-avatar">
                {doc.foto && (
                  <img
                    src={doc.foto}
                    alt={doc.nombre}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                )}
              </div>

              <h3>{doc.nombre}</h3>

              {doc.telefono && (
                <p className="doctor-phone">📞 {doc.telefono}</p>
              )}

              {doc.observacion && (
                <p className="doctor-observacion">
                  {doc.observacion}
                </p>
              )}

              <Link
                to={`/turno/${doc.id}`}
                className="btn-turno"
              >
                Solicitar turno
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
