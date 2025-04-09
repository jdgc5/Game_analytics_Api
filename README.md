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

1. Clone the repository:

```bash
git clone https://github.com/jdgc5/Game_analytics_Api.git
cd Game_analytics_Api
```
2. Create a `.env` file with the following content:

```
MONGO_URI=mongodb://localhost:27017/gameanalytics
PORT=3000
```

3. Start everything in detached mode (API + MongoDB):
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

#### CREATE `/playerProgress/createPlayer/:playerId`

Creates a new player with the specified `playerId`.

#### PATCH `/playerProgress/:playerId`

To send a player progress , use this raw JSON format in the body:

```json
{
    "totalStars": 0,
    "unlocks": {},
    "worldsList": [
        {
            "worldName": "Intro",
            "levels": {
                "unlockedStars": 0,
                "levelList": [
                    {
                        "levelName": "1",
                        "level": {
                            "stars": {
                                "completed": true,
                                "inTime": true,
                                "inWaves": true,
                                "inAll": true
                            },
                            "performance": {
                                "attempts": 10,
                                "totalTime": 48.425132751464847,
                                "bestWaves": 1,
                                "bestTime": 1.6805944442749024
                            }
                        }
                    },
                    {
                        "levelName": "2",
                        "level": {
                            "stars": {
                                "completed": false,
                                "inTime": false,
                                "inWaves": false,
                                "inAll": false
                            },
                            "performance": {
                                "attempts": 14,
                                "totalTime": 0.0,
                                "bestWaves": 99,
                                "bestTime": 99.0
                            }
                        }
                    }
                ]
            }
        },
        {
            "worldName": "MetaLevel",
            "levels": {
                "unlockedStars": 0,
                "levelList": [
                    {
                        "levelName": "0",
                        "level": {
                            "stars": {
                                "completed": true,
                                "inTime": false,
                                "inWaves": true,
                                "inAll": false
                            },
                            "performance": {
                                "attempts": 31,
                                "totalTime": 33.515567779541019,
                                "bestWaves": 1,
                                "bestTime": 15.484548568725586
                            }
                        }
                    }
                ]
            }
        }
    ]
}

```

#### GET `/playerProgress/:playerId`

Returns player progress stored for the given `playerId`.

#### POST `/playerProgress/:playerId/resetProgress`

Resets all progress for a specific player by clearing their levels.

```json
{
  "playerId": "abc123",
}

```

### Level Controller

#### POST `/levels`

Creates a new level by a user.

```json
{
    "name": "example",
    "userId":"pruebaUserId",
    "world": "prueba",
    "levelId": 112234,
    "starsTarget": 0,
    "timeTarget": 0,
    "obstacleList": [
        {
            "type": 0,
            "points": [
                {
                    "x": 4.0,
                    "y": 2.5
                },
                {
                    "x": -7.0,
                    "y": 8.0
                },
                {
                    "x": 14.0,
                    "y": 8.0
                },
                {
                    "x": 14.0,
                    "y": 0.0
                },
                {
                    "x": 5.0,
                    "y": 0.0
                }
            ],
            "position": {
                "x": 0.0,
                "y": 0.0
            },
            "scale": {
                "x": 1.0,
                "y": 1.0
            }
        },
        {
            "type": 0,
            "points": [
                {
                    "x": -7.0,
                    "y": 2.0
                },
                {
                    "x": 3.5,
                    "y": 0.5
                },
                {
                    "x": 3.5,
                    "y": -0.5
                },
                {
                    "x": -7.0,
                    "y": -2.0
                }
            ],
            "position": {
                "x": -3.0,
                "y": 0.0
            },
            "scale": {
                "x": 1.0,
                "y": 1.0
            }
        },
    ],
    "ballList": [
        {
            "type": 0,
            "position": {
                "x": -5.28000020980835,
                "y": 2.740000009536743
            },
            "scale": {
                "x": 1.0,
                "y": 1.0
            },
            "rotation": 0.0,
            "initialVelocity": {
                "x": 0.0,
                "y": 0.0
            }
        }
    ],
    "exitList": [
        {
            "type": 0,
            "position": {
                "x": -5.0,
                "y": -2.700000047683716
            },
            "scale": {
                "x": 1.0,
                "y": 1.0
            },
            "rotation": 0.0
        }
    ],
    "flowList": [
        {
            "type": 0,
            "position": {
                "x": 2.9000000953674318,
                "y": 0.0
            },
            "scale": {
                "x": 1.0,
                "y": 1.0
            },
            "rotation": 90.0,
            "strength": 1.0
        }
    ],
    "blockList": [
        {
            "size": {
                "x": 20.0,
                "y": 4.0
            },
            "position": {
                "x": 0.2385958433151245,
                "y": -2.233276844024658
            },
            "scale": {
                "x": 1.0,
                "y": 1.0
            },
            "rotation": 0.0
        }
    ]
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