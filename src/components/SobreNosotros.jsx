import { Link } from "react-router-dom"
import "../styles/sobreNosotros.css"

function SobreNosotros() {
  return (
    <section className="sobre-section" id="sobre-nosotros">
      <div className="container">
        <div className="row align-items-center">
          
          {/* Imagen */}
          <div className="col-md-6 mb-4 d-flex justify-content-center">
            <div className="imagen-circular">
              <img
                src="https://i.postimg.cc/D0GHtpFN/sanatorio.jpg"
                alt="Sanatorio Vida Salud"
              />
            
            </div>
          </div>

          {/* Texto */}
          <div className="col-md-6">
            <h2 className="sobre-title">Sobre Nosotros</h2>

            <p>
              En Sanatorio Vida Salud nos dedicamos a brindar atención médica de
              excelencia con un enfoque humano y profesional.
            </p>

            <p>
              Nuestro equipo está conformado por especialistas altamente
              capacitados en diversas áreas de la medicina, comprometidos con el
              bienestar de cada paciente.
            </p>

            <p>
              Trabajamos con tecnología de última generación y protocolos
              médicos actualizados, garantizando diagnósticos precisos y
              tratamientos efectivos.
            </p>

            {/* 👉 BOTÓN QUE NAVEGA */}
            <Link
              to="/sobre-nosotros"
              className="btn btn-outline-success mt-3"
            >
              Conocer más
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}

export default SobreNosotros


