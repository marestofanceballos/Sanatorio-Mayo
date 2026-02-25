import { Link } from "react-router-dom";
import "../styles/departamentos.css";


export default function TurnosPage() {

  const departamentos = [
    { nombre: "Cardiología", ruta: "/doctores/cardiologia" },
    { nombre: "Traumatología", ruta: "/doctores/traumatologia" },
    { nombre: "Psicología", ruta: "/doctores/psicologia" },
    { nombre: "Clínica General", ruta: "/doctores/clinica" },
    { nombre: "Cirugía General", ruta: "/doctores/cirugia" }, 
    { nombre: "Ginecología", ruta: "/doctores/ginecologia" },
    { nombre: "Dermatología", ruta: "/doctores/dermatologia" }
  ];

  return (
    <div className="departamentos-wrapper">

      <h1 className="departamentos-title">
        Turnos Médicos
      </h1>

      <p className="departamentos-subtitle">
        Seleccione una especialidad para continuar
      </p>

      <div className="departamentos-grid">
        {departamentos.map((dep) => (
          <Link
            key={dep.nombre}
            to={dep.ruta}
            className="departamento-card"
          >
            {dep.nombre}
          </Link>
        ))}
      </div>

    </div>
  );
}