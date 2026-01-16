import "../pages/consultorios.css"

const doctoresCirugia = [
  {
    nombre: "Dr. Carrizo Gustavo",
    horario: "Miércoles – 16 a 20 hs",
    observacion: "Orden de llegada",
  },
  {
    nombre: "Dr. Pintor Guillermo",
    horario: "Martes – 10 a 12 hs",
    telefono: "3865-431305",
  },
  {
    nombre: "Dr. Pintor Rodrigo",
    horario: "Martes – desde 16 hs",
    telefono: "381-2060458",
  },
  {
    nombre: "Dr. Yapur Gustavo",
    horario: "Lunes – 17 a 20 hs",
    telefono: "381-3306111",
  },
];

function CirugiaGeneralPage() {
  return (
    <div className="especialidad-page">

      {/* TÍTULO */}
      <div className="text-center mb-5">
        <h1 className="especialidad-title">Cirugía General</h1>
        <p className="especialidad-subtitle">Sanatorio Mayo S.A.</p>
      </div>

      {/* CONTENEDOR */}
      <div className="especialidad-container">
        <h2 className="section-title">Especialistas</h2>
        <hr />

        <div className="cards-grid">
          {doctoresCirugia.map((doc, index) => (
            <div className="doctor-card" key={index}>
              <div className="doctor-avatar" />

              <h3>{doc.nombre}</h3>

              <p className="doctor-horario">{doc.horario}</p>

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

export default CirugiaGeneralPage

