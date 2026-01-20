import { useParams } from "react-router-dom";
import { doctores } from "../pages/data/doctores";
import { useState } from "react";
import "../styles/turnos.css";

export default function TurnoPage() {
  const { id } = useParams();

  const doctor = doctores.find(
    (doc) => doc.id === Number(id)
  );

  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);

  if (!doctor) {
    return <h2>Doctor no encontrado</h2>;
  }

  return (
    <div className="especialidad-page">

      <h1 className="especialidad-title">
        Turno con {doctor.nombre}
      </h1>

      <h2>Horarios disponibles</h2>

      <div className="horarios-grid">
        {doctor.horarios.map((hora) => (
          <button
            key={hora}
            className="horario-btn"
            onClick={() => setHorarioSeleccionado(hora)}
          >
            {hora}
          </button>
        ))}
      </div>

      {horarioSeleccionado && (
        <>
          <h2>Datos del paciente</h2>

          <form className="turno-form">
            <input placeholder="Nombre y apellido" required />
            <input placeholder="DNI" required />
            <input type="email" placeholder="Email" required />
            <input placeholder="Teléfono" required />

            <button type="submit">
              Confirmar turno ({horarioSeleccionado})
            </button>
          </form>
        </>
      )}

    </div>
  );
}
