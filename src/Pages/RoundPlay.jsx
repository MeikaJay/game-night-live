import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function RoundPlay() {
  const navigate = useNavigate();
  const intervalRef = useRef(null);
  const correctCount = useRef(0); // ✅ Track corrects live

  const [questions, setQuestions] = useState([]);
  const [skipped, setSkipped] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timer, setTimer] = useState(120);
  const [timerRunning, setTimerRunning] = useState(false);
  const [roundOver, setRoundOver] = useState(false);
  const [showRecap, setShowRecap] = useState(false);
  const [recap, setRecap] = useState([]);
  const [activeContestant, setActiveContestant] = useState("");
  const [selectedGame, setSelectedGame] = useState("");
  const [score, setScore] = useState({});
  const [nextUp, setNextUp] = useState(false);
  const [showX, setShowX] = useState(false);

  useEffect(() => {
    const storedGame = localStorage.getItem("selectedGame");
    const storedContestant = localStorage.getItem("activeContestant");
    const allGames = JSON.parse(localStorage.getItem("allGames")) || [];
    const game = allGames.find((g) => g.name === storedGame);
    const previouslyUsed = JSON.parse(localStorage.getItem("usedQuestions")) || {};

    let usedForOthers = [];
    Object.entries(previouslyUsed).forEach(([name, qs]) => {
      if (name !== storedContestant) usedForOthers.push(...qs);
    });

    const allQs = game?.questions || [];
    const available = allQs.filter(
      (q) => !usedForOthers.some((u) => u.question === q.question)
    );

    setQuestions(available.slice(0, 20));
    setSelectedGame(storedGame || "");
    setActiveContestant(storedContestant || "");
    const savedScores = JSON.parse(localStorage.getItem("scores")) || {};
    setScore(savedScores);
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const startTimer = () => {
    if (timerRunning || roundOver) return;
    if (intervalRef.current) clearInterval(intervalRef.current);

    setTimerRunning(true);
    let timeLeft = 120;
    setTimer(timeLeft);

    intervalRef.current = setInterval(() => {
      timeLeft--;
      setTimer(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setTimerRunning(false);
        endRound();
      }
    }, 1000);
  };

  const handleCorrect = () => {
    correctCount.current += 1;

    const updated = {
      ...score,
      [activeContestant]: correctCount.current,
    };
    setScore(updated);
    localStorage.setItem("scores", JSON.stringify(updated));

    setRecap([...recap, { ...questions[currentIndex], result: "✅ Correct" }]);
    nextQuestion();
  };

  const handleSkip = () => {
    setSkipped([...skipped, questions[currentIndex]]);
    setRecap([...recap, { ...questions[currentIndex], result: "⏩ Skipped" }]);
    nextQuestion();
  };

  const handleIncorrect = () => {
    setShowX(true);
    setTimeout(() => setShowX(false), 300);
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else if (skipped.length > 0) {
      setQuestions(skipped);
      setSkipped([]);
      setCurrentIndex(0);
    } else {
      endRound();
    }
  };

  const endRound = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimerRunning(false);
    setRoundOver(true);

    const remaining = questions.slice(currentIndex);
    const remainingRecap = remaining.map((q) => ({
      question: q.question,
      answer: q.answer,
      result: "⏩ Skipped",
    }));
    const fullRecap = [...recap, ...remainingRecap];
    setRecap(fullRecap);

    const previous = JSON.parse(localStorage.getItem("usedQuestions")) || {};
    previous[activeContestant] = fullRecap.map((q) => ({
      question: q.question,
      answer: q.answer,
    }));
    localStorage.setItem("usedQuestions", JSON.stringify(previous));

    const finalScore = correctCount.current;
    const existingScores = JSON.parse(localStorage.getItem("scores")) || {};
    const updatedScores = {
      ...existingScores,
      [activeContestant]: finalScore,
    };
    localStorage.setItem("scores", JSON.stringify(updatedScores));
    setScore(updatedScores);

    const contestants = JSON.parse(localStorage.getItem("contestants")) || {};
    const next = activeContestant === contestants.contestant1 ? contestants.contestant2 : null;
    if (next) setNextUp(true);
  };

  const handleNextContestant = () => {
    correctCount.current = 0;

    const contestants = JSON.parse(localStorage.getItem("contestants")) || {};
    const next = activeContestant === contestants.contestant1
      ? contestants.contestant2
      : contestants.contestant1;

    setActiveContestant(next);
    localStorage.setItem("activeContestant", next);

    const storedGame = localStorage.getItem("selectedGame");
    const allGames = JSON.parse(localStorage.getItem("allGames")) || [];
    const game = allGames.find((g) => g.name === storedGame);
    const previouslyUsed = JSON.parse(localStorage.getItem("usedQuestions")) || {};

    let usedForOthers = [];
    Object.entries(previouslyUsed).forEach(([name, qs]) => {
      if (name !== next) usedForOthers.push(...qs);
    });

    const available = (game?.questions || []).filter(
      (q) => !usedForOthers.some((u) => u.question === q.question)
    );

    setQuestions(available.slice(0, 20));
    setNextUp(false);
    setRoundOver(false);
    setShowRecap(false);
    setRecap([]);
    setSkipped([]);
    setCurrentIndex(0);
    setTimer(120);
    setTimerRunning(false);
  };

  const formatTime = (s) =>
    `${Math.floor(s / 60)}:${s % 60 < 10 ? "0" : ""}${s % 60}`;

  const btnStyle = (bg) => ({
    padding: "2vh 5vw",
    backgroundColor: bg,
    fontSize: "3vh",
    borderRadius: "2vh",
    minWidth: "200px",
    color: bg === "#666" ? "#fff" : "#000",
  });

  if (nextUp) {
    return (
      <div style={{
        height: "100vh", width: "100vw", backgroundColor: "#000", color: "#0f0",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontSize: "5vh",
      }}>
        Next up! Click to continue.
        <button onClick={handleNextContestant} style={{
          marginTop: "2vh", padding: "2vh 4vw", fontSize: "3vh",
          backgroundColor: "#0f0", color: "#000", borderRadius: "1vh",
        }}>
          Continue
        </button>
      </div>
    );
  }

  return (
    <div style={{
      height: "100vh", width: "100vw", backgroundColor: "#000", color: "#fff",
      padding: "2vh", boxSizing: "border-box", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", textAlign: "center", position: "relative"
    }}>
      {/* HOME BUTTON */}
      <button onClick={() => navigate("/play")} style={{
        position: "absolute", top: "2vh", left: "2vw",
        backgroundColor: "#333", color: "#fff", padding: "2vh 3vw", borderRadius: "1vh", fontSize: "2.5vh",
      }}>
        🏠 Home
      </button>

      {/* SCORE BOX */}
      <div style={{
        position: "absolute", top: "2vh", right: "2vw",
        backgroundColor: "#e5ffe5", color: "#000", padding: "2vh 3vw", borderRadius: "1.5vh", fontSize: "2.5vh",
      }}>
        <h3 style={{ fontSize: "3vh" }}>🏆 Score</h3>
        <p>{activeContestant}: {score[activeContestant] || 0}</p>
      </div>

      <h1 style={{ fontSize: "10vh", color: "cyan" }}>{formatTime(timer)}</h1>
      <h2 style={{ fontSize: "6vh", color: "#0ff" }}>{selectedGame}</h2>
      <h3 style={{ fontSize: "5vh", color: "lime", marginBottom: "2vh" }}>
        🎤 {activeContestant} is playing!
      </h3>

      {!timerRunning && !roundOver && (
        <button onClick={startTimer} style={{
          margin: "3vh 0", fontSize: "4vh", backgroundColor: "#007bff",
          color: "#fff", padding: "2vh 4vw", borderRadius: "2vh",
        }}>
          ▶️ Start Round
        </button>
      )}

      {timerRunning && !roundOver && questions[currentIndex] && (
        <div style={{
          margin: "1vh 0", backgroundColor: "#222", padding: "4vh 4vw",
          borderRadius: "8vh", fontSize: "7vh", width: "90vw", maxWidth: "1200px",
          minHeight: "30vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative"
        }}>
          {questions[currentIndex]?.question}
          {showX && (
            <span style={{
              position: "absolute", inset: 0, display: "flex",
              alignItems: "center", justifyContent: "center",
              fontSize: "50vw", fontWeight: 800, color: "red",
              transform: "scale(8)", animation: "pop .3s ease-out forwards", pointerEvents: "none",
            }}>
              ❌
            </span>
          )}
        </div>
      )}

      {timerRunning && !roundOver && questions[currentIndex] && (
        <div style={{
          display: "flex", gap: "5vw", flexWrap: "wrap", justifyContent: "center",
        }}>
          <button onClick={handleCorrect} style={btnStyle("green")}>✅ Correct</button>
          <button onClick={handleIncorrect} style={btnStyle("red")}>❌ Incorrect</button>
          <button onClick={handleSkip} style={btnStyle("orange")}>⏭️ Skip</button>
        </div>
      )}

      {roundOver && !showRecap && (
        <div style={{ marginTop: "4vh" }}>
          <h2 style={{ fontSize: "6vh", color: "#0ff" }}>⏱️ Time’s Up!</h2>
          <p style={{ fontSize: "4vh", marginTop: "2vh" }}>
            🎉 You scored {score[activeContestant] || 0} points!
          </p>
          <button onClick={() => setShowRecap(true)} style={btnStyle("#666")}>📋 View Recap</button>
        </div>
      )}

      {showRecap && (
        <div style={{ marginTop: "4vh", width: "90vw" }}>
          <h2 style={{ fontSize: "5vh", marginBottom: "2vh", color: "#0ff" }}>Skipped Questions Recap</h2>
          <ul style={{
            fontSize: "3vh", textAlign: "left", margin: "auto", lineHeight: "1.8",
          }}>
            {recap.filter((item) => item.result === "⏩ Skipped").map((item, i) => (
              <li key={i} style={{ marginBottom: "1vh" }}>
                <strong>{item.question}</strong><br />
                <span style={{ color: "#ccc" }}>✅ Answer: {item.answer}</span>
              </li>
            ))}
          </ul>
          {nextUp ? (
            <button onClick={handleNextContestant} style={btnStyle("#0f0")}>➡️ Next Contestant</button>
          ) : (
            <button onClick={() => navigate("/play")} style={btnStyle("gray")}>🔁 Back to GamePlay</button>
          )}
        </div>
      )}

      <style>{`
        @keyframes pop {
          0%   { transform: scale(0.8); opacity: 0; }
          50%  { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1);   opacity: 0; }
        }
      `}</style>
    </div>
  );
}