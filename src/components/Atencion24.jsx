import "../styles/atencion24.css"

function Atencion24() {
  return (
    <section
      className="atencion24"
      id="atencion-24"
      style={{
        backgroundImage: `url("https://i.postimg.cc/ZqXWvsgF/secretaria.jpg")`,
      }}
    >
      <div className="atencion24-overlay">
        <div className="atencion24-content">
          <h2>Atención 24 Horas</h2>

          <p>
            Nuestro equipo médico está disponible todos los días del año
            para atender cualquier emergencia.
          </p>

          <a href="#contacto" className="btn">
            Contactanos
          </a>
        </div>
      </div>
    </section>
  )
}

export default Atencion24

