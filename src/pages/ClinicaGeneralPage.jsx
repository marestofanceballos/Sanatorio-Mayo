import "../pages/consultorios.css"

function ClinicaGeneralPage() {
  return (
    <section className="consultorios-section">
      <div className="container">

        <h2 className="consultorios-title text-center">
          Clínica General
        </h2>

        <p className="consultorios-subtitle text-center">
          Sanatorio Mayo S.A.
        </p>

        <div className="consultorio-card">
          <h4>Especialistas</h4>

          <ul>
            <li>
              <strong>Dra. Contreras Soledad</strong><br />
              Lunes, Miércoles y Viernes – desde 18:30 hs<br />
              📞 3865-394040
            </li>

            <li>
              <strong>Dra. Rearte Ligia</strong><br />
              Lun, Mar y Vie – 09 a 13 hs y 18 a 21 hs<br />
              Miércoles – 10 a 13 hs y 18 a 21 hs<br />
              <span className="orden">Orden de llegada</span>
            </li>
          </ul>
        </div>

      </div>
    </section>
  )
}

export default ClinicaGeneralPage
