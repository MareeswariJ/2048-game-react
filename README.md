# 2048 Game Implementation

A modern, fully-functional implementation of the classic 2048 puzzle game built with React and Vite, following functional programming principles with an attractive dark gradient UI.

## 🎮 Game Overview

Combine tiles with the same number to reach 2048! Slide tiles in four directions, merge matching numbers, and strategize to achieve the highest score.

## ✨ Features

- 4x4 game board (configurable size)
- Smooth tile animations
- Score tracking
- Game state management (win/lose conditions)
- Responsive keyboard controls (Arrow keys)
- Restart game functionality
- Clean, modern UI

## 🚀 Installation

### Prerequisites
- npm

# Clone the repository
git clone <your-repo-url>
cd 2048-game

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🎯 How to Play

1. Use **Arrow Keys** (↑ ↓ ← →) or on-screen controls to move tiles
2. Tiles with the same number **merge** when they collide
3. After each move, a new tile (2 or 4) appears
4. **Goal**: Create a tile with the number 2048
5. **Game Over**: When no more moves are possible

## 🏗️ Project Structure
```
src/
|
├── components/        # React components
│   ├── Board/        # Game board component
│   ├── Controls/     # Game controls
│   ├── ScoreBoard/   # Score display
│   └── Tile/         # Individual tile component
├── utils/ 
    └── constants.js  # Game configuration      
│   ├── gameLogic.js  # Core game mechanics
│   └── helpers.js    # Utility functions
    
└── App.jsx           # Main application component
```

## 🧩 Implementation Details

### Functional Programming Principles
- Pure functions for game logic
- Immutable state updates
- No side effects in core logic functions
- Function composition - complex logic from simple functions
- Declarative code - focus on "what" not "how"


### Key Algorithms
- Slide & Merge: O(n) time, processes each row
- Move Detection: O(n²) scans grid for valid moves
- Win/Lose Check: O(n²) board state analysis

### Data Structures
- 2D Array for grid representation
- O(1) cell access, O(n²) space complexity IDs

## 🛠️ Technologies Used

Tech Stack: React 18.3.1 • Vite 7.1.10 • Node.js 22.11.0
Status: ✅ Production Ready

## 📦 Deployment

[Deployment link will be added here]

## 🧪 Future Enhancements

- [ ] Configurable board size (Y x Y)
- [ ] Undo move functionality
- [ ] Best score persistence
- [ ] Mobile touch controls
- [ ] Sound effects
- [ ] Different themes

## 👨‍💻 Development
```bash
# Run in development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📄 License

MIT License

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---
**Author**: Mareeswari
**Date**: October 2025