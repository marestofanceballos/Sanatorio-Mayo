import "../pages/consultorios.css"

const doctores = [
  {
    id: 1,
    nombre: "Dr. Acosta Sergio",
    horario: "Lunes a Viernes – desde 17 hs",
    telefono: "3865-526704",
  },
  {
    id: 2,
    nombre: "Dr. Ledesma Emiliano",
    horario: "Martes, Jueves y Viernes – desde 16 hs",
    telefono: "3865-202148",
  },
];

export default function CardiologiaPage() {
  return (
    <div className="especialidad-page">

      {/* TÍTULO */}
      <div className="text-center mb-5">
        <h1 className="especialidad-title">Cardiología</h1>
        <p className="especialidad-subtitle">Sanatorio Mayo S.A.</p>
      </div>

      {/* CONTENEDOR */}
      <div className="especialidad-container">
        <h2 className="section-title">Especialistas</h2>
        <hr />

        <div className="cards-grid">
          {doctores.map((doc) => (
            <div className="doctor-card" key={doc.id}>
              <div className="doctor-avatar" />

              <h3>{doc.nombre}</h3>

              <p className="doctor-horario">{doc.horario}</p>

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

    </div>
  );
}


