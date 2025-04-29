import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function RoundPlay() {
  const navigate = useNavigate();
  const intervalRef = useRef(null);

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

  // Load game, contestant, questions, and existing score
  useEffect(() => {
    const storedGame = localStorage.getItem("selectedGame");
    const storedContestant = localStorage.getItem("activeContestant");
    const allGames = JSON.parse(localStorage.getItem("allGames")) || [];
    const game = allGames.find((g) => g.name === storedGame);
    const previouslyUsed = JSON.parse(localStorage.getItem("usedQuestions")) || {};

    let allQs = game?.questions || [];
    let usedForOthers = [];
    Object.entries(previouslyUsed).forEach(([name, q]) => {
      if (name !== storedContestant) usedForOthers.push(...q);
    });
    const available = allQs.filter(
      (q) => !usedForOthers.some((used) => used.question === q.question)
    );
    const randomQs = available.sort(() => 0.5 - Math.random()).slice(0, 20);

    setQuestions(randomQs);
    setSelectedGame(storedGame || "");
    setActiveContestant(storedContestant || "");

    const savedScore = JSON.parse(localStorage.getItem("scores")) || {};
    setScore(savedScore);
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Timer start
  const startTimer = () => {
    if (timerRunning || roundOver) return;
    // reset any existing interval
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

  // End of round
  const endRound = () => {
    // ensure interval is cleared
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setRoundOver(true);
    saveUsedQuestions();

    // tally corrects
    const newCorrects = recap.filter((r) => r.result === "✅ Correct").length;
    const existingScores = JSON.parse(localStorage.getItem("scores")) || {};
    const updated = {
      ...existingScores,
      [activeContestant]: (existingScores[activeContestant] || 0) + newCorrects,
    };
    localStorage.setItem("scores", JSON.stringify(updated));
    setScore(updated);

    // prepare next contestant
    const contestants = JSON.parse(localStorage.getItem("contestants")) || {};
    const next =
      activeContestant === contestants.contestant1
        ? contestants.contestant2
        : null;
    if (next) {
      setTimeout(() => {
        setNextUp(true);
        localStorage.setItem("activeContestant", next);
      }, 1500);
    }
  };

  const saveUsedQuestions = () => {
    const previous = JSON.parse(localStorage.getItem("usedQuestions")) || {};
    const current = [...recap, ...(questions.slice(currentIndex) || [])];
    previous[activeContestant] = current.map((q) => ({
      question: q.question,
      answer: q.answer,
    }));
    localStorage.setItem("usedQuestions", JSON.stringify(previous));
  };

  const handleCorrect = () => {
    const updatedScore = {
      ...score,
      [activeContestant]: (score[activeContestant] || 0) + 1,
    };
    setScore(updatedScore);
    setRecap([...recap, { ...questions[currentIndex], result: "✅ Correct" }]);
    nextQuestion();
  };

  const handleSkip = () => {
    setSkipped([...skipped, questions[currentIndex]]);
    setRecap([...recap, { ...questions[currentIndex], result: "⏩ Skipped" }]);
    nextQuestion();
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

  const formatTime = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Move to next contestant, reset timer only
  function handleNextContestant() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const contestants = JSON.parse(localStorage.getItem("contestants")) || {};
    const next =
      activeContestant === contestants.contestant1
        ? contestants.contestant2
        : contestants.contestant1;

    setActiveContestant(next);
    localStorage.setItem("activeContestant", next);

    setNextUp(false);
    setRoundOver(false);
    setShowRecap(false);
    setRecap([]);
    setSkipped([]);
    setCurrentIndex(0);
    setTimer(120);
    setTimerRunning(false);
  }

  if (nextUp) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "#000",
          color: "#0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          fontSize: "5vh",
        }}
      >
        Next up! Click to continue.
        <button
          onClick={handleNextContestant}
          style={{
            marginTop: "2vh",
            padding: "2vh 4vw",
            fontSize: "3vh",
            backgroundColor: "#0f0",
            color: "#000",
            borderRadius: "1vh",
          }}
        >
          Continue
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#000",
        color: "#fff",
        padding: "2vh",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <button
        onClick={() => navigate("/play")}
        style={{
          position: "absolute",
          top: "2vh",
          left: "2vw",
          backgroundColor: "#333",
          color: "#fff",
          padding: "2vh 3vw",
          borderRadius: "1vh",
          fontSize: "2.5vh",
        }}
      >
        🏠 Home
      </button>

      <div
        style={{
          position: "absolute",
          top: "2vh",
          right: "2vw",
          backgroundColor: "#e5ffe5",
          color: "#000",
          padding: "2vh 3vw",
          borderRadius: "1.5vh",
          fontSize: "2.5vh",
        }}
      >
        <h3 style={{ fontSize: "3vh" }}>🏆 Score</h3>
        <p>
          {activeContestant}: {score[activeContestant] || 0}
        </p>
      </div>

      <h1 style={{ fontSize: "10vh", color: "cyan" }}>
        {formatTime(timer)}
      </h1>
      <h2 style={{ fontSize: "6vh", color: "#0ff" }}>{selectedGame}</h2>
      <h3 style={{ fontSize: "5vh", color: "lime" }}>
        🎤 {activeContestant} is playing!
      </h3>

      {!timerRunning && !roundOver && (
        <button
          onClick={startTimer}
          style={{
            margin: "3vh 0",
            fontSize: "4vh",
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "2vh 4vw",
            borderRadius: "2vh",
          }}
        >
          ▶️ Start Round
        </button>
      )}

      {timerRunning && !roundOver && questions[currentIndex] && (
        <>
          <div
            style={{
              marginBottom: "4vh",
              backgroundColor: "#222",
              padding: "4vh 4vw",
              borderRadius: "2vh",
              fontSize: "4vh",
              width: "90vw",
              maxWidth: "1200px",
              minHeight: "20vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {questions[currentIndex]?.question}
          </div>
          <div
            style={{
              display: "flex",
              gap: "5vw",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <button
              onClick={handleCorrect}
              style={{
                padding: "2vh 5vw",
                backgroundColor: "green",
                fontSize: "3vh",
                borderRadius: "2vh",
                minWidth: "200px",
              }}
            >
              ✅ Correct
            </button>
            <button
              onClick={handleSkip}
              style={{
                padding: "2vh 5vw",
                backgroundColor: "orange",
                fontSize: "3vh",
                borderRadius: "2vh",
                minWidth: "200px",
              }}
            >
              ⏭️ Skip
            </button>
          </div>
        </>
      )}

      {roundOver && !showRecap && (
        <div style={{ marginTop: "4vh" }}>
          <h2 style={{ fontSize: "6vh", color: "#0ff" }}>⏱️ Time’s Up!</h2>
          <p style={{ fontSize: "4vh", marginTop: "2vh" }}>
            🎉 Here's how you did!
          </p>
          <button
            onClick={() => setShowRecap(true)}
            style={{
              marginTop: "2vh",
              backgroundColor: "#666",
              color: "#fff",
              padding: "2vh 5vw",
              fontSize: "3vh",
              borderRadius: "2vh",
            }}
          >
            📋 View Recap
          </button>
        </div>
      )}

      {showRecap && (
        <div style={{ marginTop: "4vh", width: "90vw" }}>
          <h2 style={{ fontSize: "5vh", marginBottom: "2vh", color: "#0ff" }}>
            Recap
          </h2>
          <ul
            style={{
              fontSize: "3vh",
              textAlign: "left",
              margin: "auto",
              lineHeight: "1.8",
            }}
          >
            {recap.map((item, index) => (
              <li key={index} style={{ marginBottom: "1vh" }}>
                <strong>{item.question}</strong> — {item.result}
              </li>
            ))}
          </ul>
          <button
            onClick={() => navigate("/play")}
            style={{
              marginTop: "4vh",
              backgroundColor: "gray",
              color: "white",
              padding: "2vh 5vw",
              fontSize: "3vh",
              borderRadius: "2vh",
            }}
          >
            🔁 Back to GamePlay
          </button>
        </div>
      )}
    </div>
  );
}