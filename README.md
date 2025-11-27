# EstateHub Backend

Sistema backend para una plataforma de gestión inmobiliaria desarrollado con Node.js, Express y PostgreSQL.

## Arquitectura

El proyecto sigue una arquitectura MVC (Model-View-Controller) con las siguientes capas:

- **Models**: Definición de modelos de datos con Sequelize ORM
- **Controllers**: Lógica de negocio y manejo de peticiones
- **Routes**: Definición de endpoints de la API
- **Config**: Configuraciones de base de datos y servicios externos
- **Middlewares**: Funciones intermedias (autenticación, validación)
- **Helpers**: Funciones auxiliares y utilidades

## Características principales

- Gestión completa de propiedades (CRUD)
- Sistema de usuarios con autenticación JWT
- Gestión de citas para visitas a propiedades
- Sistema de contratos de renta
- Control de pagos de renta
- Registro de gastos de mantenimiento
- Sistema de notificaciones
- Geocodificación y búsqueda geográfica
- Carga de imágenes con Cloudinary
- Validación de horarios disponibles para citas

## Stack tecnológico

- **Runtime**: Node.js
- **Framework**: Express 5
- **Base de datos**: PostgreSQL
- **ORM**: Sequelize
- **Autenticación**: JSON Web Tokens (JWT)
- **Encriptación**: bcrypt
- **Almacenamiento**: Cloudinary (imágenes)
- **Validación**: express-validator
- **CORS**: Habilitado para desarrollo

## Dependencias principales

```json
{
  "express": "^5.1.0",
  "sequelize": "^6.37.7",
  "pg": "^8.16.3",
  "jsonwebtoken": "^9.0.2",
  "bcrypt": "^6.0.0",
  "cloudinary": "^1.41.3",
  "multer": "^2.0.2",
  "cors": "^2.8.5",
  "dotenv": "^17.2.3"
}
```

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/AmiiGood/estateHub_backend.git
cd estateHub_backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` basado en `.env.example`:

```env
# Base de datos principal (Sequelize)
HOSTG=localhost
USERG=tu_usuario
DATABASEG=estatehub_db
PASSWORDG=tu_password
PORTG=5432

# Base de datos geoespacial
HOST=localhost
USER=tu_usuario
DATABASE=geo_db
password=tu_password
PORT=5432

# JWT
JWT_SECRET=tu_secreto_jwt

# Cloudinary
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

### 4. Iniciar el servidor

**Entorno de desarrollo:**
```bash
npm run dev
```

**Entorno de producción:**
```bash
npm start
```

El servidor se ejecutará en `http://localhost:3000`

## Estructura del proyecto

```
estateHub_backend/
├── Config/
│   ├── cloudinary.js       # Configuración de Cloudinary
│   ├── config.js            # Configuración de Sequelize
│   ├── connection.js        # Conexión principal a BD
│   └── geoConnection.js     # Conexión BD geoespacial
├── Controllers/
│   ├── citasController.js
│   ├── contratosController.js
│   ├── gatosMantenimientoController.js
│   ├── geocodificadorController.js
│   ├── loginController.js
│   ├── notificacionesController.js
│   ├── pagosRentaController.js
│   ├── propiedadesController.js
│   └── usuariosController.js
├── Models/
│   ├── Asociaciones.js      # Relaciones entre modelos
│   ├── Cita.js
│   ├── Contrato.js
│   ├── GastosMantenimiento.js
│   ├── ImagenesPropiedad.js
│   ├── Notificacion.js
│   ├── PagoRenta.js
│   ├── Propiedad.js
│   ├── Usuario.js
│   └── server.js            # Configuración del servidor
├── Routes/
│   ├── citasRoutes.js
│   ├── contratosRoutes.js
│   ├── GastosMantenimientoRoutes.js
│   ├── geocodificadorRoutes.js
│   ├── loginRoutes.js
│   ├── notificacionesRoutes.js
│   ├── pagosRentaRoutes.js
│   ├── propiedadesRoutes.js
│   └── usuariosRoutes.js
├── Middlewares/
│   └── auth.js              # Verificación de JWT
├── Helpers/
│   └── configMulter.js      # Configuración de subida de archivos
├── App.js                   # Punto de entrada
├── package.json
└── .env.example
```

