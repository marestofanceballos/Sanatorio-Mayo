import "../pages/consultorios.css"


const doctoresTraumatologia = [
  {
    id: 1,
    nombre: "Dr. Juri Rafael",
    horario: "Jueves – desde 19 hs",
    nota: "Orden de llegada",
    telefono: null,
    foto: null,
  },
];


function TraumatologiaPage() {
  return (
    <section className="cardiologia-page">
      {/* reutilizamos las mismas clases y estilos */}
     <h2 className="consultorios-title text-center">
          Traumatologia
        </h2>

      <div className="cards-wrapper">
        <div className="cards-grid">
          {doctoresTraumatologia.map((doc) => (
            <div className="doctor-card" key={doc.id}>
              <div className="doctor-avatar">
                {doc.foto && <img src={doc.foto} alt={doc.nombre} />}
              </div>

              <h3>{doc.nombre}</h3>

              <p className="doctor-schedule">
                {doc.horario}
              </p>

              {doc.nota && (
                <p className="doctor-note">
                  {doc.nota}
                </p>
              )}

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

export default TraumatologiaPage
