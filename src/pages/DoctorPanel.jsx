import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaCalendarAlt } from "react-icons/fa";
import { API_URL } from "../config/api";
import "../pages/doctorPanel.css";

export default function DoctorPanel() {

  const [turnos, setTurnos] = useState([]);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);

  const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false);
  const [turnoAEliminar, setTurnoAEliminar] = useState(null);

  const [nuevaFecha, setNuevaFecha] = useState("");
  const [nuevoHorario, setNuevoHorario] = useState("");

  const doctorId = localStorage.getItem("doctorId");
  const doctorNombre = localStorage.getItem("doctorNombre");

  const navigate = useNavigate();

  const cargarTurnos = async () => {
    try {

      const res = await fetch(
        `${API_URL}/api/turnos/doctor/${doctorId}`
      );

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

  const pedirEliminarTurno = (turno) => {
    setTurnoAEliminar(turno);
    setModalEliminarAbierto(true);
  };

  const cerrarModalEliminar = () => {
    setModalEliminarAbierto(false);
    setTurnoAEliminar(null);
  };

  const confirmarEliminarTurno = async () => {

    if (!turnoAEliminar) return;

    await fetch(
      `${API_URL}/api/turnos/${turnoAEliminar._id}`,
      {
        method: "DELETE"
      }
    );

    cerrarModalEliminar();
    cargarTurnos();
  };

  const reprogramarTurno = (turno) => {

  setTurnoSeleccionado(turno);

  setNuevaFecha(turno.fecha);

  setNuevoHorario(turno.horario);

  setModalAbierto(true);

};

const guardarReprogramacion = async () => {

  try {

    const res = await fetch(
      `${API_URL}/api/turnos/reprogramar/${turnoSeleccionado._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fecha: nuevaFecha,
          horario: nuevoHorario,
          doctorId: doctorId
        })
      }
    );


    const data = await res.json();


    if (!res.ok) {
      alert(data.message);
      return;
    }


    // actualizar lista de turnos
    cargarTurnos();


    // cerrar modal
    setModalAbierto(false);


    // abrir WhatsApp
    const mensaje = `
Hola ${turnoSeleccionado.pacienteNombre}.

Su turno fue reprogramado.

Nueva fecha: ${nuevaFecha}
Nuevo horario: ${nuevoHorario}

Saludos.
`;


    const whatsapp =
      `https://wa.me/${turnoSeleccionado.telefono}?text=${encodeURIComponent(mensaje)}`;


    window.open(whatsapp, "_blank");


  } catch (error) {

    console.log("Error al reprogramar:", error);

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

  useEffect(() => {
    if (!modalEliminarAbierto) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        cerrarModalEliminar();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [modalEliminarAbierto]);

  return (
    <div className="doctor-panel-wrapper">

      <div className="doctor-panel-container">

        <h1 className="doctor-panel-title">
          Agenda Profesional
        </h1>

        <h2 className="doctor-panel-subtitle">
          Dr/a {doctorNombre}
        </h2>

        <div className="doctor-panel-buttons">

          <button
            className="btn-volver"
            onClick={() => navigate("/")}
          >
            Volver al inicio
          </button>

          <button
            className="btn-logout"
            onClick={cerrarSesion}
          >
            Cerrar sesión
          </button>

        </div>

        {turnos.length === 0 ? (

          <p style={{ textAlign: "center" }}>
            No hay turnos asignados.
          </p>

        ) : (

          <div className="doctor-turnos-list">

            {turnos.map((turno) => (

              <div
                key={turno._id}
                className="turno-item"
              >

                <div className="turno-fecha">
                  {new Date(turno.fecha).toLocaleDateString()}
                </div>

                <div className="turno-hora">
                  {turno.horario}
                </div>

                <div className="turno-info">

                  {turno.especialidad && (
                    <p>
                      <strong>Especialidad:</strong>{" "}
                      {turno.especialidad}
                    </p>
                  )}

                  <p>
                    <strong>Paciente:</strong>{" "}
                    {turno.pacienteNombre}
                  </p>

                  <p>
                    <strong>DNI:</strong>{" "}
                    {turno.dni}
                  </p>

                  <p>
                    <strong>Email:</strong>{" "}
                    {turno.email}
                  </p>

                  <p>
                    <strong>Teléfono:</strong>{" "}
                    {turno.telefono}
                  </p>

                </div>

                <div className="acciones">

                  <button
                    className="btn-reprogramar"
                    onClick={() =>
                      reprogramarTurno(turno)
                    }
                  >
                    <FaCalendarAlt />
                    Reprogramar
                  </button>

                  <button
                    className="btn-delete"
                    onClick={() =>
                      pedirEliminarTurno(turno)
                    }
                  >
                    <FaTrash />
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
      {modalAbierto && (

<div className="modal-overlay">

<div className="modal-reprogramar">

<h2>Reprogramar turno</h2>

<p>

<strong>Paciente:</strong>

{turnoSeleccionado?.pacienteNombre}

</p>

<input
type="date"
value={nuevaFecha}
onChange={(e)=>setNuevaFecha(e.target.value)}
/>

<input
type="time"
value={nuevoHorario}
onChange={(e)=>setNuevoHorario(e.target.value)}
/>

<div className="modal-botones">

<button
className="btn-cancelar"
onClick={()=>setModalAbierto(false)}
>

Cancelar

</button>

<button
className="btn-guardar"
onClick={guardarReprogramacion}
>

Guardar cambios

</button>

</div>

</div>

</div>

)}

      {modalEliminarAbierto && (

        <div
          className="modal-overlay"
          onClick={cerrarModalEliminar}
        >

          <div
            className="modal-eliminar"
            onClick={(e) => e.stopPropagation()}
          >

            <h2>Eliminar turno</h2>

            <p>¿Seguro que querés eliminar este turno?</p>

            <div className="modal-eliminar-datos">
              <p>
                <strong>Paciente:</strong>{" "}
                {turnoAEliminar?.pacienteNombre}
              </p>
              <p>
                <strong>Fecha:</strong>{" "}
                {turnoAEliminar &&
                  new Date(turnoAEliminar.fecha).toLocaleDateString()}
              </p>
              <p>
                <strong>Horario:</strong>{" "}
                {turnoAEliminar?.horario}
              </p>
            </div>

            <div className="modal-botones">

              <button
                className="btn-cancelar"
                onClick={cerrarModalEliminar}
              >
                Cancelar
              </button>

              <button
                className="btn-eliminar-confirm"
                onClick={confirmarEliminarTurno}
              >
                Eliminar
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}