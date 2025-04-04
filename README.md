# Game Analytics API

This microservice is designed to receive player session data and store it in a MongoDB database.  
It also allows exporting this data in Excel format (for more info, check `Available Endpoints`).

## What does this service do?

- Receives session data: level, stars, waves, time, player, etc.
- Stores the data in MongoDB.
- Exports the data to Excel (`.xlsx`).
- Ready to integrate with any frontend or mobile game using HTTP.
- Can run locally or via Docker Compose (soon in the cloud using Pulumi).

## Technologies used

- Node.js + TypeScript
- Express.js
- MongoDB (Mongoose)
- ExcelJS (for Excel export)
- Jest + ts-jest (for testing)
- Pulumi (infrastructure as code) * Pending
- Docker + Docker Compose

## Installation (local)

1. Clone the repository:

```bash
git clone https://github.com/jdgc5/Game_analytics_Api.git
cd Game_analytics_Api
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with the following content:

```
MONGO_URI=mongodb://localhost:27017/gameanalytics
PORT=3000
```

4. Make sure MongoDB is running. You can use Docker:

```bash
docker run -d -p 27017:27017 --name mongo-dev mongo
```

5. Start the server:

```bash
npm run dev
```

---

## Installation with Docker Compose

Run everything (API + MongoDB) with:

```bash
docker-compose up --build
```

The API will be available at: `http://localhost:3000`

---

## Testing

```bash
npm test
```

---

## Available Endpoints

### POST `/events`

To send a game session event, use this raw JSON format in the body:

```json
{
  "playerId": "abc123",
  "level": 5,
  "stars": 2,
  "waves": 3,
  "attempt": 1,
  "speed": 1.5,
  "success": true,
  "timeSpent": 75,
  "timestamp": "2025-04-02T16:50:00Z"
}
```

### GET `/events`

Returns all game events stored in the database.

### GET `/events/player/:playerId`

Returns all events stored for the given `playerId`.

### GET `/report`

Generates and downloads a `report.xlsx` file with all events in Excel format.

In Postman or a similar app, use the **"Send and Download"** button to save the file.

### GET `/report/:playerId`

Generates and downloads a `report-${playerId}.xlsx` file with all events for that player in Excel format.

In Postman or a similar app, use the **"Send and Download"** button to save the file.

### POST `/feedback`

To send a level feedback, use this raw JSON format in the body:

```json
{
  "playerId": "abc123",
  "level": 1,
  "satisfaction":"medium",
  "difficulty":"easy",
  "frustration":"none",
  "comment":"This is an example comment, i would like to suggest some improvements for this level.....",
  "timestamp": "2025-04-02T16:50:00Z"
}
```
### GET `/feedback`

Returns all game feedback stored in the database.

### GET `/feedback/player/:playerId`

Returns all game feedback stored for the given `playerId`.

---

## Project structure

```
src/
├── config/         ← Environment and DB configuration
├── controllers/    ← HTTP request handlers
├── routes/         ← REST endpoint definitions
├── services/       ← Business logic (optional, for scalability)
├── models/         ← Mongoose schemas (MongoDB)
├── utils/          ← Helper functions such as Excel export
├── app.ts          ← Sets up Express and routes
└── server.ts       ← Connects to MongoDB and starts the Express server
```

---

Author - José David García Corzo