import { Link, NavLink } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {

  const cerrarMenu = () => {
    const menu = document.getElementById("navbarNav");
    if (menu.classList.contains("show")) {
      menu.classList.remove("show");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar fixed-top">
      <div className="container">

        {/* LOGO */}
        <Link className="navbar-brand" to="/" onClick={cerrarMenu}>
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
              <NavLink className="nav-link" to="/" onClick={cerrarMenu}>
                Inicio
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/sobre-nosotros" onClick={cerrarMenu}>
                Sobre Nosotros
              </NavLink>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/#informacion" onClick={cerrarMenu}>
                Información
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/#contacto" onClick={cerrarMenu}>
                Contacto
              </Link>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/turnos" onClick={cerrarMenu}>
                Turnos
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/doctor/login" onClick={cerrarMenu}>
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