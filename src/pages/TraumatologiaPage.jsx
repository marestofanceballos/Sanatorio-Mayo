import "../pages/consultorios.css"

function TraumatologiaPage() {
  return (
    <section className="consultorios-section">
      <div className="container">

        <h2 className="consultorios-title text-center">
          Traumatología
        </h2>

        <p className="consultorios-subtitle text-center">
          Sanatorio Mayo S.A.
        </p>

        <div className="consultorio-card">
          <ul>
            <li>
              <strong>Dr. Juri Rafael</strong><br />
              Jueves – desde 19 hs<br />
              <span className="orden">Orden de llegada</span>
            </li>

            <li>
              <strong>Dr. Montenegro</strong><br />
              Miércoles – desde 17 hs<br />
              Sábados – desde 11 hs<br />
              <span className="orden">Orden de llegada</span>
            </li>
          </ul>
        </div>

      </div>
    </section>
  )
}

export default TraumatologiaPage
