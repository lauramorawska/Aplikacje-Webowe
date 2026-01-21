import React, { useState, useEffect } from "react";

function Odliczanie() {
  const [licznik, setLicznik] = useState(15);
  const [intervalId, setIntervalId] = useState<ReturnType<
    typeof setInterval
  > | null>(null);

  const startTimer = () => {
    if (intervalId !== null) return;

    const id = setInterval(() => {
      setLicznik((c) => {
        const next = Math.max(c - 0.1, 0);

        if (next === 0) {
          clearInterval(id);
          setIntervalId(null);
        }

        return next;
      });
    }, 100);

    setIntervalId(id);
  };

  const stopTimer = () => {
    if (intervalId === null) return;
    clearInterval(intervalId);
    setIntervalId(null);
  };

  useEffect(() => {
    return () => {
      if (intervalId !== null) clearInterval(intervalId);
    };
  }, [intervalId]);

  const isRunning = intervalId !== null;
  const isFinished = licznik <= 0;

  const buttonText = isFinished
    ? "Odliczanie zakończone"
    : isRunning
    ? "STOP"
    : "START";

  const handleClick = () => {
    if (isRunning) stopTimer();
    else startTimer();
  };

  return (
    <div>
      <div>{licznik.toFixed(1)} sek</div>
      <button onClick={handleClick} disabled={isFinished}>
        {buttonText}
      </button>
    </div>
  );
}

export default Odliczanie;
