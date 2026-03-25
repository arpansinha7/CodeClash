# ⚔️ CodeClash

Welcome to **CodeClash** 🚀 — a **real-time multiplayer coding platform** where developers can create or join rooms and compete together.

This project is currently built as a **real-time lobby system using WebSockets**, and is actively evolving into a **full-fledged coding battle platform**.

> 💡 Contributions, ideas, and improvements are **highly welcome** — feel free to jump in!

---

## 📌 Project Overview

CodeClash allows users to:

* Create or join a room using a unique code
* Wait in a lobby with other players
* See real-time player updates

The current version focuses on **real-time room management and synchronization**, forming the foundation for a competitive coding environment.

---

## ✨ Current Features

* 🎯 Create Room with unique room code
* 🔗 Join Room using room code
* 👥 Real-time player updates in lobby
* ⚡ WebSocket-based communication
* 🚪 Auto cleanup of rooms when empty
* 👤 Player identity using names
* 🔒 Max 4 players per room

---

## ⚙️ Tech Stack

### 🔹 Backend

* Node.js
* Express
* Socket.IO

### 🔹 Frontend

* HTML
* CSS
* JavaScript (Vanilla JS)

---

## 🧠 Technical Details

### 🔹 Room Management

```js
const rooms = {};
```

* Stores active rooms in memory
* Key → roomId
* Value → list of players

---

### 🔹 Socket Events

* `join-room`

  * Adds player to room
  * Creates room if not exists (⚠️ causes bug)
  * Emits updated player list

* `Players-Update`

  * Broadcasts updated player list

* `disconnect`

  * Removes player from room
  * Deletes room if empty

---

### 🔹 Player Limit Logic

* Maximum **4 players per room**
* If limit reached → emits `"room-full"`

---

## ⚙️ Algorithms Used / Planned

### 🔹 Room Allocation Algorithm

* Uses **Hash Map (Object in JS)** for O(1) room access

### 🔹 Unique Room Code Generation

```js
Math.random().toString(36).substring(2, 8).toUpperCase();
```

### 🔹 Player Removal Algorithm

```js
rooms[roomId] = rooms[roomId].filter(p => p.id !== socket.id);
```

### 🔹 Room Cleanup Algorithm

```js
if(rooms[roomId].length === 0)
    delete rooms[roomId];
```

### 🔹 Real-time Broadcasting

```js
io.to(roomId).emit("Players-Update", rooms[roomId]);
```

---

### 🔹 Future Algorithms

* ⚡ **Live Leaderboard Algorithm** (real-time updates during coding)
* ⚖️ **Code Judging Algorithm** (test case validation)
* ⏱️ **Timer-Based Round System**
* 🔐 **Room Validation Algorithm**

---

## 🔄 Application Flow

### 🏠 Landing Page

* Create Room / Join Room

### 🧾 Room Selection

* Enter name
* Generate or enter room code

### ⏳ Waiting Lobby

* Displays room code
* Shows players in real-time

---

## ⚠️ Known Issues (Honest Section)

* ❌ Random room code creates new room
* ❌ No validation before joining
* ❌ No error feedback for invalid rooms
* ❌ Start Game button not functional
* ❌ No coding battle logic yet

---

## 🚧 Current Limitations

* No code editor yet
* No execution environment
* No persistence (in-memory only)
* No authentication system

---

## 🚀 Future Scope

* 🧠 Integrate **Monaco Editor (via CDN)**
* 💻 JavaScript-only code submissions
* ⚡ Live leaderboard updates during coding
* 📂 Question pool using JSON files
* ⚖️ Code execution in sandboxed environments
* ▶️ Start game logic
* ⏱️ Timer-based rounds
* 🔒 Fix room joining logic
* 🎨 Improve UI/UX
* 🌐 Deployment

---

## 🚀 Getting Started

### 🔧 Prerequisites

* Node.js (v14+)
* npm

---

### 📥 Clone Repository

```bash
git clone https://github.com/arpansinha7/CodeClash.git
cd DriveEasy
```

---

### 📦 Install Dependencies

```bash
npm install
```

---

### ▶️ Run Server

```bash
node server.js
```

---

### 🌐 Open

```
http://localhost:3000
```

---

## 🤝 Contributing

Contributions are **welcome and appreciated**! 🚀

Whether it's fixing bugs, improving UI, or adding new features — feel free to contribute.

### Steps:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Commit and push
5. Open a Pull Request

---

## 💡 Contribution Ideas

* Fix room joining bug
* Add room validation
* Implement live leaderboard
* Integrate Monaco editor
* Build sandbox execution system

---

## 📚 Learning Outcomes

* Real-time systems using WebSockets
* Event-driven architecture
* Multiplayer room design
* Backend algorithm design

---

## 📜 License

MIT License

---

## 👨‍💻 Author

**Arpan Sinha**
