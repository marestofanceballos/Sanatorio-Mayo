
import { Link } from "react-router-dom";
import "../styles/departamentos.css";

export default function TurnosPage() {

  const departamentos = [
    { nombre: "Cardiología", ruta: "/doctores/cardiologia" },
    // Ocultas temporalmente hasta que haya médicos cargados.
    // Para reactivarlas, descomentar la línea correspondiente:
    // { nombre: "Psicología", ruta: "/doctores/psicologia" },
    // { nombre: "Dermatología", ruta: "/doctores/dermatologia" },
    { nombre: "Traumatología", ruta: "/doctores/traumatologia" },
    { nombre: "Medicina Estética y Cirugía General", ruta: "/doctores/clinica" },
    { nombre: "Cirugía General y Coloproctología", ruta: "/doctores/cirugia" },
    { nombre: "Cirugía Laparoscópica", ruta: "/doctores/laparoscopica" },
    { nombre: "Ginecología", ruta: "/doctores/ginecologia" },
    { nombre: "Nutrición", ruta: "/doctores/nutricion" }
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