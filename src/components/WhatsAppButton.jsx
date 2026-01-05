import "../styles/whatsapp.css"

function WhatsAppButton() {
  return (
    <a
      href="https://w.app/recepcionsanatoriomayo"
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

