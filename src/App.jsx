import { Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ScrollToHash from "./components/ScrollToHash"
import WhatsAppButton from "./components/WhatsAppButton"

import Hero from "./components/Hero"
import SobreNosotros from "./components/SobreNosotros"
import Informacion from "./components/Informacion"
import Contacto from "./components/Contacto"
import Atencion24 from "./components/Atencion24"

import SobreNosotrosPage from "./pages/SobreNosotrosPage"
import GuardiaPage from "./pages/GuardiaPage"

import TraumatologiaPage from "./pages/TraumatologiaPage"
import CardiologiaPage from "./pages/CardiologiaPage"
import PsicologiaPage from "./pages/PsicologiaPage"
import CirugiaGeneralPage from "./pages/CirugiaGeneralPage"
import GinecologiaPage from "./pages/GinecologiaPage"
import DermatologiaPage from "./pages/DermatologiaPage"
import ClinicaGeneralPage from "./pages/ClinicaGeneralPage"

import InstalacionesPage from "./pages/InstalacionesPage"



function App() {
  return (
    <>
      <Navbar />
      <ScrollToHash />

      <Routes>
        {/* HOME */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <SobreNosotros />
              <Informacion />
              <Atencion24 />
              <GuardiaPage/>
              <InstalacionesPage/>
              <Contacto />
            </>
          }
        />

        {/* SOBRE NOSOTROS */}
        <Route
          path="/sobre-nosotros"
          element={<SobreNosotrosPage />}
        />



        <Route path="/equipo-profesional/traumatologia" element={<TraumatologiaPage />}/>
        <Route path="/cardiologia"element={<CardiologiaPage />}/>
        <Route path="/psicologia"element={<PsicologiaPage />}/>
        <Route path="/cirugia-general" element={<CirugiaGeneralPage />}/>
        <Route path="/ginecologia" element={<GinecologiaPage />} />
        <Route path="/dermatologia" element={<DermatologiaPage />} />
        <Route path="/clinica-general" element={<ClinicaGeneralPage />} />

        <Route path="/instalaciones" element={<InstalacionesPage />} />
      </Routes>

      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default App








