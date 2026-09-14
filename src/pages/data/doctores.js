export const doctores = [
  // CLÍNICA GENERAL (Camila: Medicina Estética / Cirugía General, agenda compartida)
  {
    id: 1,
    especialidad: "clinica",
    especialidades: ["Medicina Estética", "Cirugía General"],
    nombre: "Dra. Contrera Camila",
    mongoId: "6aa85927e79f6ff7ce1f38e4", // 👈 ID REAL
    // Campo opcional: URL externa de la foto del médico.
    // Si no está definido, la tarjeta muestra el ícono genérico de siempre.
    foto: "https://i.postimg.cc/kMFw5j0F/camila-contreras-jpg.jpg",
    diasAtencion: [3], // 👈 solo miércoles
    horarios: ["10:30", "11:30", "12:30", "13:30", "14:30"],
    avisoHorario: "Los miércoles atiende desde 14:00 a 16:30 hs.",
  },

  // NUTRICIÓN
  {
    id: 2,
    especialidad: "nutricion",
    especialidades: ["Nutrición Deportiva y Clínica", "Antropometría"],
    nombre: "Lic. Amran Milagro",
    mongoId: "6aa1b4e07267d3d152f8814c", // 👈 ID REAL de Amran
    foto: "https://i.postimg.cc/zBxR6P25/nutricionista.jpg",
    diasAtencion: [2, 4], // 👈 martes y jueves
    horarios: [
      "15:00", "15:30", "16:00", "16:30",
      "17:00", "17:30", "18:00", "18:30",
    ],
     avisoHorario: "Los martes y jueves atiende desde las 15:00 a 19:00 hs.",
  },

   // GINECOLOGÍA
  {
    id: 3,
    especialidad: "ginecologia",
    nombre: "Dra. Linares María Virginia",
    mongoId: "6aa1be6e7267d3d152f8814f", // 👈 ID REAL de Linares
    foto: "https://i.postimg.cc/fLCxZbyL/Linares.jpg",
    diasAtencion: [3], // 👈 solo miércoles
    horarios: [
      "17:00", "17:20", "17:40", "18:00", "18:20",
      "18:40", "19:00", "19:20", "19:40",
    ],
    avisoHorario: "Los miércoles atiende de 17:00 a 20:00 hs.",
  },

  // CIRUGÍA GENERAL (Saracho: Cirugía General / Coloproctología, agenda compartida)
  {
    id: 4,
    especialidad: "cirugia",
    especialidades: ["Cirugía General", "Coloproctología"],
    nombre: "Dra. Saracho María Belén",
    mongoId: "6aa1c0a07267d3d152f88152", // 👈 ID REAL de Saracho
    foto: "https://i.postimg.cc/cJJ9PPXw/Saracho-Maria-Belen.jpg",
    diasAtencion: [6], // 👈 solo sábado
    horarios: ["09:30", "09:50", "10:10", "10:30", "10:50", "11:10"],
    avisoHorario: "Los sábados atiende de 9:30 a 11:30 hs.",
  },

  // TRAUMATOLOGÍA (Pérez De Nucci: por orden de llegada, sin turno fijo)
  {
    id: 5,
    especialidad: "traumatologia",
    nombre: "Dr. Evaristo Pérez De Nucci",
    mongoId: "6aa1ca057267d3d152f88155", // 👈 ID REAL de Pérez De Nucci
    foto: "https://i.postimg.cc/DZxB66qv/Evaristo-Perez-De-Nucci.jpg",
    diasAtencion: [2, 5], // 👈 martes y viernes
    sinTurno: true, // 👈 no usa horarios fijos, es por orden de llegada
    horarios: [], // sin horarios, ver "sinTurno"
    avisoHorario: "Martes y Viernes de 9:00 a 11:30 hs. Por orden de llegada, sin necesidad de reservar turno.",
  },

  // CIRUGÍA LAPAROSCÓPICA (categoría nueva)
  {
    id: 6,
    especialidad: "laparoscopica",
    nombre: "Dr. Gustavo Alberto Antonio Yapur Navarro",
    mongoId: "6aa8471fe79f6ff7ce1f38b0", // 👈 ID REAL de Yapur Navarro
    foto: "https://i.postimg.cc/rmgM9Bnd/Gustavo-Alberto-Antonio-yapur-Navarro.jpg",
    diasAtencion: [1], // 👈 solo lunes (consultorio)
    horarios: [
      "16:30", "16:45", "17:00", "17:15", "17:30", "17:45",
      "18:00", "18:15", "18:30", "18:45", "19:00", "19:15",
      "19:30", "19:45",
    ],
    avisoHorario: "Consultorio los lunes de 16:30 a 20:00 hs.",
  },

  // CARDIOLOGÍA (Andía Gonzalez: por orden de llegada, sin turno fijo)
  {
    id: 7,
    especialidad: "cardiologia",
    nombre: "Dra. Valery Andía Gonzalez",
    mongoId: "6aa84a84e79f6ff7ce1f38c2", // 👈 ID REAL de Andía Gonzalez
    foto: "https://i.postimg.cc/5NMB8XXW/Valery-Andia-Gonzalez.jpg",
    diasAtencion: [3, 5, 6], // 👈 miércoles, viernes y sábado
    sinTurno: true, // 👈 no usa horarios fijos, es por orden de llegada
    horarios: [], // sin horarios, ver "sinTurno"
    avisoHorario: "Miércoles de 19:00 a 20:00 hs, Viernes de 19:00 a 21:00 hs y Sábados de 11:00 a 12:00 hs. Por orden de llegada.",
  },

];

