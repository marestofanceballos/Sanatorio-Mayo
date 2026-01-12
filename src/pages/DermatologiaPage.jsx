import "../pages/consultorios.css"


const doctorasDermatologia = [
  {
    nombre: "Dra. Cannata Valeria",
    horario: "Martes – desde 14 hs",
    telefono: "381-4658577",
  },
];


function DermatologiaPage() {
  return (
    <div className="especialidad-page">
      {/* TÍTULO */}
      <div className="text-center mb-5">
        <h1 className="especialidad-title">Dermatología</h1>
        <p className="especialidad-subtitle">Sanatorio Mayo S.A.</p>
      </div>

      {/* CONTENEDOR */}
      <div className="especialidad-container">
        <h2 className="section-title">Especialistas</h2>
        <hr />

        <div className="cards-grid">
          {doctorasDermatologia.map((doc, index) => (
            <div className="doctor-card" key={index}>
              {/* Avatar (foto futura) */}
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

export default DermatologiaPage
