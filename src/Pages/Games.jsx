import "./GamesPage.css";
import React, { useState } from "react";
import EmojiMovieGame from "./EmojiMovieGame";
import HipHopTriviaGame from "./HipHopTriviaGame";

export default function GamesPage() {
  const [activeGame, setActiveGame] = useState(null);

  const renderGame = () => {
    switch (activeGame) {
      case "emoji":
        return (
          <div className="game-container">
            <button className="back-btn" onClick={() => setActiveGame(null)}>⬅ Back to Game Menu</button>
            <EmojiMovieGame />
          </div>
        );
      case "hiphop":
        return (
          <div className="game-container">
            <button className="back-btn" onClick={() => setActiveGame(null)}>⬅ Back to Game Menu</button>
            <HipHopTriviaGame />
          </div>
        );
      default:
        return (
          <div className="games-page">
            <h1 className="title">🎮 Game Night Live</h1>
            <p className="subtitle">Try 2 fan-favorite games — then sign up to join the show live!</p>
            <div className="button-group">
              <button className="game-btn" onClick={() => setActiveGame("hiphop")}>🎤 Play Hip Hop Trivia</button>
              <button className="game-btn" onClick={() => setActiveGame("emoji")}>🍿 Play Emoji Movie Game</button>
            </div>
          </div>
        );
    }
  };

  return <div className="games-wrapper">{renderGame()}</div>;
} 

// CSS styles (you can add this to GamesPage.css and import it)
/*
.games-wrapper {
  background-color: #111;
  color: white;
  min-height: 100vh;
  padding: 40px;
  font-family: 'Segoe UI', sans-serif;
}

.games-page {
  text-align: center;
  padding: 60px 20px;
}

.title {
  font-size: 36px;
  color: #00ffff;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 18px;
  color: #ccc;
  margin-bottom: 30px;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
}

.game-btn {
  padding: 18px 30px;
  font-size: 20px;
  background: linear-gradient(90deg, #00cc66, #00ffff);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: black;
  font-weight: bold;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.game-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px #00ffffaa;
}

.back-btn {
  margin: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #00ffff;
  color: black;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.game-container {
  padding: 20px;
}
*/
