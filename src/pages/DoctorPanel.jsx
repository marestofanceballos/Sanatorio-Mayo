import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import "../pages/doctorPanel.css";

export default function DoctorPanel() {

  const [turnos, setTurnos] = useState([]);
  const [motivo, setMotivo] = useState("");
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);

  const doctorId = localStorage.getItem("doctorId");
  const doctorNombre = localStorage.getItem("doctorNombre");

  const navigate = useNavigate();

  const cargarTurnos = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/turnos/doctor/${doctorId}`);
      const data = await res.json();

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

  // ✅ CONFIRMAR + WHATSAPP
  const confirmarTurno = async (turno) => {

    await fetch(`http://localhost:4000/api/turnos/confirmar/${turno._id}`, {
      method: "PUT"
    });

    const mensaje = `Hola ${turno.pacienteNombre}, tu turno fue confirmado para el día ${new Date(turno.fecha).toLocaleDateString()} a las ${turno.horario}. 📍 Sanatorio Mayo`;

    const url = `https://wa.me/${turno.telefono}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");

    // 🔥 refresca lista
    cargarTurnos();
  };

  // ❌ RECHAZAR
  const rechazarTurno = async () => {

    await fetch(`http://localhost:4000/api/turnos/rechazar/${turnoSeleccionado}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ motivo })
    });

    setMotivo("");
    setTurnoSeleccionado(null);

    cargarTurnos();
  };

  // 🗑️ ELIMINAR
  const eliminarTurno = async (id) => {
    await fetch(`http://localhost:4000/api/turnos/${id}`, {
      method: "DELETE"
    });

    cargarTurnos();
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
          <p>No hay turnos asignados</p>
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

                  <p><strong>Estado:</strong> {turno.estado}</p>

                  {turno.estado === "rechazado" && (
                    <p><strong>Motivo:</strong> {turno.motivoRechazo}</p>
                  )}

                </div>

                {/* 🔥 BOTONES */}
                <div className="acciones">

                  {turno.estado === "pendiente" && (
                    <>
                      <button
                        className="btn-confirmar"
                        onClick={() => confirmarTurno(turno)}
                      >
                        Confirmar turno
                      </button>

                      <button
                        className="btn-rechazar"
                        onClick={() => setTurnoSeleccionado(turno._id)}
                      >
                        Rechazar turno
                      </button>
                    </>
                  )}

                  {/* 🗑️ SIEMPRE visible */}
                  <button
                    className="btn-delete"
                    onClick={() => eliminarTurno(turno._id)}
                  >
                    <FaTrash />
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

        {/* 🔥 CAJA RECHAZO */}
        {turnoSeleccionado && (
          <div className="rechazo-box">

            <textarea
              placeholder="Escribí el motivo del rechazo..."
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
            />

            <button onClick={rechazarTurno}>
              Confirmar rechazo
            </button>

          </div>
        )}

      </div>

    </div>
  );
}