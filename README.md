# ⚔️ CodeClash

> **Compete. Code. Conquer.**

Welcome to **CodeClash** 🚀 — a **real-time multiplayer coding battle platform** where developers can create rooms, compete live, solve algorithmic problems, and climb the leaderboard.

This project started as a **WebSocket-based lobby system** and has evolved into a **mini competitive coding platform with real-time judging, scoring, and gameplay mechanics**.

> 💡 Contributions, ideas, and improvements are always welcome!

---

## 📌 Project Evolution

CodeClash began with:

* Room creation
* Player synchronization
* WebSocket-based communication

It has now evolved into:

* ⚡ Real-time coding battles
* 🧠 Problem system with structured test cases
* 💻 Monaco-powered code editor
* 📊 Leaderboard system (with upcoming live updates)

---

## 🌟 Features

### ⚔️ Real-Time Multiplayer

* Create or join rooms using unique codes
* Up to **4 players per room**
* Live synchronization using Socket.IO

### 🧠 Coding Challenge System

* Automatically assigns **3 questions per game**
* Difficulty-based structure (easy, medium, hard)
* Predefined test cases for evaluation

### 💻 Code Editor (Monaco)

* VS Code-like coding experience
* Syntax highlighting and smooth UI
* Dynamic switching between multiple questions

### 🧪 Code Execution Engine

* Built using Node.js `vm` module
* Executes user code in an isolated environment
* Timeout protection (2 seconds)
* Deep comparison logic for accurate validation

### 📊 Leaderboard System

* Ranking based on score and performance
* Updates on submission
* ⚡ **Evolving into a fully live leaderboard (continuous updates during gameplay)**

### ⏱️ Smart Scoring System

* Time-based scoring mechanism
* Faster correct solutions earn higher points

### 🎮 Game Flow

* Lobby → Game Start → Coding → Results
* Host-controlled game start
* Multi-question navigation using tabs

---

## 🏗️ Tech Stack

### 🔹 Backend

* Node.js
* Express.js
* Socket.IO
* VM Module (sandboxed execution)

### 🔹 Frontend

* HTML
* CSS (custom futuristic UI ✨)
* JavaScript (Vanilla JS)
* Monaco Editor

---

## 🧠 Core Technical Concepts

### 🔹 Room Management (O(1) Access)

```js
const rooms = {};
```

### 🔹 Code Execution (Sandboxed)

* Uses VM context to safely execute code
* Prevents access to server scope
* Controlled execution environment

### 🔹 Test Case Validation

```js
deepEqual(output, expected)
```

### 🔹 Real-Time Communication

```js
io.to(roomId).emit(...)
```

### 🔹 Leaderboard Algorithm

* Sort by score (descending)
* Tie-break using time efficiency

---

## 🔄 Application Flow

### 🏠 Landing Page

* Create Room / Join Room

### 🧾 Lobby System

* Enter name & room code
* Real-time player updates
* Host starts the game

### ⚔️ Game Phase

* 3 coding questions
* Monaco editor interface
* Timer-based gameplay

### 📊 Result Phase

* Instant test case feedback
* Leaderboard updates
* Game ends after all submissions

---

## ⚠️ Honest Section (What’s Still Missing)

Keeping it real 👇

* ❌ No multi-language support (JavaScript only)
* ❌ No persistent database (in-memory storage)
* ❌ Limited question pool
* ❌ No authentication system
* ❌ Live leaderboard not fully continuous yet (in progress)

---

## 🚧 Limitations

* Server restart clears all rooms
* Basic sandbox (not production-grade secure)
* No anti-cheat mechanisms

---

## 🤝 Contributing

Contributions are **welcome and appreciated**! 🚀

Whether it's fixing bugs, improving UI, or adding new features — feel free to jump in.

### 🛠️ How to Contribute

1. Fork the repository
2. Create a new branch

   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes
4. Commit your work

   ```bash
   git commit -m "Add: your feature description"
   ```
5. Push to your branch

   ```bash
   git push origin feature/your-feature-name
   ```
6. Open a Pull Request

### ⚠️ Guidelines

* Keep code clean and modular
* Follow existing structure
* Write meaningful commit messages
* Test your changes before submitting

---

## 💡 Contribution Ideas

* 📊 Implement **fully live leaderboard (real-time updates during coding)**
* 🧠 Expand question pool (JSON-based system)
* 💻 Add multi-language support (Python, C++, Java)
* 🎨 Improve UI/UX design
* 🔐 Add authentication & user profiles
* ⚡ Optimize code execution engine
* 🏆 Global leaderboard system
* 🎮 Add matchmaking (public rooms)

---

## 🚀 Upcoming Features

* ⚡ Fully **live leaderboard during gameplay**
* 🧠 Advanced coding problems with better coverage
* 💻 Multi-language code execution
* 🏆 Ranked matchmaking system
* 📊 Performance analytics (accuracy, speed, attempts)
* 🔐 User authentication & profiles
* 🎥 Match replay system

---

## 🚀 Future Scope

* 🌍 Global competitive coding ecosystem
* 🧠 AI-based question recommendations
* 📊 Advanced analytics dashboard
* 🏆 Tournament system with brackets

---

## 🚀 Getting Started

### 📥 Clone Repository

```bash
git clone https://github.com/arpansinha7/CodeClash.git
cd CodeClash
```

### 📦 Install Dependencies

```bash
npm install
```

### ▶️ Run Server

```bash
node server.js
```

### 🌐 Open in Browser

```
http://localhost:3000
```

---

## 📚 Learning Outcomes

This project demonstrates:

* ⚡ Real-time systems using WebSockets
* 🧠 Building a coding judge engine
* 🎮 Multiplayer system design
* 🔄 Event-driven architecture
* 💻 Monaco editor integration
* ⚙️ Full-stack development

---

## 👨‍💻 Author

**Arpan Sinha**

---

## ⭐ Support

If you found this project interesting, consider giving it a ⭐ on GitHub!
