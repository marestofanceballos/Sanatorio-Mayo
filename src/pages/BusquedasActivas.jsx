

const busquedas = [
  {
    puesto: "Médico Clínico",
    area: "Clínica General",
    descripcion:
      "Se busca médico clínico para atención en consultorio. Disponibilidad horaria a convenir.",
    modalidad: "Presencial",
  },
  {
    puesto: "Enfermero/a",
    area: "Internación",
    descripcion:
      "Se requiere enfermero/a con matrícula vigente. Experiencia previa valorada.",
    modalidad: "Turnos rotativos",
  },
  {
    puesto: "Administrativo/a",
    area: "Admisión",
    descripcion:
      "Tareas administrativas, atención al público y manejo de sistemas.",
    modalidad: "Tiempo completo",
  },
];



const BusquedasActivas = () => {
  return (
    <div className="especialidad-page">
      {/* TÍTULO */}
      <div className="text-center mb-5">
        <h1 className="especialidad-title">Búsquedas activas</h1>
        <p className="especialidad-subtitle">
          Oportunidades laborales – Sanatorio Mayo S.A.
        </p>
      </div>

      {/* CONTENEDOR */}
      <div className="especialidad-container">
        <div className="cards-grid">
          {busquedas.map((busqueda, index) => (
            <div className="doctor-card" key={index}>
              <h3>{busqueda.puesto}</h3>

              <p className="doctor-horario">
                <strong>Área:</strong> {busqueda.area}
              </p>

              <p className="doctor-observacion">
                {busqueda.descripcion}
              </p>

              <p className="doctor-phone">
                <strong>Modalidad:</strong> {busqueda.modalidad}
              </p>

              <button className="btn-turno">
                Postularme
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusquedasActivas;