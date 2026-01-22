# 🚀 Quick Start

# 🎮 Rock Paper Scissors – Web Game (React + TypeScript)

A real-time Rock Paper Scissors game built with React, TypeScript, WebSockets, and Canvas-style animations.
The game includes betting logic, sound effects, animations, live balance updates, and a clean modular UI.


## 🎨 Preview

![Game Screenshot](/src/assets/rpsGame.png)

[Live Demo](https://rockpaperscissors-jade-sigma.vercel.app/)


## 🚀 Features

- Rock / Paper / Scissors gameplay

- Real-time results via WebSocket

- Betting system with preset & manual controls

- Animated shuffling and result reveal

- Sound effects (win / lose / draw / shuffle)

- Game settings (sound toggle, help dialog)

- Win / Tie / Loss tracking

- Responsive UI components

# 🧠 Game Flow

- Player selects a bet amount

- Player clicks Rock, Paper, or Scissors

- Game shuffles selections with animation

- Selection is sent to backend via WebSocket

- Server returns result:

- Player choice

- Computer choice

- Win / Lose / Draw

- Updated balance

- UI updates scores, balance, and plays sound

- Result modal shows outcome and auto-resets

### **Future Improvements**
## 🔮 Roadmap 

- Player vs Player mode
- Game history log
- Themed skins
- Tournament mode


## 🗂️ Project Structure (Key Files)
src/
├── components/
│   ├── MainGamePage.tsx      # Main game container and logic controller
│   ├── SelectionResults.tsx  # Displays results and selection buttons
│   ├── RPSControls.tsx       # Bet amount controls
│   ├── RpsSettingDialog.tsx  # Game settings modal
│   └── HowToPlay.tsx         # Help/instructions overlay
├── hooks/
│   └── useRPSSound.ts        # Custom sound hook
├── socket/
│   └── socket.ts             # WebSocket connection management
├── utils/
│   └── types.ts              # TypeScript type definitions
└── assets/
└── img/                  # Image assets
## 📄 Component Documentation
- MainGamePage.tsx

- Main game container and logic controller

- Responsibilities:

- WebSocket connection & communication

- Game state management (wins, ties, losses)

- UI state (animations, modals, settings)

- Bet handling

- Result processing

- Sound triggers

- Key logic:

- Sends game data to backend

- Listens for server responses

- Updates UI based on results

- Controls game timing and reset cycle

- SelectionResults.tsx

- Displays game results and selection buttons

### Props include:

- Wins, Ties, Losses

- userChoice, compChoice

- userResult, compResult

- Animation flags (isShuffling, boltAppear, easeInOut)

- handleClick (user selection handler)

### Responsibilities:

- Renders player & computer choices

- Handles selection clicks

- Shows animated lightning effect

- Displays win/tie/loss counters

## RPSControls.tsx

- Bet amount controls

## Features:

- Preset bet buttons (20, 50, 100, 500, 1000)

- Manual increase/decrease buttons

- Input validation (min 20, max 1000)

## Props:

- betAmount

- handleBetAmount

- onSetBetAmount

## RpsSettingDialog.tsx

- Game settings modal

### Features:

- Sound ON / OFF toggle

- Help dialog launcher

- Click-outside-to-close behavior

### Uses:

- useRef + useEffect for outside click detection

## HowToPlay.tsx

-Help / instructions overlay

### Explains:

- Betting rules

## How to play

- Win conditions

- Score tracking

- Triggered from the settings dialog.

##🔊 Sound System

- Handled via a custom hook:

- useRPSSound(isMuted, loopShuffle)


### Sounds triggered for:

- Button click

- Shuffle animation

- Win

- Loss

- Draw

## 🌐 WebSocket Communication

### Outgoing payload:

{
msisdn: string,
amount: number,
selection: "Rock" | "Paper" | "Scissors"
}


### Incoming response:

{
selection: string,
computer: string,
message: "You Won" | "You Lost" | "It's a Draw",
winnings: number,
Balance: string
}

### 🧪 Tech Stack

- React

- TypeScript

- WebSockets

- CSS animations

- Custom hooks

- Functional components

### 📌 Notes

- Game logic is UI-driven but result-validated by backend

- All animations are state-controlled

- UI resets automatically after each round

- Code is modular and easy to extend (history, leaderboard, etc.)

# 📄 License

This project is proprietary / demo-ready.
Reuse or modification depends on project agreement.


## 📜 Installation

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run lint` – Run ESLint

```bash
git clone <repo-url>
cd rock-paper-scissors
npm install
npm run dev

```

## Prerequisites
- Node.js 18+
- WebSocket backend connection

## 🧪 Testing

Run unit tests:
```bash
npm test
```