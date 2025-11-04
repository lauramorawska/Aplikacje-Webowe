const form = document.querySelector(".contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    const email = document.querySelector("#email");
    const message = document.querySelector("#message");

    if (!email.value.includes("@") || message.value.trim().length < 3) {
      e.preventDefault();
      alert("Uzupełnij poprawnie e-mail i treść wiadomości 🌸");
    }
  });
}

function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString("pl-PL");
  const clock = document.querySelector("#clock");
  if (clock) clock.textContent = time;
}
setInterval(updateClock, 1000);
updateClock();
