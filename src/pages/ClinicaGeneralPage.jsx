import "../pages/consultorios.css"

const doctoresClinicaGeneral = [
  {
    nombre: "Dra. Contreras Soledad",
    horario: "Lunes, Miércoles y Viernes – desde 18:30 hs",
    telefono: "3865-394040",
  },
  {
    nombre: "Dra. Rearte Ligia",
    horario: "Lun, Mar y Vie – 09 a 13 hs y 18 a 21 hs\nMiércoles – 10 a 13 hs y 18 a 21 hs",
    observacion: "Orden de llegada",
  },
];


function ClinicaGeneralPage() {
  return (
    <div className="especialidad-page">
      {/* TÍTULO */}
      <div className="text-center mb-5">
        <h1 className="especialidad-title">Clínica General</h1>
        <p className="especialidad-subtitle">Sanatorio Mayo S.A.</p>
      </div>

      {/* CONTENEDOR */}
      <div className="especialidad-container">
        <h2 className="section-title">Especialistas</h2>
        <hr />

        <div className="cards-grid">
          {doctoresClinicaGeneral.map((doc, index) => (
            <div className="doctor-card" key={index}>
              {/* Avatar */}
              <div className="doctor-avatar" />

              <h3>{doc.nombre}</h3>

              <p className="doctor-horario" style={{ whiteSpace: "pre-line" }}>
                {doc.horario}
              </p>

              {doc.telefono && (
                <p className="doctor-phone">📞 {doc.telefono}</p>
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

export default ClinicaGeneralPage
