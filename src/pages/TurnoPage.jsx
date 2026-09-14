import { useParams } from "react-router-dom";
import { doctores } from "../pages/data/doctores";
import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/turnos.css";

registerLocale("es", es);

const ABREVIATURAS_DIA = {
  lunes: "LU",
  martes: "MA",
  "miércoles": "MI",
  jueves: "JU",
  viernes: "VI",
  "sábado": "SA",
  domingo: "DO",
};

const formatDiaSemana = (nombreCompleto) =>
  ABREVIATURAS_DIA[nombreCompleto.toLowerCase()] ?? nombreCompleto.slice(0, 2).toUpperCase();

export default function TurnoPage() {

const { id } = useParams();

const doctor = doctores.find(
(doc) => doc.id === Number(id)
);

const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
const [mensajeExito, setMensajeExito] = useState("");
const [enviando, setEnviando] = useState(false);
const [horariosOcupados, setHorariosOcupados] = useState([]);
const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState(null);

const [formData, setFormData] = useState({
pacienteNombre: "",
dni: "",
email: "",
telefono: ""
});

if (!doctor) {
return <h2>Doctor no encontrado</h2>;
}

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value
});
};

const formatFechaISO = (fecha) => {
  const y = fecha.getFullYear();
  const m = String(fecha.getMonth() + 1).padStart(2, "0");
  const d = String(fecha.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const diaHabilitado = (fecha) =>
  !doctor.diasAtencion || doctor.diasAtencion.includes(fecha.getDay());

const handleFecha = async (fecha) => {

  if (!fecha) {
    setFechaSeleccionada(null);
    return;
  }

  setMensajeExito("");
  setHorarioSeleccionado(null);
  setFechaSeleccionada(fecha);

  const fechaTexto = formatFechaISO(fecha);

  // CONSULTAR TURNOS OCUPADOS
  try {

    const res = await fetch(
      `http://localhost:4000/api/turnos/fecha?doctorId=${doctor.mongoId}&fecha=${fechaTexto}`
    );

    const data = await res.json();

    const horarios = data.map(t => t.horario);

    setHorariosOcupados(horarios);

  } catch (error) {

    console.log("Error cargando turnos");

  }

};

const handleSubmit = async (e) => {
e.preventDefault();


if (!fechaSeleccionada) {
  setMensajeExito("⚠️ Seleccioná una fecha válida");
  return;
}

if (!doctor.sinTurno && !horarioSeleccionado) {
  setMensajeExito("⚠️ Seleccioná un horario");
  return;
}

setEnviando(true);

const turno = {
  doctorId: doctor.mongoId,
  doctorNombre: doctor.nombre,
  fecha: formatFechaISO(fechaSeleccionada),
  horario: doctor.sinTurno ? "Por orden de llegada" : horarioSeleccionado,
  pacienteNombre: formData.pacienteNombre,
  dni: formData.dni,
  email: formData.email,
  telefono: formData.telefono,
  ...(doctor.especialidades && { especialidad: especialidadSeleccionada })
};

try {

  const res = await fetch("http://localhost:4000/api/turnos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(turno)
  });

  if (res.ok) {

    setMensajeExito("✅ Turno asignado correctamente");

    setFormData({
      pacienteNombre: "",
      dni: "",
      email: "",
      telefono: ""
    });

    setHorarioSeleccionado(null);
    setFechaSeleccionada(null);

    if (doctor.especialidades) {
      setEspecialidadSeleccionada(null);
    }

  } else {

    setMensajeExito("❌ Error al crear el turno");

  }

} catch (error) {

  setMensajeExito("❌ Error de conexión");

}

setEnviando(false);


};

return (


<div className="turno-page">

  <h1 className="turno-title">
    Turno con {doctor.nombre}
  </h1>

  {doctor.avisoHorario && (
    <p className="mensaje-exito">
      {doctor.avisoHorario}
    </p>
  )}

  {doctor.especialidades && (

    <>
      <h2>Elegir especialidad</h2>

      <div className="horarios-grid">
        {doctor.especialidades.map((esp) => (
          <button
            key={esp}
            type="button"
            className={`horario-btn ${especialidadSeleccionada === esp ? "activo" : ""}`}
            onClick={() => setEspecialidadSeleccionada(esp)}
          >
            {esp}
          </button>
        ))}
      </div>
    </>

  )}

  {(!doctor.especialidades || especialidadSeleccionada) && (

    <>
      <h2>Elegir fecha</h2>

      <DatePicker
        selected={fechaSeleccionada}
        onChange={handleFecha}
        filterDate={diaHabilitado}
        minDate={new Date()}
        locale="es"
        formatWeekDay={formatDiaSemana}
        dateFormat="dd/MM/yyyy"
        placeholderText="Seleccioná una fecha"
        className="fecha-input"
        calendarClassName="turno-calendar"
        wrapperClassName="fecha-input-wrapper"
        popperPlacement="bottom"
        autoComplete="off"
      />

      {!doctor.sinTurno && (
        <>
          <h2>Horarios disponibles</h2>

          <div className="horarios-grid">
            {doctor.horarios.map((hora) => {

          const ocupado = horariosOcupados.includes(hora);

          return (

            <button
              key={hora}
              type="button"
              disabled={ocupado}
              className={`horario-btn
                ${horarioSeleccionado === hora ? "activo" : ""}
                ${ocupado ? "ocupado" : ""}`}
              onClick={() => setHorarioSeleccionado(hora)}
            >

              {ocupado ? "Reservado" : hora}

            </button>

          );

        })}
          </div>
        </>
      )}
    </>

  )}

  {(horarioSeleccionado || (doctor.sinTurno && fechaSeleccionada)) && (

    <>
      <h2>Datos del paciente</h2>

      <form className="turno-form" onSubmit={handleSubmit}>

        <input
          name="pacienteNombre"
          placeholder="Nombre y apellido"
          value={formData.pacienteNombre}
          onChange={handleChange}
          required
        />

        <input
          name="dni"
          placeholder="DNI"
          value={formData.dni}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={enviando}>
          {enviando
            ? "Asignando turno..."
            : doctor.sinTurno
              ? "Confirmar turno"
              : `Confirmar turno (${horarioSeleccionado})`}
        </button>

      </form>

    </>

  )}

  {mensajeExito && (
    <div className="mensaje-exito">
      {mensajeExito}
    </div>
  )}

</div>


);

}
