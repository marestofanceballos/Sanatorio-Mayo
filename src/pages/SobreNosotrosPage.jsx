import { useState } from "react"
import "./sobreNosotrosPage.css"

export default function SobreNosotrosPage() {
  const [active, setActive] = useState("mision")

  return (
    <section className="about-page">

      {/* ===== BLOQUE SUPERIOR ===== */}
      <div className="about-hero">
        <div className="about-hero-text">
          <h1>Cuidamos la salud con compromiso, experiencia y humanidad</h1>
          <p>
            Somos una institución médica dedicada a brindar atención segura,
            moderna y centrada en las personas.
          </p>

          <div className="about-tabs">
            <button
              className={active === "mision" ? "tab active" : "tab"}
              onClick={() => setActive("mision")}
            >
              Misión
            </button>

            <button
              className={active === "vision" ? "tab active" : "tab"}
              onClick={() => setActive("vision")}
            >
              Visión
            </button>
          </div>

          {active === "mision" && (
            <div className="tab-content">
              Brindar atención médica responsable y humana, incorporando
              tecnología y formación continua para el cuidado integral
              de nuestros pacientes.
            </div>
          )}

          {active === "vision" && (
            <div className="tab-content">
              Ser un sanatorio de referencia, reconocido por la calidad
              asistencial, la innovación y el respeto por las personas.
            </div>
          )}
        </div>

        <div className="about-hero-image">
          <img
            src="https://i.postimg.cc/C1VhbRCz/IMG-7328.png"
            alt="Equipo médico"
          />
        </div>
      </div>

      {/* ===== VALORES ===== */}
<div className="values-section">
  <h2>Nuestros valores</h2>

  <ul className="values-list">
    <li>
      <span className="check">✔</span>
      Calidad y calidez en la atención médico asistencial
    </li>

    <li>
      <span className="check">✔</span>
      Trabajo en equipo
    </li>

    <li>
      <span className="check">✔</span>
      Responsabilidad profesional
    </li>

    <li>
      <span className="check">✔</span>
      Innovación y modernización tecnológica y edilicia para un servicio más eficiente y eficaz
    </li>

    <li>
      <span className="check">✔</span>
      Compromiso social
    </li>
  </ul>
</div>


    </section>
  )
}




