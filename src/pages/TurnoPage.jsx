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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const turno = {
      doctorId: doctor.id,
      doctorNombre: doctor.nombre,
      horario: horarioSeleccionado,
      ...formData
    };

    try {
      const res = await fetch("http://localhost:4000/api/turnos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(turno),
      });

      if (res.ok) {
        // 👉 ABRIR WHATSAPP
        const whatsappNumber = doctor.whatsapp || "5491112345678";

        const mensaje = `Hola, solicité un turno:
Doctor: ${doctor.nombre}
Horario: ${horarioSeleccionado}
Paciente: ${formData.pacienteNombre}
DNI: ${formData.dni}
Teléfono: ${formData.telefono}`;

        const link = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensaje)}`;

        window.open(link, "_blank");
      } else {
        alert("Error al crear el turno");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión");
    }
  };

  return (
    <div className="turno-page">
      <h1 className="turno-title">
        Turno con {doctor.nombre}
      </h1>

      <h2>Horarios disponibles</h2>

      <div className="horarios-grid">
        {doctor.horarios.map((hora) => (
          <button
            key={hora}
            className={`horario-btn ${horarioSeleccionado === hora ? "activo" : ""}`}
            onClick={() => setHorarioSeleccionado(hora)}
          >
            {hora}
          </button>
        ))}
      </div>

      {horarioSeleccionado && (
        <>
          <h2>Datos del paciente</h2>

          <form className="turno-form" onSubmit={handleSubmit}>
            <input
              name="pacienteNombre"
              placeholder="Nombre y apellido"
              onChange={handleChange}
              required
            />

            <input
              name="dni"
              placeholder="DNI"
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />

            <input
              name="telefono"
              placeholder="Teléfono"
              onChange={handleChange}
              required
            />

            <button type="submit">
              Confirmar turno ({horarioSeleccionado})
            </button>
          </form>
        </>
      )}
    </div>
  );
}

