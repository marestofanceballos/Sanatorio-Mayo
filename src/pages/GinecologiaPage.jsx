import "../pages/consultorios.css"

function GinecologiaPage() {
  return (
    <section className="consultorios-section">
      <div className="container">

        <h2 className="consultorios-title text-center">
          Ginecología
        </h2>

        <p className="consultorios-subtitle text-center">
          Sanatorio Mayo S.A.
        </p>

        <div className="consultorio-card">
          <h4>Especialistas</h4>

          <ul>
            <li>
              <strong>Dra. Alvarez Yanina</strong><br />
              Lun, Miér y Jue – desde 14 hs<br />
              📞 3865-302379
            </li>

            <li>
              <strong>Dra. Frontini Adriana</strong><br />
              Lun, Mar, Jue y Vie – desde 16:30 hs<br />
              <span className="orden">Orden de llegada</span>
            </li>

            <li>
              <strong>Dra. Linares Virginia</strong><br />
              A PARTIR DE MARZO<br />
              <span className="orden">Orden de llegada</span>
            </li>
          </ul>
        </div>

      </div>
    </section>
  )
}

export default GinecologiaPage
