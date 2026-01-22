import "../pages/guardia.css"

function GuardiaPage() {
  return (
    <section className="guardia-page">
      <div className="container">
        <div className="row align-items-center">

          {/* CARD */}
          <div className="col-lg-6 mb-4">
            <div className="guardia-card">
              <div className="guardia-header">
                <span className="guardia-icon">🩺</span>
                <h1>Guardia 24 hs</h1>
              </div>

              <p>
                Nuestro servicio de guardia funciona las <strong>24 horas,
                los 365 días del año</strong>, brindando atención inmediata
                a pacientes con traumatismos de cualquier complejidad.
              </p>

              <p>
                Contamos con equipo médico especializado, instrumental
                quirúrgico y diagnóstico acorde a normas internacionales
                de los mejores centros de traumatología.
              </p>

              <div className="guardia-info">
                <p><strong>🚑 Urgencias:</strong> las 24 hs</p>
                <p><strong>🏥 Internación:</strong> Sanatorio de Mayo</p>
                <p><strong>📞 Teléfono:</strong> +54 3865 857008</p>
              </div>
            </div>
          </div>

          {/* IMAGEN */}
          <div className="col-lg-6 text-center">
            <img
              src="https://i.postimg.cc/brVWq53P/sanatorio-mayo.jpg"
              alt="Guardia médica"
              className="guardia-img"
            />
          </div>

        </div>
      </div>
    </section>
  )
}

export default GuardiaPage
