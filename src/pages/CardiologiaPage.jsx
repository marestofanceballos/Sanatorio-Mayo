import "../pages/consultorios.css"

//              AGREGADO DE DOCTORES               //
const doctores = [
  {
    id: 1,
    nombre: "Dr. Acosta Sergio",
    horario: "Lunes a Viernes – desde 17 hs",
    telefono: "3865-526704",
    foto: null,
  },
  {
    id: 2,
    nombre: "Dr. Ledesma Emiliano",
    horario: "Martes, Jueves y Viernes – desde 16 hs",
    telefono: "3865-202148",
    foto: null,
  },
];


export default function CardiologiaPage() {
  return (
    <section className="cardiologia-page">
       <h2 className="consultorios-title text-center">
          Cardiologia
        </h2>

      <div className="cards-wrapper">
        <div className="cards-grid">
          {doctores.map((doc) => (
            <div className="doctor-card" key={doc.id}>
              <div className="doctor-avatar">
                {doc.foto && <img src={doc.foto} alt={doc.nombre} />}
              </div>

              <h3>{doc.nombre}</h3>

              <p className="doctor-schedule">
                {doc.horario}
              </p>

              <span className="doctor-phone">
                📞 {doc.telefono}
              </span>

              <button className="btn-turno">
                Solicitar turno
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

