# Triage Engine CRM v3.0

Sistema multi-tenant de gestión de pacientes para cirugía electiva.

## Características
- Dashboard dual (Admin + Doctor)
- Gestión de pacientes aislada por usuario
- Órdenes Bono PAD automáticas
- Dashboard de finanzas
- iOS PWA (instalar sin App Store)
- Multi-usuario por workspace

## Deploy
- URL: https://triage-engine-prod.vercel.app
- Auto-deploy en cada push a main
- No requiere build

## Estructura
- index.html: Aplicación completa
- vercel.json: Config de deployment
- package.json: Metadata

## Desarrollo local
```bash
npm install -g http-server
http-server -p 3000 -c-1
# Abre: http://localhost:3000
```
