import { useParams, Link } from "react-router-dom";
import { doctores } from "./data/doctores";
import "../styles/doctores.css";

export default function DoctoresPage() {

  const { especialidad } = useParams();

  const filtrados = doctores.filter(
    (doc) => doc.especialidad === especialidad
  );

  return (
    <div className="doctores-wrapper">

      <h1 className="doctores-title">
        Equipo Médico — {especialidad}
      </h1>

      <p className="doctores-subtitle">
        Seleccione el profesional para continuar con la solicitud de turno
      </p>

      <div className="doctores-grid">

        {filtrados.map((doc) => (

          <div key={doc.id} className="doctor-card">

            <div className="doctor-left">

              <img
                src={doc.imagen || "https://i.postimg.cc/7Zf1r8Cv/doctor-default.png"}
                alt={doc.nombre}
                className="doctor-img"
              />

              <div className="doctor-info">
                <h3>{doc.nombre}</h3>
                <p className="doctor-especialidad">
                  {doc.especialidad}
                </p>

                <div className="doctor-badges">
                  <span className="badge-medico">Consultorio</span>
                  <span className="badge-medico">Turnos Online</span>
                </div>

              </div>

            </div>

            <Link
              to={`/turno/${doc.id}`}
              className="doctor-btn"
            >
              Solicitar Turno
            </Link>

          </div>

        ))}

      </div>

    </div>
  );
}