## API Endpoints

### Autenticación
- `POST /api/login` - Iniciar sesión

### Usuarios
- `GET /api/usuarios/getAllUsuarios` - Obtener todos los usuarios
- `GET /api/usuarios/getUsuario/:idUsuario` - Obtener usuario por ID
- `POST /api/usuarios/postUsuario` - Registrar usuario
- `PUT /api/usuarios/putUsuario` - Actualizar usuario
- `DELETE /api/usuarios/deleteUsuario/:idUsuario` - Eliminar usuario (desactivar)

### Propiedades
- `GET /api/propiedades/getPropiedades` - Obtener propiedades con filtros opcionales
- `GET /api/propiedades/getPropiedad/:idPropiedad` - Obtener propiedad por ID
- `GET /api/propiedades/getPropiedadesByUsuario/:idUsuario` - Obtener propiedades por usuario
- `POST /api/propiedades/postPropiedad` - Crear propiedad
- `PUT /api/propiedades/putPropiedad` - Actualizar propiedad
- `DELETE /api/propiedades/deletePropiedad/:idPropiedad` - Eliminar propiedad
- `PUT /api/propiedades/postEcommerce/:idPropiedad` - Publicar en ecommerce
- `POST /api/propiedades/subirFotos/:idPropiedad` - Subir fotos de la propiedad
- `DELETE /api/propiedades/eliminarFoto/:idImagen` - Eliminar foto

### Citas
- `GET /api/citas/getCitas` - Obtener todas las citas
- `GET /api/citas/getCita/:idCita` - Obtener cita por ID
- `GET /api/citas/getCitasByUsuario/:idUsuario` - Obtener citas por usuario
- `GET /api/citas/getCitasByResponsable/:idUsuario` - Obtener citas por responsable de propiedad
- `GET /api/citas/getCitasByPropiedad/:idPropiedad` - Obtener citas por propiedad
- `GET /api/citas/getCitasByEstatus/:estatus` - Obtener citas por estatus
- `GET /api/citas/getCitasByFechas` - Obtener citas por rango de fechas
- `GET /api/citas/getHorariosDisponibles` - Obtener horarios disponibles
- `POST /api/citas/postCita` - Crear cita
- `PUT /api/citas/putCita` - Actualizar cita
- `DELETE /api/citas/deleteCita/:idCita` - Eliminar cita
- `PATCH /api/citas/patchCita/:idCita/estatus` - Actualizar estatus de cita

### Contratos
- `GET /api/contratos/getContratosActivos` - Obtener contratos activos
- `GET /api/contratos/getContrato/:idContrato` - Obtener contrato por ID
- `GET /api/contratos/getContratosByUsuario/:idUsuario` - Obtener contratos por usuario
- `GET /api/contratos/getContratosByPropiedad/:idPropiedad` - Obtener contratos por propiedad
- `POST /api/contratos/postContrato` - Crear contrato
- `PUT /api/contratos/putContrato` - Actualizar contrato
- `PUT /api/contratos/putEstatusContrato/:idContrato` - Actualizar estatus de contrato
- `DELETE /api/contratos/deleteContrato/:idContrato` - Eliminar contrato

