import React, { useState } from "react";

function Logowanie() {
  const [nazwaUzytkownika, setNazwaUzytkownika] = useState("");
  const [haslo1, setHaslo1] = useState("");
  const [haslo2, setHaslo2] = useState("");
  function handleLogin() {
    if (haslo1 !== haslo2) {
      alert("Hasła nie są identyczne");
    } else {
      alert("Zalogowano użytkownika: " + nazwaUzytkownika);
    }
  }
  return (
    <div>
      <label>Nazwa użytkownika:</label>
      <input
        value={nazwaUzytkownika}
        onChange={(e) => setNazwaUzytkownika(e.target.value)}
      />

      <label>Hasło 1:</label>
      <input value={haslo1} onChange={(e) => setHaslo1(e.target.value)} />

      <label>Powtórzone hasło:</label>
      <input value={haslo2} onChange={(e) => setHaslo2(e.target.value)} />
      <button
        disabled={nazwaUzytkownika === "" || haslo1 === "" || haslo2 === ""}
        onClick={handleLogin}
      >
        Logowanie
      </button>
    </div>
  );
}

export default Logowanie;
