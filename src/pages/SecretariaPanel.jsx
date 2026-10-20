import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaCalendarAlt, FaEdit, FaPlus, FaUserMd, FaTimes } from "react-icons/fa";
import AlertModal from "../components/AlertModal";
import { API_URL } from "../config/api";
import "../pages/doctorPanel.css";
import "../pages/secretariaPanel.css";

const MAX_DOCTORES = 3;
const POR_ORDEN = "Por orden de llegada";

// 0 = domingo ... 6 = sábado (igual que Date.getDay() y que data/doctores.js)
const DIAS = [
  { valor: 1, corto: "LU", largo: "Lunes" },
  { valor: 2, corto: "MA", largo: "Martes" },
  { valor: 3, corto: "MI", largo: "Miércoles" },
  { valor: 4, corto: "JU", largo: "Jueves" },
  { valor: 5, corto: "VI", largo: "Viernes" },
  { valor: 6, corto: "SA", largo: "Sábado" },
  { valor: 0, corto: "DO", largo: "Domingo" },
];

const DOCTOR_VACIO = {
  nombre: "",
  especialidad: "",
  email: "",
  horarios: [],
  diasAtencion: [],
  sinTurno: false,
};

const PACIENTE_VACIO = {
  pacienteNombre: "",
  dni: "",
  telefono: "",
  email: "",
  observacion: "",
};

// "2026-10-20" -> Date local (new Date("2026-10-20") es UTC y en Argentina muestra el día anterior)
const fechaLocal = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};

const hoyISO = () => {
  const h = new Date();
  const m = String(h.getMonth() + 1).padStart(2, "0");
  const d = String(h.getDate()).padStart(2, "0");
  return `${h.getFullYear()}-${m}-${d}`;
};

