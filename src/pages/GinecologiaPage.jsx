import "../pages/consultorios.css";
import { doctores } from "../pages/data/doctores";
import { Link } from "react-router-dom";

export default function GinecologiaPage() {

  const ginecologas = doctores.filter(
    (doc) => doc.especialidad === "ginecologia"
  );

  return (
    <div className="especialidad-page">

      <div className="text-center mb-5">
        <h1 className="especialidad-title">Ginecología</h1>
        <p className="especialidad-subtitle">Sanatorio Mayo S.A.</p>
      </div>

      <div className="especialidad-container">
        <h2 className="section-title">Especialistas</h2>
        <hr />

        <div className="cards-grid">
          {ginecologas.map((doc) => (
            <div className="doctor-card" key={doc.id}>
              <div className="doctor-avatar" />

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
