# 🚀 PLAN FEATURES v3.0 — Órdenes + Branding + Documentos

**Objetivo:** Módulo completo para generar órdenes automáticas con branding por doctor

---

## 📋 DOCUMENTOS A AUTOMATIZAR (del PDF)

### 1. Pre-Orden de Presupuesto
```
Campos que se rellenan automáticamente:
- Doctor: Dra. Kristal M. Torrado Rico
- Especialidad: Urología
- RUT: 26.206.551-0
- Paciente: Nombre, RUT, Edad
- Previsión, Teléfono, Correo
- Diagnóstico: [campo manual]
- Plan/Cirugía: [campo manual - NUEVO]
- Código PAD: [automático según cirugía]
- Anestesia: [según cirugía]
```

### 2. Orden de Exámenes Preoperatorios
```
Campos automáticos:
- Doctor: [con branding/logo]
- Paciente: Nombre, RUT, Edad
- Exámenes: [calculados automáticamente según edad, HTA, DM2, cirugía]
- Firma: [espacio para doctor]
- Fecha: [automática]
```

### 3. Orden Electrocardiograma
```
Campos automáticos:
- Doctor: [con branding/logo]
- Paciente: Nombre, RUT, Edad
- Indicaciones: [automáticas según cirugía]
- Fecha: [automática]
```

---

## 🎯 ARQUITECTURA DE SOLUCIÓN

### OPCIÓN A: Todo en una app (simple)
```
Mismo CRM triage-engine-prod.vercel.app
├─ Agregar field: "Plan o Cirugía Propuesta" en pacientes
├─ Agregar sección: "Generar Órdenes" (genera PDFs)
├─ PDFs se guardan en Drive/Storage
└─ Ver documentos con 1 click desde dashboard
```

**Pros:** Una sola app, fácil de usar  
**Contras:** PDFs generados localmente (html2pdf tiene limitaciones)

---

### OPCIÓN B: App separada para órdenes (profesional)
```
App 1: triage-engine-prod (CRM - gestión pacientes)
App 2: triage-ordenes.vercel.app (generador de órdenes)
        ├─ Carga datos del paciente
        ├─ Vista previa de órdenes con branding
        ├─ Descarga PDF o imprime
        └─ Guarda en Drive automáticamente

Flujo:
1. Doctor agrega paciente en CRM
2. Click en "Generar Órdenes"
3. Abre triage-ordenes.vercel.app
4. Muestra órdenes prellenadas
5. Doctor ajusta si es necesario
6. Descarga/imprime/guarda en Drive
7. Automáticamente se registra en CRM como "enviado"
```

**Pros:** Separación de concerns, reutilizable, profesional  
**Contras:** Dos apps, un poco más complejo

---

## 🔄 FLUJO COMPLETO (RECOMENDADO: OPCIÓN B)

```
PASO 1: Doctor agrega paciente
┌─────────────────────────────┐
│ Nuevo Paciente              │
├─────────────────────────────┤
│ Nombre: Juan Pérez          │
│ RUT: 15.234.567-8           │
│ Edad: 45                    │
│ HTA: Sí                     │
│ DM2: No                     │
│ 🆕 Cirugía: Vasectomía ← NUEVO
│ 🆕 Previsión: Isapre ← (opcional, PAD)
│ [Guardar]                   │
└─────────────────────────────┘

PASO 2: Ver paciente + opción "Generar Órdenes"
┌─────────────────────────────────────┐
│ Juan Pérez (15.234.567-8)           │
├─────────────────────────────────────┤
│ Edad: 45 | HTA: Sí | Cirugía: Vasc. │
│ [Editar] [Generar Órdenes] [Notas]  │
└─────────────────────────────────────┘

PASO 3: Click "Generar Órdenes" → abre triage-ordenes.vercel.app
┌──────────────────────────────────────────────────┐
│ ÓRDENES PREOPERATORIAS - Dra. Kristal Torrado R.│
├──────────────────────────────────────────────────┤
│                                                  │
│ ✅ Pre-Orden de Presupuesto                      │
│ ✅ Orden de Exámenes                             │
│ ✅ Orden EKG                                     │
│ (+ otras según cirugía/edad)                    │
│                                                  │
│ [Vista Previa] [Descargar PDF] [Imprimir]      │
│ [Guardar en Drive] [Registrar como Enviado]    │
└──────────────────────────────────────────────────┘

PASO 4: Doctor descarga/imprime
└─ PDFs con branding Dra. Kristal
└─ Automáticamente guardados en Drive
└─ Registro actualizado en CRM
```

---

## 📊 IMPLEMENTACIÓN (PRIORIDADES)

### SPRINT 1 (1-2 días): Campos mínimos
```
✅ Agregar "Cirugía Propuesta" a pacientes
✅ Crear sección "Órdenes" en dashboard
✅ Mostrar botón "Ver Documentos" (1 click)
✅ Listar documentos guardados (tabla simple)
```

### SPRINT 2 (2-3 días): Generador básico
```
✅ Crear app separada triage-ordenes.vercel.app
✅ Recibir datos del paciente (via URL o API)
✅ Generar Pre-Orden de Presupuesto (HTML → PDF)
✅ Generar Orden de Exámenes (HTML → PDF)
✅ Descargar PDF
```

### SPRINT 3 (1-2 días): Branding + automático
```
✅ Cargar logo/branding del doctor
✅ Rellenar automáticamente según cirugía
✅ Guardar en Drive automáticamente
✅ Actualizar CRM (marcar como "enviado")
```

### SPRINT 4+ (Futuro): Refinamientos
```
⏳ Múltiples órdenes (según edad/comorbilidades)
⏳ Integración WhatsApp (enviar órdenes)
⏳ Historial de versiones
⏳ Firma digital
```

---

## 🛠️ DECISIÓN: ¿CUÁL CAMINO?

### OPCIÓN A (Todo en una app)
**Recomendación:** SI necesitas algo RÁPIDO esta semana  
**Implementación:** 1-2 días

### OPCIÓN B (App separada - RECOMENDADO)
**Recomendación:** SI quieres algo PROFESIONAL y escalable  
**Implementación:** 3-4 días  
**Beneficio:** Reutilizable, más limpio, mejor UX

---

## 📝 PRÓXIMOS PASOS

1. **Elige opción:** A (rápido) o B (profesional)
2. **Validar con clienta:** ¿Qué documentos necesita además de los 3?
3. **Comenzar implementación:**
   - Primero: Agregar "Cirugía Propuesta" a pacientes
   - Segundo: Mostrar documentos con 1 click
   - Tercero: Generador de órdenes

---

## 💡 VENTAJA COMPETITIVA

Lo que te hace diferente de GHL/Prometheo:

```
GHL:        "Gestiona leads genéricos"
Prometheo:  "Gestiona pacientes médicos"
Triage:     "Genera órdenes automáticas con branding"
            ↓
            = Doctor no toca nada, todo fluye
            = Documentos profesionales con logo
            = Ahorro 3-4 horas por paciente
```

**ESO es lo brutal.**

---

**¿CUÁL CAMINO: A o B? 🚀**