const formatFecha = (iso) =>
  fechaLocal(iso).toLocaleDateString("es-AR", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

const textoDias = (dias) =>
  !dias || dias.length === 0
    ? "Todos los días"
    : DIAS.filter((d) => dias.includes(d.valor)).map((d) => d.largo).join(", ");

const atiendeEseDia = (doctor, iso) =>
  !doctor.diasAtencion?.length || doctor.diasAtencion.includes(fechaLocal(iso).getDay());

export default function SecretariaPanel() {

  const navigate = useNavigate();

  const secretariaId = localStorage.getItem("secretariaId");
  const secretariaNombre = localStorage.getItem("secretariaNombre");

  const [doctores, setDoctores] = useState([]);
  const [cargandoDoctores, setCargandoDoctores] = useState(true);
  const [doctorSel, setDoctorSel] = useState(null);

  const [turnos, setTurnos] = useState([]);
  const [verPasados, setVerPasados] = useState(false);

  // agendar
  const [fecha, setFecha] = useState("");
  const [horario, setHorario] = useState("");
  const [ocupados, setOcupados] = useState([]);
  const [paciente, setPaciente] = useState(PACIENTE_VACIO);
  const [guardandoTurno, setGuardandoTurno] = useState(false);

  // modal doctor (crear / editar)
  const [modalDoctor, setModalDoctor] = useState(null); // null | { modo: "crear" | "editar", datos }
  const [nuevoHorario, setNuevoHorario] = useState("");
  const [guardandoDoctor, setGuardandoDoctor] = useState(false);

  // modal reprogramar
  const [turnoReprogramar, setTurnoReprogramar] = useState(null);
  const [repFecha, setRepFecha] = useState("");
  const [repHorario, setRepHorario] = useState("");

  // modal eliminar
  const [turnoEliminar, setTurnoEliminar] = useState(null);

  // modal eliminar doctor: { doctor, turnosProximos }
  const [doctorEliminar, setDoctorEliminar] = useState(null);
  const [eliminandoDoctor, setEliminandoDoctor] = useState(false);

  const [alerta, setAlerta] = useState({ open: false, tipo: "error", mensaje: "" });
  const cerrarAlerta = useCallback(() => setAlerta((a) => ({ ...a, open: false })), []);
  const mostrarError = (mensaje) => setAlerta({ open: true, tipo: "error", mensaje });
  const mostrarExito = (mensaje) => setAlerta({ open: true, tipo: "success", mensaje });

  // fetch a /api/secretaria/:id/... que devuelve { ok, data }
  const api = useCallback(async (ruta, opciones = {}) => {
    const res = await fetch(`${API_URL}/api/secretaria/${secretariaId}${ruta}`, {
      ...opciones,
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, data };
  }, [secretariaId]);

  // ===== DOCTORES =====

  const cargarDoctores = useCallback(async () => {
    try {
      const { ok, data } = await api("/doctores");
      if (!ok) {
        mostrarError(data.mensaje || "No se pudieron cargar los doctores.");
        return;
      }
      setDoctores(data);
      // mantener seleccionado el mismo doctor con sus datos actualizados
      setDoctorSel((sel) => (sel ? data.find((d) => d._id === sel._id) || null : null));
    } catch {
      mostrarError("Error de conexión con el servidor. Intentá nuevamente.");
    } finally {
      setCargandoDoctores(false);
    }
  }, [api]);

  const abrirCrearDoctor = () => {
    setNuevoHorario("");
    setModalDoctor({ modo: "crear", datos: { ...DOCTOR_VACIO } });
  };

  const abrirEditarDoctor = (doctor) => {
    setNuevoHorario("");
    setModalDoctor({
      modo: "editar",
      datos: {
        ...DOCTOR_VACIO,
        ...doctor,
        horarios: [...(doctor.horarios || [])],
        diasAtencion: [...(doctor.diasAtencion || [])],
      },
    });
  };

  const cambiarDatoDoctor = (campo, valor) =>
    setModalDoctor((m) => ({ ...m, datos: { ...m.datos, [campo]: valor } }));

  const alternarDia = (valor) => {
    const dias = modalDoctor.datos.diasAtencion;
    cambiarDatoDoctor(
      "diasAtencion",
      dias.includes(valor) ? dias.filter((d) => d !== valor) : [...dias, valor]
    );
  };

  const agregarHorario = () => {
    if (!nuevoHorario) return;
    const horarios = modalDoctor.datos.horarios;
    if (!horarios.includes(nuevoHorario)) {
      cambiarDatoDoctor("horarios", [...horarios, nuevoHorario].sort());
    }
    setNuevoHorario("");
  };

  const quitarHorario = (h) =>
    cambiarDatoDoctor("horarios", modalDoctor.datos.horarios.filter((x) => x !== h));

  const guardarDoctor = async (e) => {
    e.preventDefault();
    const { modo, datos } = modalDoctor;

    if (!datos.sinTurno && datos.horarios.length === 0) {
      mostrarError("Agregá al menos un horario, o marcá que atiende por orden de llegada.");
      return;
    }

    const body = {
      nombre: datos.nombre,
      especialidad: datos.especialidad,
      horarios: datos.sinTurno ? [] : datos.horarios,
      diasAtencion: datos.diasAtencion,
      sinTurno: datos.sinTurno,
    };
    if (modo === "crear") body.email = datos.email;

    setGuardandoDoctor(true);
    try {
      const { ok, data } = await api(
        modo === "crear" ? "/doctores" : `/doctores/${datos._id}`,
        { method: modo === "crear" ? "POST" : "PUT", body: JSON.stringify(body) }
      );
      if (!ok) {
        mostrarError(data.mensaje || "No se pudo guardar el doctor.");
        return;
      }
      setModalDoctor(null);
      await cargarDoctores();
      if (modo === "crear") setDoctorSel(data);
      mostrarExito(modo === "crear" ? "Doctor agregado." : "Cambios guardados.");
    } catch {
      mostrarError("Error de conexión con el servidor. Intentá nuevamente.");
    } finally {
      setGuardandoDoctor(false);
    }
  };

  const pedirEliminarDoctor = async (doctor) => {
    try {
      const { ok, data } = await api(`/turnos?doctorId=${doctor._id}`);
      const hoy = hoyISO();
      const turnosProximos = ok ? data.filter((t) => t.fecha >= hoy).length : 0;
      setDoctorEliminar({ doctor, turnosProximos });
    } catch {
      mostrarError("Error de conexión con el servidor. Intentá nuevamente.");
    }
  };

  const confirmarEliminarDoctor = async () => {
    const { doctor } = doctorEliminar;
    setEliminandoDoctor(true);
    try {
      const { ok, data } = await api(`/doctores/${doctor._id}`, { method: "DELETE" });
      if (!ok) {
        mostrarError(data.mensaje || "No se pudo eliminar el doctor.");
        return;
      }
      setDoctorEliminar(null);
      if (doctorSel?._id === doctor._id) seleccionarDoctor(null);
      await cargarDoctores();
      const cancelados = data.turnosCancelados
        ? data.turnosCancelados === 1
          ? " Se canceló 1 turno próximo."
          : ` Se cancelaron ${data.turnosCancelados} turnos próximos.`
        : "";
      mostrarExito(
        (data.doctorBorrado
          ? `${doctor.nombre} fue eliminado.`
          : `${doctor.nombre} ya no está en tu lista.`) + cancelados
      );
    } catch {
      mostrarError("Error de conexión con el servidor. Intentá nuevamente.");
    } finally {
      setEliminandoDoctor(false);
    }
  };

  // ===== TURNOS =====

  const cargarTurnos = useCallback(async () => {
    if (!doctorSel) return;
    try {
      const { ok, data } = await api(`/turnos?doctorId=${doctorSel._id}`);
      if (!ok) {
        mostrarError(data.mensaje || "No se pudieron cargar los turnos.");
        return;
      }
      setTurnos(data);
    } catch {
      mostrarError("Error de conexión con el servidor. Intentá nuevamente.");
    }
  }, [api, doctorSel]);

  const cargarOcupados = useCallback(async (iso) => {
    if (!doctorSel || !iso) {
      setOcupados([]);
      return;
    }
    try {
      const { ok, data } = await api(`/turnos?doctorId=${doctorSel._id}&fecha=${iso}`);
      setOcupados(ok ? data.map((t) => t.horario) : []);
    } catch {
      setOcupados([]);
    }
  }, [api, doctorSel]);

  const seleccionarDoctor = (doctor) => {
    setDoctorSel(doctor);
    setFecha("");
    setHorario("");
    setOcupados([]);
    setPaciente(PACIENTE_VACIO);
  };

  const cambiarFecha = (iso) => {
    setFecha(iso);
    setHorario(doctorSel?.sinTurno ? POR_ORDEN : "");
    cargarOcupados(iso);
  };

  const cambiarPaciente = (e) =>
    setPaciente({ ...paciente, [e.target.name]: e.target.value });

  const agendarTurno = async (e) => {
    e.preventDefault();

    if (!fecha) {
      mostrarError("Elegí una fecha.");
      return;
    }
    if (!atiendeEseDia(doctorSel, fecha)) {
      mostrarError(`El doctor no atiende ese día. Atiende: ${textoDias(doctorSel.diasAtencion)}.`);
      return;
    }
    if (!horario) {
      mostrarError("Elegí un horario.");
      return;
    }

    setGuardandoTurno(true);
    try {
      const { ok, data } = await api("/turnos", {
        method: "POST",
        body: JSON.stringify({
          doctorId: doctorSel._id,
          doctorNombre: doctorSel.nombre,
          fecha,
          horario,
          ...paciente,
        }),
      });
      if (!ok) {
        mostrarError(data.mensaje || "No se pudo agendar el turno.");
        cargarOcupados(fecha);
        return;
      }
      mostrarExito(`Turno agendado: ${paciente.pacienteNombre}, ${formatFecha(fecha)} - ${horario}.`);
      setPaciente(PACIENTE_VACIO);
      setHorario(doctorSel.sinTurno ? POR_ORDEN : "");
      cargarOcupados(fecha);
      cargarTurnos();
    } catch {
      mostrarError("Error de conexión con el servidor. Intentá nuevamente.");
    } finally {
      setGuardandoTurno(false);
    }
  };

  const abrirReprogramar = (turno) => {
    setTurnoReprogramar(turno);
    setRepFecha(turno.fecha);
    setRepHorario(turno.horario);
  };

  const guardarReprogramacion = async () => {
    if (!repFecha || !repHorario) {
      mostrarError("Completá la nueva fecha y horario.");
      return;
    }
    if (!atiendeEseDia(doctorSel, repFecha)) {
      mostrarError(`El doctor no atiende ese día. Atiende: ${textoDias(doctorSel.diasAtencion)}.`);
      return;
    }
    try {
      const { ok, data } = await api(`/turnos/${turnoReprogramar._id}`, {
        method: "PUT",
        body: JSON.stringify({ fecha: repFecha, horario: repHorario }),
      });
      if (!ok) {
        mostrarError(data.mensaje || "No se pudo reprogramar el turno.");
        return;
      }
      const t = turnoReprogramar;
      setTurnoReprogramar(null);
      cargarTurnos();
      if (fecha) cargarOcupados(fecha);

      // avisar al paciente por WhatsApp (igual que el panel del doctor)
      const mensaje = `Hola ${t.pacienteNombre}.\n\nSu turno con ${doctorSel.nombre} fue reprogramado.\n\nNueva fecha: ${formatFecha(repFecha)}\nNuevo horario: ${repHorario}\n\nSaludos.`;
      window.open(`https://wa.me/${t.telefono}?text=${encodeURIComponent(mensaje)}`, "_blank");
    } catch {
      mostrarError("Error de conexión con el servidor. Intentá nuevamente.");
    }
  };

  const confirmarEliminar = async () => {
    try {
      const { ok, data } = await api(`/turnos/${turnoEliminar._id}`, { method: "DELETE" });
      if (!ok) {
        mostrarError(data.mensaje || "No se pudo cancelar el turno.");
        return;
      }
      setTurnoEliminar(null);
      cargarTurnos();
      if (fecha) cargarOcupados(fecha);
    } catch {
      mostrarError("Error de conexión con el servidor. Intentá nuevamente.");
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem("secretariaId");
    localStorage.removeItem("secretariaNombre");
    navigate("/doctor/login");
  };

  // ===== EFECTOS =====

  useEffect(() => {
    if (!secretariaId) {
      navigate("/doctor/login");
      return;
    }
    cargarDoctores();
  }, [secretariaId, navigate, cargarDoctores]);

  useEffect(() => {
    setTurnos([]);
    cargarTurnos();
  }, [cargarTurnos]);

  useEffect(() => {
    const abierto = modalDoctor || turnoReprogramar || turnoEliminar || doctorEliminar;
    if (!abierto) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setModalDoctor(null);
        setTurnoReprogramar(null);
        setTurnoEliminar(null);
        setDoctorEliminar(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [modalDoctor, turnoReprogramar, turnoEliminar, doctorEliminar]);

  const hoy = hoyISO();
  const turnosVisibles = turnos.filter((t) => verPasados || t.fecha >= hoy);

  // ===== RENDER =====

  return (
    <div className="doctor-panel-wrapper">
      <div className="doctor-panel-container">

        <h1 className="doctor-panel-title">Panel de Secretaría</h1>
        <h2 className="doctor-panel-subtitle">{secretariaNombre}</h2>

        <div className="doctor-panel-buttons">
          <button className="btn-volver" onClick={() => navigate("/")}>
            Volver al inicio
          </button>
          <button className="btn-logout" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        </div>

        {/* ===== DOCTORES ===== */}
        <h3 className="secretaria-seccion-titulo">Mis doctores</h3>

        {cargandoDoctores ? (
          <p className="secretaria-vacio">Cargando...</p>
        ) : (
          <div className="secretaria-doctores">
            {doctores.map((doc) => (
              <div
                key={doc._id}
                className={`secretaria-doctor-card ${doctorSel?._id === doc._id ? "activo" : ""}`}
                onClick={() => seleccionarDoctor(doc)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && seleccionarDoctor(doc)}
              >
                <FaUserMd className="secretaria-doctor-icono" />
                <div className="secretaria-doctor-nombre">{doc.nombre}</div>
                <div className="secretaria-doctor-esp">{doc.especialidad}</div>
                <div className="secretaria-doctor-dias">{textoDias(doc.diasAtencion)}</div>
                <div className="secretaria-doctor-dias">
                  {doc.sinTurno ? POR_ORDEN : `${doc.horarios.length} ${doc.horarios.length === 1 ? "horario" : "horarios"}`}
                </div>
                <div className="secretaria-doctor-acciones">
                  <button
                    className="secretaria-btn-editar"
                    onClick={(e) => {
                      e.stopPropagation();
                      abrirEditarDoctor(doc);
                    }}
                  >
                    <FaEdit /> Editar
                  </button>
                  <button
                    className="secretaria-btn-eliminar"
                    onClick={(e) => {
                      e.stopPropagation();
                      pedirEliminarDoctor(doc);
                    }}
                  >
                    <FaTrash /> Eliminar
                  </button>
                </div>
              </div>
            ))}

            {doctores.length < MAX_DOCTORES && (
              <button className="secretaria-doctor-card secretaria-doctor-nuevo" onClick={abrirCrearDoctor}>
                <FaPlus className="secretaria-doctor-icono" />
                <div className="secretaria-doctor-nombre">Agregar doctor</div>
                <div className="secretaria-doctor-dias">
                  {doctores.length} de {MAX_DOCTORES}
                </div>
              </button>
            )}
          </div>
        )}

        {!cargandoDoctores && doctores.length > 0 && !doctorSel && (
          <p className="secretaria-vacio">Elegí un doctor para ver y agendar sus turnos.</p>
        )}

        {doctorSel && (
          <>
            {/* ===== AGENDAR ===== */}
            <h3 className="secretaria-seccion-titulo">
              Agendar turno · {doctorSel.nombre}
            </h3>

            <form className="secretaria-agendar" onSubmit={agendarTurno}>
              <div className="secretaria-agendar-fecha">
                <label>
                  Fecha
                  <input
                    type="date"
                    value={fecha}
                    min={hoy}
                    onChange={(e) => cambiarFecha(e.target.value)}
                    required
                  />
                </label>
                <small>Atiende: {textoDias(doctorSel.diasAtencion)}</small>
                {fecha && !atiendeEseDia(doctorSel, fecha) && (
                  <small className="secretaria-aviso">El doctor no atiende ese día.</small>
                )}
              </div>

              {fecha && atiendeEseDia(doctorSel, fecha) && (
                doctorSel.sinTurno ? (
                  <p className="secretaria-orden">Atiende por orden de llegada.</p>
                ) : (
                  <div className="secretaria-horarios">
                    {doctorSel.horarios.map((h) => {
                      const ocupado = ocupados.includes(h);
                      return (
                        <button
                          key={h}
                          type="button"
                          disabled={ocupado}
                          className={`secretaria-horario ${horario === h ? "activo" : ""} ${ocupado ? "ocupado" : ""}`}
                          onClick={() => setHorario(h)}
                        >
                          {h}
                        </button>
                      );
                    })}
                  </div>
                )
              )}

              <div className="secretaria-agendar-campos">
                <input name="pacienteNombre" placeholder="Nombre y apellido del paciente" value={paciente.pacienteNombre} onChange={cambiarPaciente} required />
                <input name="dni" placeholder="DNI" value={paciente.dni} onChange={cambiarPaciente} required />
                <input name="telefono" placeholder="Teléfono" value={paciente.telefono} onChange={cambiarPaciente} required />
                <input name="email" type="email" placeholder="Email (opcional)" value={paciente.email} onChange={cambiarPaciente} />
                <input name="observacion" placeholder="Observación (opcional)" value={paciente.observacion} onChange={cambiarPaciente} className="secretaria-campo-ancho" />
              </div>

              <button type="submit" className="btn-guardar secretaria-btn-agendar" disabled={guardandoTurno}>
                {guardandoTurno ? "Agendando..." : horario ? `Agendar turno (${horario})` : "Agendar turno"}
              </button>
            </form>

            {/* ===== TURNOS AGENDADOS ===== */}
            <div className="secretaria-turnos-header">
              <h3 className="secretaria-seccion-titulo">Turnos agendados</h3>
              <label className="secretaria-ver-pasados">
                <input type="checkbox" checked={verPasados} onChange={(e) => setVerPasados(e.target.checked)} />
                Mostrar turnos pasados
              </label>
            </div>

            {turnosVisibles.length === 0 ? (
              <p className="secretaria-vacio">No hay turnos agendados.</p>
            ) : (
              <div className="doctor-turnos-list">
                {turnosVisibles.map((turno) => (
                  <div key={turno._id} className={`turno-item ${turno.fecha < hoy ? "secretaria-turno-pasado" : ""}`}>
                    <div className="turno-fecha">{formatFecha(turno.fecha)}</div>
                    <div className="turno-hora">{turno.horario}</div>
                    <div className="turno-info">
                      <p><strong>Paciente:</strong> {turno.pacienteNombre}</p>
                      <p><strong>DNI:</strong> {turno.dni}</p>
                      <p><strong>Teléfono:</strong> {turno.telefono}</p>
                      {turno.email && <p><strong>Email:</strong> {turno.email}</p>}
                      {turno.observacion && <p><strong>Observación:</strong> {turno.observacion}</p>}
                      <p className="secretaria-origen">
                        {turno.origen === "secretaria" ? "Cargado por secretaría" : "Reservado por la web"}
                      </p>
                    </div>
                    <div className="acciones">
                      <button className="btn-reprogramar" onClick={() => abrirReprogramar(turno)}>
                        <FaCalendarAlt /> Reprogramar
                      </button>
                      <button className="btn-delete" onClick={() => setTurnoEliminar(turno)} aria-label="Cancelar turno">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* ===== MODAL DOCTOR ===== */}
      {modalDoctor && (
        <div className="modal-overlay" onClick={() => setModalDoctor(null)}>
          <form
            className="modal-reprogramar secretaria-modal-doctor"
            onClick={(e) => e.stopPropagation()}
            onSubmit={guardarDoctor}
          >
            <h2>{modalDoctor.modo === "crear" ? "Agregar doctor" : "Editar doctor"}</h2>

            <input
              placeholder="Nombre (ej: Dra. Pérez Ana)"
              value={modalDoctor.datos.nombre}
              onChange={(e) => cambiarDatoDoctor("nombre", e.target.value)}
              required
            />
            <input
              placeholder="Especialidad"
              value={modalDoctor.datos.especialidad}
              onChange={(e) => cambiarDatoDoctor("especialidad", e.target.value)}
              required
            />
            {modalDoctor.modo === "crear" ? (
              <input
                type="email"
                placeholder="Email del doctor"
                value={modalDoctor.datos.email}
                onChange={(e) => cambiarDatoDoctor("email", e.target.value)}
                required
              />
            ) : (
              <p className="secretaria-email-fijo">{modalDoctor.datos.email}</p>
            )}

            <p className="secretaria-label">Días de atención (sin marcar = todos)</p>
            <div className="secretaria-dias">
              {DIAS.map((d) => (
                <button
                  key={d.valor}
                  type="button"
                  title={d.largo}
                  className={`secretaria-dia ${modalDoctor.datos.diasAtencion.includes(d.valor) ? "activo" : ""}`}
                  onClick={() => alternarDia(d.valor)}
                >
                  {d.corto}
                </button>
              ))}
            </div>

            <label className="secretaria-check">
              <input
                type="checkbox"
                checked={modalDoctor.datos.sinTurno}
                onChange={(e) => cambiarDatoDoctor("sinTurno", e.target.checked)}
              />
              Atiende por orden de llegada (sin horarios fijos)
            </label>

            {!modalDoctor.datos.sinTurno && (
              <>
                <p className="secretaria-label">Horarios</p>
                <div className="secretaria-horarios-edit">
                  {modalDoctor.datos.horarios.map((h) => (
                    <span key={h} className="secretaria-chip">
                      {h}
                      <button type="button" onClick={() => quitarHorario(h)} aria-label={`Quitar ${h}`}>
                        <FaTimes />
                      </button>
                    </span>
                  ))}
                  {modalDoctor.datos.horarios.length === 0 && (
                    <small>Todavía no hay horarios.</small>
                  )}
                </div>
                <div className="secretaria-agregar-horario">
                  <input type="time" value={nuevoHorario} onChange={(e) => setNuevoHorario(e.target.value)} />
                  <button type="button" className="btn-reprogramar" onClick={agregarHorario}>
                    <FaPlus /> Agregar
                  </button>
                </div>
              </>
            )}

            <div className="modal-botones">
              <button type="button" className="btn-cancelar" onClick={() => setModalDoctor(null)}>
                Cancelar
              </button>
              <button type="submit" className="btn-guardar" disabled={guardandoDoctor}>
                {guardandoDoctor ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ===== MODAL REPROGRAMAR ===== */}
      {turnoReprogramar && (
        <div className="modal-overlay" onClick={() => setTurnoReprogramar(null)}>
          <div className="modal-reprogramar" onClick={(e) => e.stopPropagation()}>
            <h2>Reprogramar turno</h2>
            <p><strong>Paciente:</strong> {turnoReprogramar.pacienteNombre}</p>

            <input type="date" value={repFecha} min={hoy} onChange={(e) => setRepFecha(e.target.value)} />
            {repFecha && !atiendeEseDia(doctorSel, repFecha) && (
              <small className="secretaria-aviso">El doctor no atiende ese día.</small>
            )}

            {doctorSel.sinTurno ? (
              <p>{POR_ORDEN}</p>
            ) : (
              <select value={repHorario} onChange={(e) => setRepHorario(e.target.value)} className="secretaria-select">
                {!doctorSel.horarios.includes(repHorario) && <option value={repHorario}>{repHorario}</option>}
                {doctorSel.horarios.map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            )}

            <div className="modal-botones">
              <button className="btn-cancelar" onClick={() => setTurnoReprogramar(null)}>Cancelar</button>
              <button className="btn-guardar" onClick={guardarReprogramacion}>Guardar cambios</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL CANCELAR TURNO ===== */}
      {turnoEliminar && (
        <div className="modal-overlay" onClick={() => setTurnoEliminar(null)}>
          <div className="modal-eliminar" onClick={(e) => e.stopPropagation()}>
            <h2>Cancelar turno</h2>
            <p>¿Seguro que querés cancelar este turno?</p>
            <div className="modal-eliminar-datos">
              <p><strong>Paciente:</strong> {turnoEliminar.pacienteNombre}</p>
              <p><strong>Fecha:</strong> {formatFecha(turnoEliminar.fecha)}</p>
              <p><strong>Horario:</strong> {turnoEliminar.horario}</p>
            </div>
            <div className="modal-botones">
              <button className="btn-cancelar" onClick={() => setTurnoEliminar(null)}>Volver</button>
              <button className="btn-eliminar-confirm" onClick={confirmarEliminar}>Cancelar turno</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL ELIMINAR DOCTOR ===== */}
      {doctorEliminar && (
        <div className="modal-overlay" onClick={() => setDoctorEliminar(null)}>
          <div className="modal-eliminar" onClick={(e) => e.stopPropagation()}>
            <h2>Eliminar doctor</h2>
            <p>¿Seguro que querés eliminar a este doctor de tu lista?</p>
            <div className="modal-eliminar-datos">
              <p><strong>Doctor:</strong> {doctorEliminar.doctor.nombre}</p>
              <p><strong>Especialidad:</strong> {doctorEliminar.doctor.especialidad}</p>
            </div>
            {doctorEliminar.turnosProximos > 0 ? (
              <p className="secretaria-aviso-eliminar">
                Tiene {doctorEliminar.turnosProximos}{" "}
                {doctorEliminar.turnosProximos === 1 ? "turno próximo que se va a cancelar" : "turnos próximos que se van a cancelar"}.
                Avisale a los pacientes antes de eliminarlo.
              </p>
            ) : (
              <p>No tiene turnos próximos. Los turnos pasados quedan guardados como historial.</p>
            )}
            <div className="modal-botones">
              <button className="btn-cancelar" onClick={() => setDoctorEliminar(null)}>Volver</button>
              <button className="btn-eliminar-confirm" onClick={confirmarEliminarDoctor} disabled={eliminandoDoctor}>
                {eliminandoDoctor ? "Eliminando..." : "Eliminar doctor"}
              </button>
            </div>
          </div>
        </div>
      )}

      <AlertModal
        open={alerta.open}
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        onClose={cerrarAlerta}
      />
    </div>
  );
}
