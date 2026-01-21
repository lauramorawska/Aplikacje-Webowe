import React from "react";
const a: boolean = true;
const b: boolean = false;
const Ternary = () => {
  return (
    <div>
      <div>
        {a ? "Stwierdzenie a jest prawdziwe" : "Stwierdzenie a jest fałszywe"}
      </div>
      <div>
        {b ? "Stwierdzenie b jest prawdziwe" : "Stwierdzenie b jest fałszywe"}
      </div>
    </div>
  );
};

export default Ternary;
