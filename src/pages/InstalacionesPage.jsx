import "../pages/instalaciones.css"

function InstalacionesPage() {
  return (
    <section className="instalaciones-section">
      <div className="container">

        <h2 className="text-center">Nuestras Instalaciones</h2>
        <p className="text-center instalaciones-subtitle">
          Espacios diseñados para brindar confort, seguridad y tranquilidad
        </p>

        {/* BLOQUE 1 */}
        <div className="row align-items-center instalaciones-item">
          <div className="col-md-6">
            <img
              src="https://i.postimg.cc/NfzY3QMJ/image.jpg"
              alt="Habitaciones"
              className="instalacion-img"
            />
          </div>
          <div className="col-md-6">
            <h4>Habitaciones confortables</h4>
            <p>
              Contamos con habitaciones modernas, luminosas y totalmente
              equipadas para garantizar el descanso y bienestar de nuestros
              pacientes durante su estadía.
            </p>
          </div>
        </div>

        {/* BLOQUE 2 */}
        <div className="row align-items-center instalaciones-item flex-md-row-reverse">
          <div className="col-md-6">
            <img
              src="https://i.postimg.cc/Vs4zFqPW/image.jpg"
              alt="Habitación doble"
              className="instalacion-img"
            />
          </div>
          <div className="col-md-6">
            <h4>Espacios amplios y funcionales</h4>
            <p>
              Diseñados para brindar comodidad tanto a pacientes como a
              acompañantes, con mobiliario moderno y ambientes agradables.
            </p>
          </div>
        </div>

        {/* BLOQUE 3 */}
        <div className="row align-items-center instalaciones-item">
          <div className="col-md-6">
            <img
              src="https://i.postimg.cc/qBD9RjT0/image.jpg"
              alt="Quirófano"
              className="instalacion-img"
            />
          </div>
          <div className="col-md-6">
            <h4>Quirófanos equipados</h4>
            <p>
              Nuestros quirófanos cuentan con tecnología de última generación,
              cumpliendo con los más altos estándares de seguridad y calidad.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}

export default InstalacionesPage

