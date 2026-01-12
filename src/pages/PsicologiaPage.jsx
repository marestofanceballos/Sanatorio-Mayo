import "../pages/consultorios.css"


const doctoresPsicologia = [
  {
    id: 1,
    nombre: "Lic. Palacios Florencia",
    horario: "Jueves – 16 a 20 hs",
    telefono: "3865-520997",
    foto: null,
  },
];



function PsicologiaPage() {
  return (
    <section className="especialidad-page">
      {/* Título principal */}
    <h2 className="consultorios-title text-center">
          Psicología
        </h2>

      {/* Especialistas */}
      <div className="cards-wrapper">
        <h2 className="section-title">Especialistas</h2>

        <div className="cards-grid">
          {doctoresPsicologia.map((doc) => (
            <div className="doctor-card" key={doc.id}>
              <div className="doctor-avatar">
                {doc.foto && <img src={doc.foto} alt={doc.nombre} />}
              </div>

              <h3>{doc.nombre}</h3>

              <p className="doctor-schedule">
                {doc.horario}
              </p>

              <p className="doctor-phone">
                📞 {doc.telefono}
              </p>

              <button className="btn-turno">
                Solicitar turno
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PsicologiaPage
