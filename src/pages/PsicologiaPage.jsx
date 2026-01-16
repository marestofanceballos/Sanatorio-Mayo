import "../pages/consultorios.css"

const doctoresPsicologia = [
  {
    nombre: "Lic. Palacios Florencia",
    horario: "Jueves – 16 a 20 hs",
    telefono: "3865-520997",
  },
];

function PsicologiaPage() {
  return (
    <div className="especialidad-page">

      <div className="text-center mb-5">
        <h1 className="especialidad-title">Psicología</h1>
        <p className="especialidad-subtitle">Sanatorio Mayo S.A.</p>
      </div>

      <div className="especialidad-container">
        <h2 className="section-title">Especialistas</h2>
        <hr />

        <div className="cards-grid">
          {doctoresPsicologia.map((doc, index) => (
            <div className="doctor-card" key={index}>
              <div className="doctor-avatar" />

              <h3>{doc.nombre}</h3>

              <p className="doctor-horario">{doc.horario}</p>

              <p className="doctor-phone">📞 {doc.telefono}</p>

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

export default PsicologiaPage

