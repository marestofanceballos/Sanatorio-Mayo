import "../pages/consultorios.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PsicologiaPage() {

  const [doctores, setDoctores] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/doctor-auth/doctors")
      .then(res => res.json())
      .then(data => {
        console.log("DOCTORES:", data); // 👈 para ver si llegan
        setDoctores(data);
      })
      .catch(err => console.error(err));
  }, []);

  const psicologos = doctores.filter(
    doc => doc.especialidad === "psicologia"
  );

  return (
    <div className="especialidad-page">

      <div className="text-center mb-5">
        <h1 className="especialidad-title">Psicología</h1>
        <p className="especialidad-subtitle">Sanatorio Mayo S.A.</p>
      </div>

      <div className="especialidad-container">
        <h2 className="section-title">Especialistas</h2>
        <hr />

        <div className="cards-grid">

          {psicologos.length === 0 && (
            <p>No hay psicólogos cargados</p>
          )}

          {psicologos.map((doc) => (
            <div className="doctor-card" key={doc._id}>

              <div className="doctor-avatar" />

              <h3>{doc.nombre}</h3>

              <p>Horarios:</p>
              {doc.horarios?.map((hora, i) => (
                <p key={i}>{hora}</p>
              ))}

              <Link
                to={`/turno/${doc._id}`}
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

