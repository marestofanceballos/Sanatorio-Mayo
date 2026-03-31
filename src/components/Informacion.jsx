import "../styles/informacion.css"

function Informacion() {
  const features = [
    {
      icon: "bi-heart-pulse",
      title: "Atención Personalizada",
      description:
        "Cada paciente recibe un tratamiento único y adaptado a sus necesidades específicas.",
    },
    {
      icon: "bi-clock",
      title: "Horarios Flexibles",
      description:
        "Atención de lunes a domingo las 24 horas para emergencias y consultas programadas.",
    },
    {
      icon: "bi-shield-check",
      title: "Tecnología Avanzada",
      description:
        "Equipamiento de última generación para diagnósticos precisos y tratamientos efectivos.",
    },
    {
      icon: "bi-people",
      title: "Equipo Profesional",
      description:
        "Médicos especialistas con amplia trayectoria y actualización permanente.",
    },
  ]

  return (
    <section className="informacion-section" id="informacion">
      <div className="container text-center">
        <h2 className="informacion-title">
          Tu salud es nuestra prioridad
        </h2>

        <p className="informacion-text">
  En Sanatorio Mayo brindamos atención médica de calidad, combinando calidez humana con tecnología de vanguardia.
</p>

        <div className="row mt-5">
          {features.map((feature, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <div className="card info-card h-100">
                <div className="card-body">
                  <div className="icon-box mb-3">
                    <i className={`bi ${feature.icon}`}></i>
                  </div>

                  <h5 className="card-title">{feature.title}</h5>
                  <p className="card-text">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Informacion





