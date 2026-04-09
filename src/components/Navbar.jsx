import { Link, NavLink } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar fixed-top">
      <div className="container">
        {/* LOGO */}
        <Link className="navbar-brand" to="/">
          <img
            src="https://i.postimg.cc/NfT0QjNY/LOGO-VERSIONES-SIN-FONDO-05.png"
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
              <Link className="nav-link" to="/#contacto">
                Contacto
              </Link>
            </li>

            {/* TURNOS */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/turnos">
                Turnos
              </NavLink>
            </li>

            {/* TRABAJÁ CON NOSOTROS */}
            <li className="nav-item">
              <NavLink className="nav-link nav-link-postulacion" to="/postulacion">
                Trabajá con nosotros
              </NavLink>
            </li>

            {/* INGRESO PROFESIONAL */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/doctor/login">
                Ingreso Profesional
              </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;