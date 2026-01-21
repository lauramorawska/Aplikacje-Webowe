import React, { useEffect, useState } from "react";

const Tytul = () => {
  const [tekst, setTekst] = useState("");

  useEffect(() => {
    document.title = tekst;
  }, [tekst]);

  return (
    <div>
      <input value={tekst} onChange={(e) => setTekst(e.target.value)} />
    </div>
  );
};

export default Tytul;
