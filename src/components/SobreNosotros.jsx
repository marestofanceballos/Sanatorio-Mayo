import { Link } from "react-router-dom"
import "../styles/sobreNosotros.css"

function SobreNosotros() {
  return (
    <section className="sobre-section" id="sobre-nosotros">
      <div className="container">
        <div className="row align-items-center">
          
          {/* Imagen */}
          <div className="col-md-6 mb-4 d-flex justify-content-center">
            <div className="imagen-circular">
              <img
                src="https://i.postimg.cc/D0GHtpFN/sanatorio.jpg"
                alt="Sanatorio Vida Salud"
              />
            
            </div>
          </div>

          {/* Texto */}
          <div className="col-md-6">
            <h2 className="sobre-title">Sobre Nosotros</h2>

            <p>
  Este establecimiento sanatorial se encuentra emplazado en el corazón de la ciudad de Concepción, provincia de Tucumán. Desde hace más de 60 años somos protagonistas en la evolución del sistema de salud, especialmente en el sur de nuestra provincia.

  Somos una institución que mira hacia adelante, con la misma fuerza con la que fuimos construyendo nuestro camino: responsabilidad, calidez humana y una profunda conexión con nuestra comunidad.

  Crecemos y nos transformamos día a día, modernizando nuestras instalaciones, incorporando tecnología avanzada, ampliando servicios y sumando profesionales en permanente formación, para brindar atención médica con compromiso, cercanía y respeto por cada paciente y su familia.
</p>

            {/* 👉 BOTÓN QUE NAVEGA */}
            <Link
              to="/sobre-nosotros"
              className="btn btn-outline-success mt-3"
            >
              Conocer más
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}

export default SobreNosotros


