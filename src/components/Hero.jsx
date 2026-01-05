import "../styles/hero.css"
import { Link } from "react-router-dom"

function Hero() {
  return (
    <section className="hero-section" id="inicio">
      <div className="container hero-content text-center">
        <h1 className="hero-title">
          Cuidamos tu salud <br /> con excelencia
        </h1>

        <p className="hero-text">
          Contamos con profesionales altamente calificados y tecnología de punta
          para brindarte la mejor atención médica en cada consulta.
        </p>

        <div className="hero-buttons">
          <a href="#contacto" className="btn btn-success btn-lg">
            Contactar
          </a>

          <Link
            to="/sobre-nosotros"
            className="btn btn-outline-success btn-lg"
          >
            Conocer más
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero

