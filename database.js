// ═══════════════════════════════════════════════════════════════════════════
// TRIAGE ENGINE v3.0 — Multi-Tenant Database
// ═══════════════════════════════════════════════════════════════════════════

const DB = {
  // Obtener usuario actual en sesión
  getUsuarioActual() {
    const usuarioId = localStorage.getItem('usuario_actual');
    if (!usuarioId) return null;
    return this.getUsuario(usuarioId);
  },

  // Obtener usuario por ID
  getUsuario(usuarioId) {
    if (usuarioId === 'admin') {
      return this.getAdmin();
    }
    const usuarios = this.getTodosLosUsuarios();
    return usuarios.find(u => u.id === usuarioId);
  },

  // Admin (TÚ)
  getAdmin() {
    const admin = localStorage.getItem('triage_admin');
    return admin ? JSON.parse(admin) : null;
  },

  setAdmin(admin) {
    localStorage.setItem('triage_admin', JSON.stringify(admin));
  },

  // Obtener TODOS los usuarios (solo admin)
  getTodosLosUsuarios() {
    const doctores = localStorage.getItem('triage_doctores');
    return doctores ? JSON.parse(doctores) : [];
  },

  setTodosLosUsuarios(usuarios) {
    localStorage.setItem('triage_doctores', JSON.stringify(usuarios));
  },

  // Crear nuevo doctor (admin only)
  crearDoctor(nuevoDoctor) {
    const usuarios = this.getTodosLosUsuarios();
    nuevoDoctor.id = 'doc-' + Date.now();
    nuevoDoctor.estado = 'ACTIVO';
    nuevoDoctor.fechaPago = new Date().toISOString().split('T')[0];
    nuevoDoctor.proximoPago = this.agregarMeses(new Date(), 1).toISOString().split('T')[0];
    usuarios.push(nuevoDoctor);
    this.setTodosLosUsuarios(usuarios);
    return nuevoDoctor;
  },

  // Obtener pacientes (filtrados por usuario)
  getPacientes(usuarioId = null) {
    const pacientes = localStorage.getItem('triage_pacientes');
    let todos = pacientes ? JSON.parse(pacientes) : [];

    if (usuarioId === 'admin') {
      return todos; // Admin ve todos
    }

    if (usuarioId) {
      return todos.filter(p => p.doctorId === usuarioId);
    }

    // Por defecto: pacientes del usuario actual
    const usuarioActual = this.getUsuarioActual();
    if (!usuarioActual) return [];

    if (usuarioActual.id === 'admin') {
      return todos;
    }

    return todos.filter(p => p.doctorId === usuarioActual.id);
  },

  setPacientes(pacientes) {
    localStorage.setItem('triage_pacientes', JSON.stringify(pacientes));
  },

  // Agregar paciente
  agregarPaciente(paciente) {
    const pacientes = this.getPacientes('admin'); // Obtener todos
    paciente.id = 'pac-' + Date.now();
    paciente.doctorId = paciente.doctorId || this.getUsuarioActual().id;
    paciente.fecha_entrada = new Date().toISOString().split('T')[0];
    pacientes.push(paciente);
    this.setPacientes(pacientes);
    return paciente;
  },

  // Obtener documentos (órdenes enviadas)
  getDocumentos(usuarioId = null) {
    const documentos = localStorage.getItem('triage_documentos');
    let todos = documentos ? JSON.parse(documentos) : [];

    if (usuarioId === 'admin') {
      return todos;
    }

    if (usuarioId) {
      return todos.filter(d => d.doctorId === usuarioId);
    }

    const usuarioActual = this.getUsuarioActual();
    if (!usuarioActual) return [];

    if (usuarioActual.id === 'admin') {
      return todos;
    }

    return todos.filter(d => d.doctorId === usuarioActual.id);
  },

  setDocumentos(documentos) {
    localStorage.setItem('triage_documentos', JSON.stringify(documentos));
  },

  // Agregar documento (orden)
  agregarDocumento(documento) {
    const documentos = this.getDocumentos('admin');
    documento.id = 'doc-' + Date.now();
    documento.doctorId = documento.doctorId || this.getUsuarioActual().id;
    documento.fecha = new Date().toLocaleString('es-CL');
    documento.estado = 'Enviado';
    documentos.push(documento);
    this.setDocumentos(documentos);
    return documento;
  },

  // Calcular ingresos por doctor
  getIngresosPorDoctor(doctorId) {
    const pacientes = this.getPacientes('admin');
    const operados = pacientes.filter(
      p => p.doctorId === doctorId && p.etapa === 'Operado' && p.honorarios
    );
    return operados.reduce((sum, p) => sum + (p.honorarios || 0), 0);
  },

  // Calcular ingresos totales (admin)
  getIngresosTotales() {
    const doctores = this.getTodosLosUsuarios();
    return doctores.reduce((sum, doc) => sum + this.getIngresosPorDoctor(doc.id), 0);
  },

  // Helper: agregar meses
  agregarMeses(fecha, meses) {
    const nuevaFecha = new Date(fecha);
    nuevaFecha.setMonth(nuevaFecha.getMonth() + meses);
    return nuevaFecha;
  },

  // Inicializar con datos de demostración
  inicializarDatos() {
    // Admin
    if (!this.getAdmin()) {
      this.setAdmin({
        id: 'admin',
        nombre: 'Alejandro Ormeño',
        email: 'aleormenod@gmail.com',
        rol: 'ADMIN_PLATAFORMA',
        password: 'admin123' // Demo only
      });
    }

    // Doctores
    if (this.getTodosLosUsuarios().length === 0) {
      this.crearDoctor({
        nombre: 'Dra. Kristal M. Torrado Rico',
        email: 'dra.kristal@clinica.cl',
        especialidad: 'Urología',
        rut: '26.206.551-0',
        password: 'kristal123'
      });
      this.crearDoctor({
        nombre: 'Dr. Carlos Pérez Medina',
        email: 'dr.carlos@clinica.cl',
        especialidad: 'Cirugía Plástica',
        rut: '15.234.567-8',
        password: 'carlos123'
      });
      this.crearDoctor({
        nombre: 'Dra. Rosario González López',
        email: 'dra.rosario@clinica.cl',
        especialidad: 'Cirugía Bariátrica',
        rut: '18.765.432-9',
        password: 'rosario123'
      });
    }

    // Pacientes
    if (this.getPacientes('admin').length === 0) {
      const doctores = this.getTodosLosUsuarios();
      const pacientesIniciales = [
        { nombre: 'Carlos Medina', rut: '15.234.567-8', edad: 45, prevision: 'Isapre', doctorId: doctores[0].id, etapa: 'Operado', temperatura: 'Caliente', hta: 'Sí', dm2: 'No', honorarios: 5000 },
        { nombre: 'María González', rut: '18.765.432-9', edad: 38, prevision: 'Fonasa', doctorId: doctores[0].id, etapa: 'Exámenes OK', temperatura: 'Caliente', hta: 'No', dm2: 'Sí', honorarios: 0 },
        { nombre: 'Roberto Silva', rut: '19.123.456-7', edad: 52, prevision: 'Isapre', doctorId: doctores[1].id, etapa: 'Programado', temperatura: 'Tibio', hta: 'Sí', dm2: 'Sí', honorarios: 6000 },
        { nombre: 'Ana López', rut: '20.234.567-8', edad: 42, prevision: 'Fonasa', doctorId: doctores[1].id, etapa: 'Órdenes enviadas', temperatura: 'Caliente', hta: 'No', dm2: 'No', honorarios: 0 },
        { nombre: 'Diego Torres', rut: '21.345.678-9', edad: 55, prevision: 'Isapre', doctorId: doctores[2].id, etapa: 'Operado', temperatura: 'Caliente', hta: 'Sí', dm2: 'Sí', honorarios: 8000 }
      ];
      pacientesIniciales.forEach(p => this.agregarPaciente(p));
    }
  }
};

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', () => {
  DB.inicializarDatos();
});
