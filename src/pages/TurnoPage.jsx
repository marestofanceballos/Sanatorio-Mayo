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
const [fechaSeleccionada, setFechaSeleccionada] = useState("");
const [mensajeExito, setMensajeExito] = useState("");
const [enviando, setEnviando] = useState(false);
const [horariosOcupados, setHorariosOcupados] = useState([]);

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

const handleFecha = async (e) => {

  const fechaTexto = e.target.value;

  const partes = fechaTexto.split("-");
  const fecha = new Date(partes[0], partes[1] - 1, partes[2]);

  const dia = fecha.getDay();

  if (doctor.diasAtencion && !doctor.diasAtencion.includes(dia)) {
    setMensajeExito("❌ Este doctor no atiende ese día");
    setFechaSeleccionada("");
    return;
  }

  setMensajeExito("");
  setFechaSeleccionada(fechaTexto);

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

if (!horarioSeleccionado) {
  setMensajeExito("⚠️ Seleccioná un horario");
  return;
}

setEnviando(true);

const turno = {
  doctorId: doctor.mongoId,
  doctorNombre: doctor.nombre,
  fecha: fechaSeleccionada,
  horario: horarioSeleccionado,
  pacienteNombre: formData.pacienteNombre,
  dni: formData.dni,
  email: formData.email,
  telefono: formData.telefono
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
    setFechaSeleccionada("");

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

  <h2>Elegir fecha</h2>

  <input
    type="date"
    className="fecha-input"
    min={new Date().toISOString().split("T")[0]}
    value={fechaSeleccionada}
    onChange={handleFecha}
  />

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

  {horarioSeleccionado && (

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
