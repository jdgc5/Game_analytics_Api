# Game Analytics API

This API provides endpoints to manage game events, player feedback, player progress, and custom level creation. It allows for the collection and retrieval of game-related data to enhance player experience and game analysis. It also supports exporting this data in Excel format (for more info, check `Available Endpoints`).

## What does this service do?

- Manage game events, feedback, player progress, and user-created levels.
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
docker-compose build
```
```bash
docker-compose up -d 
```    

The API will be available at: `http://localhost:3000`

---

## Testing

```bash
npm test
```

---

## Available Endpoints

### Game Events

#### POST `/events`

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

#### GET `/events`

Returns all game events stored in the database.

#### GET `/events/:playerId`

Returns all events stored for the given `playerId`.

### Reports

#### GET `/report`

Generates and downloads a `report.xlsx` file with all events in Excel format.

In Postman or a similar app, use the **"Send and Download"** button to save the file.

#### GET `/report/:playerId`

Generates and downloads a `report-${playerId}.xlsx` file with all events for that player in Excel format.

In Postman or a similar app, use the **"Send and Download"** button to save the file.

### Player Feedback

#### POST `/feedback`

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
#### GET `/feedback`

Returns all game feedback stored in the database.

#### GET `/feedback/:playerId`

Returns all game feedback stored for the given `playerId`.

### Player Progress

#### POST `/playerProgress`

To send a player progress , use this raw JSON format in the body:

```json
{
  "playerId": "abc123",
  "level": 103,
  "stars": 2
}

```

#### GET `/playerProgress/:playerId`

Returns player progress stored for the given `playerId`.

### Level Controller

#### POST `/levels`

Creates a new level by a user.

```json
{
  "name": "CustomMap",
  "userId": "abc123",
  "data": {
    "dimensions": {
      "width": 10,
      "height": 10
    },
    "startPosition": {
      "x": 0,
      "y": 0
    },
    "goalPosition": {
      "x": 9,
      "y": 9
    },
    "layout": [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 1, 1, 0],
      [0, 1, 0, 1, 0, 0, 0, 1, 0, 0],
      [0, 1, 0, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    "accelerators": [
      {
        "type": "booster",
        "position": {
          "x": 3,
          "y": 3
        },
        "effect": {
          "speedMultiplier": 1.5
        }
      },
      {
        "type": "slowZone",
        "position": {
          "x": 6,
          "y": 6
        },
        "effect": {
          "speedMultiplier": 0.5
        }
      }
    ]
  }
}
```

#### GET `/levels/:id`

Returns a single level by its ID.

#### GET `/levels/user/:UserId`

Returns all levels created by the given userId.

#### PUT `/levels/:id`

Updates the data of an existing level by its ID ( You should use the same JSON format as create endpoint above)

#### DELETE `/levels/:id`

Deletes the level with the given ID.

---

Author - José David García Corzo