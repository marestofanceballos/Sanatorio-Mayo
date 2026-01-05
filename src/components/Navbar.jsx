import { Link, useLocation } from "react-router-dom"
import "../styles/navbar.css"

function Navbar() {
  const location = useLocation()

  return (
    <nav className="navbar navbar-expand-lg fixed-top custom-navbar">
      <div className="container">

        {/* LOGO → SIEMPRE A INICIO */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="https://i.postimg.cc/3wN0S54H/Diseno-sin-titulo.png"
            alt="Sanatorio Mayo"
            className="navbar-logo"
          />
        </Link>

        {/* BOTÓN MOBILE */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* LINKS */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">

            {/* INICIO */}
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                to="/"
              >
                Inicio
              </Link>
            </li>

            {/* SOBRE NOSOTROS */}
            <li className="nav-item">
              {location.pathname === "/" ? (
                /* EN HOME → baja a sección */
                <Link className="nav-link" to="/#sobre-nosotros">
                  Sobre Nosotros
                </Link>
              ) : (
                /* EN OTRA PÁGINA → va a página nueva */
                <Link
                  className={`nav-link ${location.pathname === "/sobre-nosotros" ? "active" : ""}`}
                  to="/sobre-nosotros"
                >
                  Sobre Nosotros
                </Link>
              )}
            </li>

            {/* INFORMACIÓN → SIEMPRE VUELVE A HOME Y BAJA */}
            <li className="nav-item">
              <Link className="nav-link" to="/#informacion">
                Información
              </Link>
            </li>

            {/* CONTACTO → SIEMPRE VUELVE A HOME Y BAJA */}
            <li className="nav-item">
              <Link className="btn btn-contacto nav-link" to="/#contacto">
                Contacto
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar






