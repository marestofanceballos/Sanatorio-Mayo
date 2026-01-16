import "../pages/consultorios.css"

const doctoresTraumatologia = [
  {
    nombre: "Dr. Juri Rafael",
    horario: "Jueves – desde 19 hs",
    observacion: "Orden de llegada",
  },
];

function TraumatologiaPage() {
  return (
    <div className="especialidad-page">

      <div className="text-center mb-5">
        <h1 className="especialidad-title">Traumatología</h1>
        <p className="especialidad-subtitle">Sanatorio Mayo S.A.</p>
      </div>

      <div className="especialidad-container">
        <h2 className="section-title">Especialistas</h2>
        <hr />

        <div className="cards-grid">
          {doctoresTraumatologia.map((doc, index) => (
            <div className="doctor-card" key={index}>
              <div className="doctor-avatar" />

              <h3>{doc.nombre}</h3>

              <p className="doctor-horario">{doc.horario}</p>

              {doc.observacion && (
                <p className="doctor-observacion">
                  {doc.observacion}
                </p>
              )}

              <button className="btn-turno">
                Solicitar turno
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default TraumatologiaPage