### Pagos de Renta
- `GET /api/pagosRenta/getPagosRenta` - Obtener todos los pagos
- `GET /api/pagosRenta/getPagoRenta/:idPago` - Obtener pago por ID
- `GET /api/pagosRenta/getPagosRentaByContrato/:idContrato` - Obtener pagos por contrato
- `GET /api/pagosRenta/getPagosRentaByEstatus/:estatus` - Obtener pagos por estatus
- `GET /api/pagosRenta/getPagosRentaByRangoFechas` - Obtener pagos por rango de fechas
- `POST /api/pagosRenta/postPagoRenta` - Registrar pago
- `PUT /api/pagosRenta/putPagoRenta` - Actualizar pago
- `DELETE /api/pagosRenta/deletePagoRenta/:idPago` - Eliminar pago
- `PATCH /api/pagosRenta/patchPagoRenta/:idPago/estatus` - Actualizar estatus de pago

### Gastos de Mantenimiento
- `GET /api/gastosMantenimiento/getGastosMantenimiento` - Obtener todos los gastos
- `GET /api/gastosMantenimiento/getGastoMantenimiento/:idGasto` - Obtener gasto por ID
- `POST /api/gastosMantenimiento/postGastosMantenimiento` - Registrar gasto
- `PUT /api/gastosMantenimiento/putGastosMantenimiento` - Actualizar gasto
- `DELETE /api/gastosMantenimiento/deleteGastoMantenimiento/:idGasto` - Eliminar gasto

### Notificaciones
- `GET /api/notificaciones/getAllNotificaciones` - Obtener todas las notificaciones
- `GET /api/notificaciones/getNotificacion/:idNotificacion` - Obtener notificación por ID
- `POST /api/notificaciones/postNotificacion` - Crear notificación
- `PUT /api/notificaciones/putNotificacion/:idNotificacion` - Actualizar notificación
- `DELETE /api/notificaciones/deleteNotificacion/:idNotificacion` - Eliminar notificación

### Geocodificación
- `POST /api/geocodificador/getInfo` - Obtener información geográfica por coordenadas

**Nota:** La mayoría de endpoints requieren autenticación mediante token JWT en el header `Authorization: Bearer <token>`

## Seguridad

- Autenticación basada en JSON Web Tokens (JWT)
- Contraseñas encriptadas con bcrypt (10 salt rounds)
- Middleware de verificación de tokens en rutas protegidas
- CORS configurado para aceptar peticiones desde el frontend
- Variables de entorno para información sensible
- Validación de datos de entrada con express-validator

## Modelos de datos

### Usuario
- Email único y contraseña (hash)
- Nombre completo (nombre, apellido paterno, apellido materno)
- Teléfono de contacto
- Estado activo/inactivo
- Fecha de registro

### Propiedad
- **Información básica**: Título, descripción, tipo de propiedad
- **Ubicación**: Dirección completa, latitud, longitud, colonia, ciudad, estado, código postal
- **Características**: Número de habitaciones, baños, metros cuadrados, estacionamientos, plantas
- **Amenidades**: Residencial, jardín, alberca, sótano, terraza, cuarto de servicio, amueblado
- **Precios**: Venta y renta
- **Financiamiento**: Acepta crédito (sí/no)
- **Estatus**: Disponible, vendida, rentada
- **Publicación**: Estado de publicación en ecommerce

### Cita
- Relación con propiedad y usuario solicitante
- Fecha y hora de la cita (formato UTC)
- Estatus (en_proceso, cancelada, completada)
- Fecha de creación
- **Validaciones automáticas**:
  - Horario laboral: 8:00 AM - 8:00 PM
  - Intervalos de 30 minutos
  - No se permiten citas los domingos
  - Anticipación mínima de 1 día
  - Máximo 3 meses de anticipación
  - Límite de 10 citas pendientes por usuario

### Contrato
- Relación con propiedad y usuario arrendatario
- Fechas de inicio y fin del contrato
- Monto mensual de renta
- Monto de depósito
- URL del documento del contrato
- Estatus activo/inactivo
- Fecha de creación

### Pago de Renta
- Relación con contrato
- Monto del pago
- Fecha de vencimiento
- Fecha de pago efectivo
- Método de pago
- Referencia de pago
- Notas adicionales
- Estatus (pago_pendiente, pago_recibido, en_proceso)

