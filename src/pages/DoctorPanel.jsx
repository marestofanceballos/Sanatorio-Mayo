import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaCalendarAlt } from "react-icons/fa";
import "../pages/doctorPanel.css";

export default function DoctorPanel() {

  const [turnos, setTurnos] = useState([]);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);

  const [nuevaFecha, setNuevaFecha] = useState("");
  const [nuevoHorario, setNuevoHorario] = useState("");

  // --- filtros ---
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos"); // todos | proximos | pasados
  const [orden, setOrden] = useState("fecha-asc"); // fecha-asc | fecha-desc

  const doctorId = localStorage.getItem("doctorId");
  const doctorNombre = localStorage.getItem("doctorNombre");

  const navigate = useNavigate();

  const cargarTurnos = async () => {
    try {

      const res = await fetch(
        `http://localhost:4000/api/turnos/doctor/${doctorId}`
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

  const eliminarTurno = async (id) => {

    const confirmar = window.confirm(
      "¿Desea eliminar este turno?"
    );

    if (!confirmar) return;

    await fetch(
      `http://localhost:4000/api/turnos/${id}`,
      {
        method: "DELETE"
      }
    );

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
      `http://localhost:4000/api/turnos/reprogramar/${turnoSeleccionado._id}`,
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

  // --- turnos filtrados/ordenados, se recalcula solo cuando cambia algo relevante ---
  const turnosFiltrados = useMemo(() => {

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    let resultado = turnos.filter((turno) => {

      // filtro por texto (paciente, DNI o teléfono)
      const texto = busqueda.trim().toLowerCase();
      const coincideTexto =
        texto === "" ||
        turno.pacienteNombre?.toLowerCase().includes(texto) ||
        turno.dni?.toLowerCase().includes(texto) ||
        turno.telefono?.toLowerCase().includes(texto);

      // filtro por estado temporal (próximo / pasado)
      const fechaTurno = new Date(turno.fecha);
      const esProximo = fechaTurno >= hoy;

      const coincideEstado =
        filtroEstado === "todos" ||
        (filtroEstado === "proximos" && esProximo) ||
        (filtroEstado === "pasados" && !esProximo);

      return coincideTexto && coincideEstado;
    });

    resultado.sort((a, b) => {
      const diff = new Date(a.fecha) - new Date(b.fecha);
      return orden === "fecha-asc" ? diff : -diff;
    });

    return resultado;

  }, [turnos, busqueda, filtroEstado, orden]);

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

        <div className="doctor-panel-filtros">

          <input
            type="text"
            className="filtro-input"
            placeholder="Buscar por paciente, DNI o teléfono..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <select
            className="filtro-select"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="todos">Todos los turnos</option>
            <option value="proximos">Próximos</option>
            <option value="pasados">Pasados</option>
          </select>

          <select
            className="filtro-select"
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
          >
            <option value="fecha-asc">Fecha: más próxima primero</option>
            <option value="fecha-desc">Fecha: más lejana primero</option>
          </select>

        </div>

        {turnos.length === 0 ? (

          <p style={{ textAlign: "center" }}>
            No hay turnos asignados.
          </p>

        ) : turnosFiltrados.length === 0 ? (

          <p style={{ textAlign: "center" }}>
            Ningún turno coincide con la búsqueda.
          </p>

        ) : (

          <div className="doctor-turnos-list">

            {turnosFiltrados.map((turno) => (

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
                      eliminarTurno(turno._id)
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

    </div>
  );
}