import "../pages/consultorios.css"

const doctoresCirugia = [
  {
    nombre: "Dr. Carrizo Gustavo",
    horario: "Miércoles – 16 a 20 hs",
    telefono: null,
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
   <section className="especialidad-page">
     <h2 className="consultorios-title text-center">
          Cirugia General
        </h2>

      <div className="cards-grid">
        {doctoresCirugia.map((doc, index) => (
          <div className="doctor-card" key={index}>
            {/* Avatar */}
            <div className="doctor-avatar" />

            {/* Nombre */}
            <h3>{doc.nombre}</h3>

            {/* Horario */}
            <p>{doc.horario}</p>

            {/* Observación */}
            {doc.observacion && (
              <p className="orden-llegada">{doc.observacion}</p>
            )}

            {/* Teléfono */}
            {doc.telefono && (
              <p className="telefono">📞 {doc.telefono}</p>
            )}

            {/* Botón */}
            <button className="btn-turno">Solicitar turno</button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default CirugiaGeneralPage
