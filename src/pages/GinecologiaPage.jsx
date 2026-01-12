import "../pages/consultorios.css"


const doctorasGinecologia = [
  {
    nombre: "Dra. Alvarez Yanina",
    horario: "Lun, Miér y Jue – desde 14 hs",
    telefono: "3865-302379",
  },
  {
    nombre: "Dra. Frontini Adriana",
    horario: "Lun, Mar, Jue y Vie – desde 16:30 hs",
    observacion: "Orden de llegada",
  },
  {
    nombre: "Dra. Linares Virginia",
    horario: "A partir de marzo",
    observacion: "Orden de llegada",
  },
];

function GinecologiaPage() {
  return (
   <div className="especialidad-page">
      {/* TÍTULO */}
      <div className="text-center mb-5">
        <h1 className="especialidad-title">Ginecología</h1>
        <p className="especialidad-subtitle">Sanatorio Mayo S.A.</p>
      </div>

      {/* CONTENEDOR */}
      <div className="especialidad-container">
        <h2 className="section-title">Especialistas</h2>
        <hr />

        <div className="cards-grid">
          {doctorasGinecologia.map((doc, index) => (
            <div className="doctor-card" key={index}>
              {/* Avatar */}
              <div className="doctor-avatar" />

              <h3>{doc.nombre}</h3>

              <p className="doctor-horario">{doc.horario}</p>

              {doc.telefono && (
                <p className="doctor-phone">
                  📞 {doc.telefono}
                </p>
              )}

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

export default GinecologiaPage
