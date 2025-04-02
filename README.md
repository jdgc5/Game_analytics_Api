# Game Analytics API

Este microservicio está diseñado para recibir datos de partidas de jugadores y almacenarlos en una base de datos MongoDB. 
Además, permite exportar estos datos en formato Excel 

## ¿Qué hace este servicio?

- Recibe datos de partidas: nivel, estrellas, intentos, tiempo, jugador, etc.
- Guarda los datos en MongoDB.
- Exporta los datos a Excel (`.xlsx`).
- Está preparado para integrarse con cualquier frontend o juego móvil que use HTTP.
- Puede ejecutarse de forma local o mediante Docker Compose.

## Tecnologías utilizadas

- Node.js + TypeScript
- Express.js
- MongoDB (Mongoose)
- ExcelJS (para exportar a Excel)
- Jest + ts-jest (para testing)
- Pulumi (infraestructura como código)
- Docker + Docker Compose

## Instalación (local)

1. Clona el repositorio:

```bash
git clone https://tu-repo.git Game_analytics_Api
cd Game_analytics_Api
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea el archivo `.env` con este contenido:

```
MONGO_URI=mongodb://localhost:27017/gameanalytics
PORT=3000
```

4. Asegúrate de tener MongoDB corriendo. Puedes usar Docker:

```bash
docker run -d -p 27017:27017 --name mongo-dev mongo
```

5. Inicia el servidor:

```bash
npm run dev
```

---

## Instalación con Docker Compose

Levanta todo (API + MongoDB) con:

```bash
docker-compose up --build
```

El servicio estará disponible en:  
👉 `http://localhost:3000`

---

## Testing

```bash
npm test
```

---

## Endpoints disponibles

### POST `/events`

Envía un evento de partida:

```json
{
  "playerId": "abc123",
  "level": 5,
  "attemptNumber":1,
  "success":"Yes",
  "stars": 3,
  "waves": 2,
  "timeSpent": 45,
  "timestamp": "2025-04-02T10:30:00Z"
}
```

### GET  `/report`

Genera y descarga un archivo `report.xlsx` con todos los eventos en formato Excel.

> En Postman, usa el botón **"Send and Download"** para guardar el archivo en tu equipo.

---

## Estructura del proyecto

```
src/
├── config/         ← Configuración de entorno y base de datos
├── controllers/    ← Lógica de manejo de peticiones HTTP
├── routes/         ← Definición de endpoints REST
├── services/       ← Lógica de negocio (opcional, para escalar)
├── models/         ← Esquemas de Mongoose (MongoDB)
├── utils/          ← Funciones auxiliares como exportación a Excel
├── app.ts          ← Configura Express y aplica rutas
└── server.ts       ← Inicia conexión con Mongo y el servidor Express
```

---

Autor - José David García Corzo
