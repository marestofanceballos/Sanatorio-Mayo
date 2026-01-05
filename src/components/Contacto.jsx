import { useState } from "react"
import "../styles/contacto.css"

function Contacto() {
  return (
    <section className="contacto-section" id="contacto">
      <div className="container text-center">

        <h2 className="contacto-title">Contacto</h2>
        <p className="contacto-text">
          Estamos aquí para ayudarte. No dudes en contactarnos por cualquier consulta.
        </p>

        <div className="row mt-5 justify-content-center">

          {/* DIRECCIÓN */}
          <div className="col-md-4 mb-4">
            <div className="card contacto-card h-100">
              <div className="card-body d-flex flex-column text-center">
                <div className="icon-box mb-3">
                  <i className="bi bi-geo-alt"></i>
                </div>

                <h5 className="card-title">Dirección</h5>

                <p className="card-text">
                  24 de Septiembre 1544<br />
                  Concepción, Tucumán
                </p>

                <a
                  href="https://maps.app.goo.gl/MTho97yHwMPHht9z7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-success w-100 mt-auto"
                >
                  Cómo llegar
                </a>
              </div>
            </div>
          </div>

          {/* TELÉFONO */}
          <div className="col-md-4 mb-4">
            <div className="card contacto-card h-100">
              <div className="card-body d-flex flex-column text-center">
                <div className="icon-box mb-3">
                  <i className="bi bi-telephone"></i>
                </div>

                <h5 className="card-title">Teléfono</h5>

                <p className="card-text contacto-phone">
                  +54 3865 857008
                </p>

                <a
                  href="tel:+543865857008"
                  className="btn btn-success w-100 mt-auto"
                >
                  Llamar
                </a>
              </div>
            </div>
          </div>

          {/* EMAIL */}
          <div className="col-md-4 mb-4">
            <div className="card contacto-card h-100">
              <div className="card-body d-flex flex-column text-center">
                <div className="icon-box mb-3">
                  <i className="bi bi-envelope"></i>
                </div>

                <h5 className="card-title">Email</h5>

                <p className="card-text contacto-email">
                  sanatoriomayo1544@gmail.com
                </p>

                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=sanatoriomayo1544@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-success w-100 mt-auto"
                >
                  Enviar email
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Contacto