### Gasto de Mantenimiento
- Relación con propiedad
- Categoría del gasto
- Concepto
- Monto
- Fecha del gasto
- Proveedor
- Descripción detallada
- Fecha de registro

### Notificación
- Relación con usuario
- Tipo de notificación (pago_pendiente, pago_recibido, en_proceso)
- Título y mensaje
- Estado leída/no leída
- Fecha de envío

### Imágenes de Propiedad
- Relación con propiedad
- URL de la imagen en Cloudinary
- Fecha de subida

## Características especiales

### Sistema de Citas

El sistema de citas implementa las siguientes reglas de negocio:

- **Validación de horarios**: Los slots disponibles son cada 30 minutos (en punto o y media)
- **Horario laboral**: Las citas solo pueden agendarse entre 8:00 AM y 8:00 PM
- **Restricción de días**: No se permiten citas los domingos
- **Anticipación**: Las citas deben agendarse con al menos 1 día de anticipación
- **Límite futuro**: No se pueden agendar citas con más de 3 meses de anticipación
- **Control de disponibilidad**: Validación automática de horarios ocupados
- **Límite por usuario**: Máximo 10 citas pendientes simultáneas por usuario
- **Actualización automática**: Las citas vencidas se marcan automáticamente como completadas

### Gestión de Imágenes

- Integración completa con Cloudinary
- Subida múltiple de imágenes (hasta 10 por propiedad)
- Formatos aceptados: JPG, JPEG, PNG, WEBP
- Límite de tamaño: 5MB por imagen
- Optimización automática de calidad
- Redimensionamiento a máximo 1200x800px
- Eliminación con limpieza automática en Cloudinary
- URLs públicas de acceso directo

### Geocodificación

El sistema incluye capacidades avanzadas de geocodificación mediante PostGIS:

- Búsqueda de información geográfica por coordenadas
- Consultas espaciales (intersección, distancia)
- Obtención de datos de región, estado, municipio, localidad
- Información de códigos postales y colonias
- Búsqueda de puntos de interés cercanos
- Cálculo de AGEBs (Áreas Geoestadísticas Básicas)
- Datos demográficos y socioeconómicos por zona

## Desarrollo

### Scripts disponibles

```bash
# Iniciar servidor en modo desarrollo (con auto-reload)
npm run dev

# Iniciar servidor en modo producción
npm start

# Ejecutar tests (no implementado)
npm test
```

### Herramientas de desarrollo

```json
{
  "sequelize-cli": "^6.6.3",
  "sequelize-auto": "^0.8.8"
}
```

### Base de datos

El proyecto utiliza dos conexiones a PostgreSQL:

1. **Base de datos principal**: Para los modelos de Sequelize (propiedades, usuarios, citas, etc.)
2. **Base de datos geoespacial**: Para consultas espaciales con PostGIS

### Sincronización de modelos

Los modelos se sincronizan automáticamente al iniciar el servidor. El orden de sincronización es:

1. Usuario
2. Propiedad
3. Contrato
4. PagoRenta
5. GastosMantenimiento
6. Cita
7. Notificacion
8. ImagenesPropiedad

## Licencia

ISC

## Notas técnicas

- El servidor escucha en todas las interfaces de red (0.0.0.0) en el puerto 3000
- Todas las fechas se manejan en formato UTC
- Los timestamps (createdAt, updatedAt) se gestionan automáticamente con Sequelize
- El proyecto utiliza ES Modules (type: "module" en package.json)
- Las rutas están protegidas con middleware de autenticación JWT excepto login y registro
- El sistema implementa soft delete (paranoid: true) en varios modelos

---

**Advertencia**: Este es un proyecto backend que requiere un cliente frontend para funcionar completamente. Asegúrese de configurar correctamente todas las variables de entorno y las bases de datos antes de ejecutar en producción.