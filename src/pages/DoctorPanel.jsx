import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import "../pages/doctorPanel.css";

export default function DoctorPanel() {

  const [turnos, setTurnos] = useState([]);

  const doctorId = localStorage.getItem("doctorId");
  const doctorNombre = localStorage.getItem("doctorNombre");

  const navigate = useNavigate();

  const cargarTurnos = async () => {
    try {

      const res = await fetch(`http://localhost:4000/api/turnos/doctor/${doctorId}`);
      const data = await res.json();

      // ordenar por fecha y horario
const ordenados = data.sort((a, b) => {
  if (a.fecha === b.fecha) {
    return a.horario.localeCompare(b.horario);
  }
  return new Date(a.fecha) - new Date(b.fecha);
});

      setTurnos(ordenados);

    } catch (error) {
      console.log("Error al cargar turnos");
    }
  };

  const cancelarTurno = async (id) => {

    try {

      await fetch(`http://localhost:4000/api/turnos/${id}`, {
        method: "DELETE"
      });

      cargarTurnos();

    } catch (error) {
      console.log("Error al cancelar turno");
    }

  };

  const cerrarSesion = () => {
    localStorage.removeItem("doctorId");
    localStorage.removeItem("doctorNombre");
    navigate("/");
  };

  useEffect(() => {
    if (doctorId) {
      cargarTurnos();
    }
  }, [doctorId]);

  return (
    <div className="doctor-panel-wrapper">

      <div className="doctor-panel-container">

        <h1 className="doctor-panel-title">
          Agenda Profesional
        </h1>

        <h2 className="doctor-panel-subtitle">
          Dr/a Lic. {doctorNombre}
        </h2>

        <div className="doctor-panel-buttons">

          <button onClick={() => navigate("/")} className="btn-volver">
            Volver al inicio
          </button>

          <button onClick={cerrarSesion} className="btn-logout">
            Cerrar sesión
          </button>

        </div>

        {turnos.length === 0 ? (
          <p className="doctor-panel-empty">
            No hay turnos asignados
          </p>
        ) : (

          <div className="doctor-turnos-list">

            {turnos.map(turno => (

              <div key={turno._id} className="turno-item">

                <div className="turno-fecha">
                  {new Date(turno.fecha).toLocaleDateString()}
               </div>

                <div className="turno-hora">
                  {turno.horario}
               </div>

                <div className="turno-info">

                  <p><strong>Paciente:</strong> {turno.pacienteNombre}</p>
                  <p><strong>DNI:</strong> {turno.dni}</p>
                  <p><strong>Email:</strong> {turno.email}</p>
                  <p><strong>Teléfono:</strong> {turno.telefono}</p>

                </div>

                <button
                   className="btn-cancelar"
                   onClick={() => cancelarTurno(turno._id)}
                >
                   <FaTrash />
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}