# 2048 Game Implementation

A functional implementation of the popular 2048 game built with React and Vite, featuring a clean GUI and smooth gameplay.

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

### Setup
```bash
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
├── components/        # React components
│   ├── Board/        # Game board component
│   ├── Tile/         # Individual tile component
│   ├── ScoreBoard/   # Score display
│   └── Controls/     # Game controls
├── utils/            # Game logic & helpers
│   ├── gameLogic.js  # Core game mechanics
│   └── helpers.js    # Utility functions
└── App.jsx           # Main application component
```

## 🧩 Implementation Details

### Functional Programming Principles
- Pure functions for game logic
- Immutable state updates
- No side effects in core logic functions

### Key Algorithms
- **Tile Movement**: Matrix traversal with merging logic
- **Random Tile Generation**: Weighted random selection (90% chance for 2, 10% for 4)
- **Win/Lose Detection**: Board state analysis

### Data Structures
- 2D Array for board representation
- Object for tile tracking with unique IDs

## 🛠️ Technologies Used

- **React** - UI framework
- **Vite** - Build tool and dev server
- **JavaScript (ES6+)** - Core language
- **CSS3** - Styling and animations

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