import { Link, NavLink } from "react-router-dom"
import "../styles/navbar.css"

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar fixed-top">
      <div className="container">

        {/* LOGO */}
        <Link className="navbar-brand" to="/">
          <img
            src="https://i.postimg.cc/yYvJsZjR/Logosanatorio.jpg"
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
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* LINKS */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">

            {/* LINKS PRINCIPALES */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Inicio
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/sobre-nosotros">
                Sobre Nosotros
              </NavLink>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/#informacion">
                Información
              </Link>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/guardia">
                Guardia
              </NavLink>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/#contacto">
                Contacto
              </Link>
            </li>

            <li className="nav-item">
               <Link className="nav-link" to="/instalaciones">
               Instalaciones
              </Link>
           </li>

            {/* DROPDOWN EQUIPO PROFESIONAL */}
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Equipo Profesional
              </span>

              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <NavLink className="dropdown-item" to="/cardiologia">
                    Cardiología
                  </NavLink>
                </li>

                <li>
                  <NavLink className="dropdown-item" to="/traumatologia">
                    Traumatología
                  </NavLink>
                </li>

                <li>
                  <NavLink className="dropdown-item" to="/psicologia">
                    Psicología
                  </NavLink>
                </li>

                <li>
                  <NavLink className="dropdown-item" to="/cirugia-general">
                    Cirugía General
                  </NavLink>
                </li>

                <li>
                  <NavLink className="dropdown-item" to="/ginecologia">
                    Ginecología
                  </NavLink>
                </li>

                <li>
                  <NavLink className="dropdown-item" to="/dermatologia">
                    Dermatología
                  </NavLink>
                </li>

                <li>
                  <NavLink className="dropdown-item" to="/clinica-general">
                    Clínica General
                  </NavLink>
                </li>
              </ul>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar









