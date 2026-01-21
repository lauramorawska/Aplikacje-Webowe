import React, { useState } from "react";

function Formularz() {
  const [tekst, setTekst] = useState("");
  return (
    <div>
      <input value={tekst} onChange={(e) => setTekst(e.target.value)} />
    </div>
  );
}

export default Formularz;
