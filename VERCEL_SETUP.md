# 🚀 CONECTAR A VERCEL (5 MINUTOS)

Tu código está en GitHub: https://github.com/aleormenod/triage-engine-prod

Ahora necesitas conectarlo a Vercel para que sea público y con HTTPS.

---

## OPCIÓN 1: Import directo (MÁS RÁPIDO - RECOMENDADO)

1. **Abre esta URL:**
   ```
   https://vercel.com/import/project?repo=aleormenod/triage-engine-prod
   ```

2. **Vercel te pregunta:**
   - "Login with GitHub" → Acepta
   - "Select repository" → Debería estar preseleccionado
   - Click "Import"

3. **Configuración:**
   - Project Name: `triage-engine-prod`
   - Root Directory: `.` (dejar como está)
   - Environment Variables: Ninguno (skip)
   - Click "Deploy"

4. **Espera 30-60 segundos**
   - Vercel despliega automáticamente

5. **Tu URL pública:**
   ```
   https://triage-engine-prod.vercel.app
   ```

---

## OPCIÓN 2: Manual en vercel.com

1. Ve a https://vercel.com
2. Crea cuenta / Login
3. Click "New Project"
4. "Import Git Repository" → Selecciona `triage-engine-prod`
5. Click "Deploy"
6. Espera 30-60 segundos
7. Listo ✅

---

## VERIFICAR QUE FUNCIONA

Una vez deployado:

1. Abre: https://triage-engine-prod.vercel.app
2. Deberías ver login selector de usuarios
3. Click en "Admin"
4. Dashboard carga ✅

---

## AUTO-DEPLOY (FUTURO)

Cada vez que hagas `git push` a main:
- Vercel automáticamente redeploya
- Sin hacer nada más
- URL siempre la misma

---

**¿Listo? Hazlo ahora y dame la URL pública cuando esté vivo 🚀**
