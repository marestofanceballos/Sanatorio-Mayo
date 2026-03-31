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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        flexDirection: "column",
        textAlign: "center",
        padding: "20px"
      }}
    >
      <h1 style={{ fontSize: "3rem", color: "#28a745" }}>
        🚧 Próximamente
      </h1>

      <p style={{ fontSize: "1.2rem", marginTop: "10px" }}>
        Estamos trabajando para habilitar el sistema de turnos online.
      </p>

    </div>
  );
}