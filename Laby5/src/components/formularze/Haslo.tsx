import React, { useState } from "react";

function Haslo() {
  const [haslo1, setHaslo1] = useState("");
  const [haslo2, setHaslo2] = useState("");
  return (
    <div>
      <label>Hasło 1:</label>
      <input value={haslo1} onChange={(e) => setHaslo1(e.target.value)} />

      <label>Powtórzone hasło:</label>
      <input value={haslo2} onChange={(e) => setHaslo2(e.target.value)} />
      <div>
        {haslo1 === "" && haslo2 === "" ? "Prosze wprowadzić hasło" : null}
        {haslo1 !== haslo2 ? "Hasła nie są identyczne" : null}
        {/* {haslo1 === haslo2 && haslo1 !== "" ? "Hasła są identyczne" : null} */}
      </div>
    </div>
  );
}

export default Haslo;
