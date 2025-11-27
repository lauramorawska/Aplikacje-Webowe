document.querySelector("#generate").onclick = () => {
  const min = parseInt(document.querySelector("#minLen").value);
  const max = parseInt(document.querySelector("#maxLen").value);

  const useUpper = document.querySelector("#upper").checked;
  const useSpecial = document.querySelector("#special").checked;

  if (isNaN(min) || isNaN(max) || min <= 0 || max < min) {
    alert("Podaj poprawne wartości długości!");
    return;
  }

  let chars = "abcdefghijklmnopqrstuvwxyz";

  if (useUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (useSpecial) chars += "!@#$%^&*()_-+=<>?/{}[]";

  // losowa długość z zakresu
  const length = Math.floor(Math.random() * (max - min + 1)) + min;

  let password = "";

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * chars.length);
    password += chars[index];
  }

  alert("Twoje hasło: " + password);
};
