import { useParams, Link } from "react-router-dom";
import { doctores } from "./data/doctores";
import "../styles/doctores.css";

// Avatar genérico local (evita depender de un link externo que puede caerse)
const DOCTOR_DEFAULT_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23e7f5f2'/%3E%3Ccircle cx='50' cy='38' r='18' fill='%230a7c66'/%3E%3Cpath d='M20 92c0-19 13.4-33 30-33s30 14 30 33' fill='%230a7c66'/%3E%3C/svg%3E";

// Primera letra en mayúscula (sin tocar el resto del texto)
const capitalizar = (texto = "") =>
  texto.charAt(0).toUpperCase() + texto.slice(1);

export default function DoctoresPage() {

  const { especialidad } = useParams();

  const filtrados = doctores.filter(
    (doc) => doc.especialidad === especialidad
  );

  return (
    <div className="doctores-wrapper">

      <h1 className="doctores-title">
        Equipo Médico — {capitalizar(especialidad)}
      </h1>

      <p className="doctores-subtitle">
        Seleccione el profesional para continuar con la solicitud de turno
      </p>

      <div className="doctores-grid">

        {filtrados.map((doc) => (

          <div key={doc.id} className="doctor-card">

            <div className="doctor-left">

              <img
                src={doc.foto || doc.imagen || DOCTOR_DEFAULT_IMG}
                alt={doc.nombre}
                className="doctor-img"
                onError={(e) => {
                  e.currentTarget.src = DOCTOR_DEFAULT_IMG;
                }}
              />

              <div className="doctor-info">
                <h3>{doc.nombre}</h3>
                <p className="doctor-especialidad">
                  {doc.especialidades
                    ? doc.especialidades.join(" · ")
                    : capitalizar(doc.especialidad)}
                </p>

                <div className="doctor-badges">
                  <span className="badge-medico">Consultorio</span>
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