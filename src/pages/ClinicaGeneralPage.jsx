import "../pages/consultorios.css";
import { doctores } from "../pages/data/doctores";

export default function ClinicaGeneralPage() {

  const clinicos = doctores.filter(
    (doc) => doc.especialidad === "clinica"
  );

  return (
    <div className="especialidad-page">

      <div className="text-center mb-5">
        <h1 className="especialidad-title">Clínica General</h1>
        <p className="especialidad-subtitle">Sanatorio Mayo S.A.</p>
      </div>

      <div className="especialidad-container">
        <h2 className="section-title">Especialistas</h2>
        <hr />

        <div className="cards-grid">
          {clinicos.map((doc) => (
            <div className="doctor-card" key={doc.id}>
              <div className="doctor-avatar" />

              <h3>{doc.nombre}</h3>

              <p
                className="doctor-horario"
                style={{ whiteSpace: "pre-line" }}
              >
                {doc.horario}
              </p>

              {doc.telefono && (
                <p className="doctor-phone">📞 {doc.telefono}</p>
              )}

              {doc.observacion && (
                <p className="doctor-observacion">
                  {doc.observacion}
                </p>
              )}

              <p className="sin-turno">
                Turnos por orden de llegada
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

