import "../styles/whatsapp.css"

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5493865857008"
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
    >
      <i className="bi bi-whatsapp"></i>
    </a>
  )
}

export default WhatsAppButton

